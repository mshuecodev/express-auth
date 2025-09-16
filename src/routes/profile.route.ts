import { Router } from "express"
import { ProfileController } from "../controllers/profile.controller"
import { asyncHandler } from "../utils/asyncHandler"
import { authenticate } from "../middlewares/auth"

const router = Router()

router.get("/:id", authenticate, asyncHandler(ProfileController.getProfile))
router.put("/:id", authenticate, asyncHandler(ProfileController.updateProfile))
router.post("/:id/deactivate", authenticate, asyncHandler(ProfileController.deactiveProfile))
router.delete("/:id", authenticate, asyncHandler(ProfileController.deleteProfile))

export default router
