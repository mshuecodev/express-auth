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
}
