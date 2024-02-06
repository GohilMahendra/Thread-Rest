import express from "express";
import MessageController from "../controllers/MessageController";
import { verifyRequest } from "../middlewares/jwtTokenAuth";
const router = express.Router()
router.post("/:recieverId",verifyRequest,MessageController.sendMessage)
router.get("/:otherUserId",verifyRequest,MessageController.getMessages)

export default router