import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { asyncHandler } from "../utils/asyncHandler"

const router = Router()

router.post("/signup", asyncHandler(AuthController.signUp))
router.post("/signin", asyncHandler(AuthController.signIn))
router.post("/resend-verification", asyncHandler(AuthController.resendVerificationEmail))

export default router
