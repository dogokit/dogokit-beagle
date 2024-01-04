/**
 * EDITME: Auth Config
 *
 * Auth-related configuration
 */

import { AuthStrategies } from "~/services/auth-strategies"
import { type AuthStrategy } from "~/services/auth.server"

export const configAuth: ConfigAuth = {
  services: [
    {
      label: "Google",
      provider: AuthStrategies.GOOGLE,
      isEnabled: true,
    },
    {
      label: "GitHub",
      provider: AuthStrategies.GITHUB,
      isEnabled: true,
    },
  ],
}

type ConfigAuth = {
  services: {
    label: string
    provider: AuthStrategy
    isEnabled?: boolean
  }[]
}
