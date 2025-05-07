import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import Cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log("This is the ")
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterdUsers);
    } catch (error) {
        console.log("Error in get Users for Sidebar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { SenderId: myId, reciverId: userToChatId },
                { SenderId: userToChatId, reciverId: myId },
            ]
        })

        res.status(200).json(messages)
    }
    catch (error) {
        console.log("Error in get Message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });


    }

};

export const sendMessage = async (req, res) => {
    try {

        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const SenderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await Cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message(
            {
                SenderId,
                reciverId,
                text,
                image: imageUrl
            }
        )
        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(reciverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
     console.log("Error in sendMessage Controller" , error.message);
     res.status(500).json({error: "Internal Server Error"});
     
    }
}