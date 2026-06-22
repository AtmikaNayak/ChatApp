import bcrypt from 'bcryptjs';
import User from '../model/user.model.js'
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({error:"password doesnt match"});
        }

        const user = await User.findOne({username});

         if(user){
            return res.status(400).json({error : "Username already exists"});
         }

         //HASH PASSWORD HERE
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         const profilepic = `https://api.dicebear.com/10.x/lorelei/svg?seed=${username}`;

         const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic : profilepic,
         })

         if(newUser){

            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

         res.status(201).json({
            _id : newUser._id,
            fullname:newUser.fullname,
            gender:newUser.gender,
            profilePic:newUser.profilePic
         })

         }else{
            res.status(400).json({error:"Invalid user data"});
         }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({error:"Internal Server error"});
    }
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPassword = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPassword){
            return res.status(400).json({error: "Invalid username or password"});
        }
        
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id : user._id,
            fullname : user.fullname,
            username : user.username,
            profilePic : user.profilePic,
        });

    }catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({error:"Internal Server error"});
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie('jwt', "", {maxAge:0});
        return res.status(200).json({message : "Logged out successfully"});

    }catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({error:"Internal Server error"});
    }
}