import { Router } from "express"
import { ProfileController } from "../controllers/profile.controller"
import { asyncHandler } from "../utils/asyncHandler"
import { authenticate } from "../middlewares/auth"

const router = Router()

router.get("/:id", authenticate, asyncHandler(ProfileController.getProfile))

export default router
