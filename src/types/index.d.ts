// Example: Custom type for API response
export interface ApiResponse<T> {
	success: boolean
	data?: T
	error?: string
}

// Example: Extending Express Request to include user property
import { Request } from "express"

export interface AuthenticatedRequest extends Request {
	user?: {
		id: string
		email: string
		roles: string[]
	}
}

// Example: Environment variables type
export interface EnvConfig {
	NODE_ENV: "development" | "production" | "test"
	PORT: number
	DATABASE_URL: string
	JWT_SECRET: string
}
