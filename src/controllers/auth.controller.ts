import { Request, Response } from "express"
import { supabase, supabaseAdmin } from "../config/supabase"
import { sign } from "crypto"

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"

export class AuthController {
	static async signUp(req: Request, res: Response) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).json({ error: "Email and password are required" })
			}

			const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${CLIENT_URL}/auth/callback`
				}
			})

			if (signUpError) {
				return res.status(400).json({ error: signUpError.message })
			}

			const userId = signUpData.user?.id

			// create profile record
			const { error: profileError } = await supabaseAdmin.from("profiles").insert({
				user_id: userId,
				email
			})

			if (profileError) {
				// rollback - delete user
				await supabaseAdmin.auth.admin.deleteUser(userId || "")
				return res.status(500).json({ error: profileError.message })
			}

			res.status(200).json({ message: "Signup successful. Please check your email to confirm your account." })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}

	static async signIn(req: Request, res: Response) {
		try {
			const { email, password } = req.body

			if (!email || !password) {
				return res.status(400).json({ error: "Email and password are required" })
			}

			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			})

			if (error || !data.session) {
				return res.status(400).json({ error: error?.message || "Invalid credentials" })
			}

			const { access_token, refresh_token, user } = data.session

			res.status(200).json({ access_token, refresh_token, user, message: "Signin successful" })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}

	static async resendVerificationEmail(req: Request, res: Response) {
		try {
			const { email } = req.body

			if (!email) {
				return res.status(400).json({ error: "Email is required" })
			}

			const { data, error } = await supabase.auth.resend({
				type: "signup",
				email,
				options: {
					emailRedirectTo: `${CLIENT_URL}/auth/callback`
				}
			})

			if (error) {
				return res.status(400).json({ error: error.message })
			}
			res.status(200).json({ message: "Verification email resent. Please check your email." })
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" })
		}
	}
}
