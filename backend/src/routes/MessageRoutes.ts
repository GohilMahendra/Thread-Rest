import express from "express";
import MessageController from "../controllers/MessageController";
import { verifyRequest } from "../middlewares/jwtTokenAuth";
import { upload } from "../middlewares/multer";
const router = express.Router()
router.post("/", verifyRequest, upload.array("media", 4), MessageController.sendMessage)
router.get("/:channelId", verifyRequest, MessageController.getMessages)
router.get("/",verifyRequest,MessageController.getChannels)
export default router