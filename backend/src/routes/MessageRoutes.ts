import express from "express";
import MessageController from "../controllers/MessageController";
import { verifyRequest } from "../middlewares/jwtTokenAuth";
import { upload } from "../middlewares/multer";
const router = express.Router()
router.post("/:receiverId", verifyRequest, upload.array("media", 4), MessageController.sendMessage)
router.get("/:receiverId", verifyRequest, MessageController.getMessages)
router.get("/",verifyRequest,MessageController.getChannels)
export default router