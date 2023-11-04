import { redirect, type ActionFunctionArgs } from "@remix-run/node"

import { authenticator, type AuthStrategy } from "~/services/auth.server"

export const loader = () => redirect("/login")

export const action = async ({ request, params }: ActionFunctionArgs) => {
	// If the provider is not specified, redirect to the login page
	if (!params.provider) return redirect("/login")

	const provider = params.provider as AuthStrategy

	return await authenticator.authenticate(provider, request, {
		successRedirect: "/dashboard",
	})
}
