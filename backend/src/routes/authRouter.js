import express from 'express'
import { checkAuth, Login, Logout, Signup, UpdateProfile } from '../controllers/authController.js'
import ProtectRoute from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/signup',Signup)
router.post('/login',Login)
router.post('/logout',Logout)

router.put('/update-profile',ProtectRoute,UpdateProfile)

router.get('/check',ProtectRoute,checkAuth)

export default router