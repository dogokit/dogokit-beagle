/**
 * EDITME: Auth Config
 *
 * Auth-related configuration
 */

import { type AuthStrategy } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

type ConfigAuth = {
  services: {
    label: string
    provider: AuthStrategy
    isEnabled?: boolean
  }[]
}

export const configAuth: ConfigAuth = {
  services: [
    { label: "GitHub", provider: AuthStrategies.GITHUB, isEnabled: true },
    { label: "Google", provider: AuthStrategies.GOOGLE, isEnabled: true },
  ],
}
