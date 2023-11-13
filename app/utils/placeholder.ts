export function getPlaceholderAvatarUrl(
  username = "username",
  styleName = "thumbs",
) {
  const url = new URL(`https://api.dicebear.com/6.x/${styleName}/svg`)

  url.searchParams.append("seed", username)
  url.searchParams.append("flip", String(true))

  return url.toString()
}
