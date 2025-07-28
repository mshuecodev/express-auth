export const log = {
	info: (msg: string) => console.log(`[INFO]: ${msg}`),
	error: (msg: string) => console.error(`[ERROR]: ${msg}`),
	debug: (msg: string) => console.debug(`[DEBUG]: ${msg}`),
	warn: (msg: string) => console.warn(`[WARN]: ${msg}`)
}
