export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ??
    request.headers.get("host") ??
    new URL(request.url).host

  const protocol = host.includes("localhost") ? "http" : "https"

  return `${protocol}://${host}`
}
