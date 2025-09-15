import { Request, Response, NextFunction } from "express"
import { supabase, supabaseAdmin } from "../config/supabase"

export interface AuthUser {
	id: string
	email?: string
}

declare global {
	namespace Express {
		interface Request {
			user?: AuthUser
		}
	}
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			res.status(401).json({ error: "Authorization header missing" })
			return
		}

		const token = authHeader.split(" ")[1]
		const {
			data: { user },
			error
		} = await supabase.auth.getUser(token)

		if (error || !user) {
			res.status(401).json({ error: "Invalid or expired token" })
			return
		}

		req.user = {
			id: user.id,
			email: user.email
		}
		next()
	} catch (error) {
		res.status(401).json({ error: "Unauthorized" })
	}
}
