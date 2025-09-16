import { Request, Response } from "express"
import { supabaseAdmin } from "../config/supabase"

export class ProfileController {
	static async getProfile(req: Request, res: Response) {
		try {
			const userId = req.params.id

			if (!userId) {
				return res.status(400).json({ error: "User ID is required" })
			}

			const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("user_id", userId).single()

			if (error) {
				return res.status(404).json({ error: "Profile not found" })
			}

			res.status(200).json({ profile: data })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}

	static async updateProfile(req: Request, res: Response) {
		try {
			const userId = req.params.id
			const updates = req.body
			if (!userId) {
				return res.status(400).json({ error: "User ID is required" })
			}

			const { data, error } = await supabaseAdmin.from("profiles").update(updates).eq("user_id", userId).single()

			if (error) {
				return res.status(400).json({ error: "Failed to update profile" })
			}

			res.status(200).json({ profile: data })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}

	static async deactiveProfile(req: Request, res: Response) {
		try {
			const userId = req.params.id

			if (!userId) {
				return res.status(400).json({ error: "User ID is required" })
			}

			const { data, error } = await supabaseAdmin.from("profiles").update({ is_active: false }).eq("user_id", userId).single()

			if (error) {
				return res.status(400).json({ error: "Failed to deactivate profile" })
			}

			res.status(200).json({ message: "Profile deactivated successfully", profile: data })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}

	static async deleteProfile(req: Request, res: Response) {
		try {
			const userId = req.params.id

			if (!userId) {
				return res.status(400).json({ error: "User ID is required" })
			}

			const { error } = await supabaseAdmin.from("profiles").delete().eq("user_id", userId)

			if (error) {
				return res.status(400).json({ error: "Failed to delete profile" })
			}

			res.status(200).json({ message: "Profile deleted successfully" })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}
}
