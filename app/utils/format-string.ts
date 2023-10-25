import pluralize from "pluralize"

export function formatStringPlural(word: string, count: number) {
	return pluralize(word, count, true)
}

export function formatStringCode(code: any) {
	return JSON.stringify(code, null, 2)
}
