import bcrypt from 'bcryptjs';
import User from '../model/user.model.js'

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

         const profilepic = `https://xsgames.co/randomusers/avatar.php?g=pixel`;

         const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic : profilepic,
         })

         if(newUser){
            await newUser.save();

         res.status(201).json({
            _id : newUser._id,
            fullname:newUser.fullname,
            gender:newUser.gender,
            profilepic:newUser.profilePic
         })

         }else{
            res.status(400).json({error:"Invalid user data"});
         }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({error:"Internal Server error"});
    }
}

export const login = (req, res) => {
    res.send("login routes")
}

export const logout = (req, res) => {
    res.send("logout routes")
}
