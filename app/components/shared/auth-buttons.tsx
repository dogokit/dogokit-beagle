import { FormButtonOAuth } from "~/components/shared/form-button-oauth"
import { configAuth } from "~/configs/auth"

export function AuthButtons() {
  return (
    <>
      {configAuth.services
        .filter(service => service.isEnabled)
        .map(service => (
          <FormButtonOAuth
            key={service.provider}
            label={service.label}
            provider={service.provider}
          />
        ))}
    </>
  )
}
