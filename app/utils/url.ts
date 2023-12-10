export function fixUrl(text: string): string {
  try {
    const fixedUrl = new URL(text.startsWith("http") ? text : `http://${text}`)
    return fixedUrl.href.replace(/^http:/, "https:")
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fixing URL:", error.message)
    } else {
      console.error("Unknown error:", error)
    }
    return text
  }
}
