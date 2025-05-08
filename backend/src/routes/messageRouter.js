import express from "express"
import ProtectRoute from "../middleware/authMiddleware.js"
import { getMessages, getUsersForSideBar, sendMessage } from "../controllers/messageController.js"
const router = express.Router()

router.get("/users",ProtectRoute,getUsersForSideBar)
router.get("/:id",ProtectRoute,getMessages)

router.post("/send/:id",ProtectRoute,sendMessage)



export default router