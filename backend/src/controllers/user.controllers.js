import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js"


const generateAcessTokenAndRefreshToken = async (user) =>{

    
    

    const accessToken= jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.ACESS_TOKEN_KEY,
   { expiresIn:process.env.ACESS_TOKEN_EXPIRY}
)
    
              


const refreshToken= jwt.sign({
    id:user._id
},
    process.env.REFRESH_TOKEN_KEY,
  {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)  

  if(!accessToken && !refreshToken){
    throw new ApiError(401,"access token or refresh token not")
  }
  
  

return {accessToken,refreshToken}

}

const registerUser=asyncHandler(async(req,res) =>{

    const {username,password,email,phoneNumber,fullName,role} =req.body
    // console.log(req.body);
    

   if ([username,password,email,phoneNumber,fullName].some((field) => field.trim()=="")){
    throw new ApiError(401,"something are missing")
   }

   if(!role){
    throw new ApiError(401,"profile type missing are missing")
   }

//    console.log("Ptypes=",role);
   

    const existedUser=await User.findOne({
        $or:[{email},{username}]
    })
    if(existedUser){
        throw new ApiError(401,"user alerady exist")
    }
 
    const hashpassword= await bcrypt.hash(password,10)

   const user = await User.create({
        username,
        password:hashpassword,
        email,
        phoneNumber,
        fullName,
        role: role       
    })

    const {accessToken,refreshToken}=generateAcessTokenAndRefreshToken(user)
    const option={
        httpOnly:true,
        secure:true
    }

     const users=  user.toObject()
     delete users.password
        
    return res.status(201)
    .cookie("acessToken",accessToken,option)
    .cookie("refreshToken",refreshToken)
    .json(
        new ApiResponse(201,users,"user created sucessfully")
    )

})


const LoginUser=asyncHandler(async (req,res) => {
     const {username,email,password,role}=req.body;

     if(!username && !email){
        throw new ApiError(401,"please enter the username or email")
     }
     if(!password){
        throw new ApiError(401,"please enter password")
     }
     if(!role){
        throw new ApiError(401,"plese enter profile type")
     }

     const user= await User.findOne({
           $or:[{email},{username}] 
     })
     

     if(!user){
        throw new ApiError(404,"user not found")
     }
            
     if(role != user.role){
        throw new ApiError(401,"plese enter correct Profile type")
     }
     
     const checkPassword=await bcrypt.compare(password,user.password)
     

     if(!checkPassword){
          throw new ApiError(402,"plese enter correct Password")
     }

     const {accessToken,refreshToken}= await generateAcessTokenAndRefreshToken(user)

     user.refreshToken=refreshToken
    await  user.save();
    

    const option={
        httpOnly:true,
        secure:true,
        sameSite: "None",
    }

    

     const loginUser= user.toObject();
     delete loginUser.password;
     delete loginUser.refreshToken;
     
     return res.status(202)
     .cookie("accessToken",accessToken,option)
     .cookie("refreshToken",refreshToken,option)
     .json(
        new ApiResponse(202,loginUser,"userlogin sucessfully")
     )
})


const logoutUser=asyncHandler(async(req,res) =>{
    // console.log(req.user);
    
    
    
    await User.findByIdAndUpdate(
        req.user.id,
        {
            $unset:{refreshToken: 1}
        },
        {
            new:true
        }
    )

    return res.status(203)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json( new ApiResponse(203,{},"logout sucessfully"))

})
  
const getProfile= asyncHandler(async (req,res) => {
    const user=await User.findById(req.user.id).select("-password -refreshToken")

    return res.status(202).json(new ApiResponse(202,user,"User data fetched sucessfully"))
})
 
const updateProfile=asyncHandler(async(req,res)=>{
    const{ email,password,fullName,phoneNumber,skill,bio}=req.body
    //   console.log(req.body);
      
     if(!email &&   !password && !fullName && !phoneNumber && !skill && !bio ){
        throw new ApiError(400,"plese enter email,password,fullName,phoneNumber or skill")
     }

       
       let skillArray;
       if(skill){
        skillArray=skill.split(",")
       }
      

    let updatedPassword;
    if (password) {
        updatedPassword = await bcrypt.hash(password, 10)
    }

    const user=await User.findByIdAndUpdate(
        req.user.id,
        {
            email,
            fullName,
            phoneNumber,
            skill:skillArray,
            bio,
            ...(updatedPassword && { password: updatedPassword })
        },{
            returnDocument:"after"
        }
    ).select("-password -refreshToken")


    // const user= await User.findById(req.user.id).select("-password -refreshToken")

      return res.status(201).json(new ApiResponse(201,user,"account update sucessfully"))
 

})
const uploadAvatar= asyncHandler(async(req,res) =>{
     const avatarPath=req.file.path  

     if(!avatarPath){
        throw new ApiError(401,"file not upload in local path")
     }

     const avatar=await uploadOnCloudinary(avatarPath);
      
     if(!avatar.url){
        throw new ApiError(401,"avatar url not found")
     }

     
     await User.findByIdAndUpdate(
        req.user.id,
        {
            avatar:avatar.url
        },
        {
            new:true
        }
     )

     const user=await User.findById(req.user.id).select("-password -refreshToken")

     return res.status(200).json( new ApiResponse(200,user,"avatar upload sucessfully"))
     
  })
 


export {registerUser,
    LoginUser,
    logoutUser,
    getProfile,
    updateProfile,
    uploadAvatar
}