import User from "../model/user.model.js";

export const getUsersForSidebar = async (req,res) => {
    try{
        const loggedInUserId = req.user._id;

        const filteredUsers= await User.find({id : {$ne : loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    }catch(error){
        console.error("Error in getuserForSidebar Controller :", error.message);
        return res.status(500).json({error : "Internal server error"})
    }
}; 
