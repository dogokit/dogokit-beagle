import { FormButtonSocial } from "~/components/shared/form-button-social"
import { configAuth } from "~/configs/auth"

export function AuthButtons() {
  return (
    <>
      {configAuth.services.map(service => (
        <FormButtonSocial
          key={service.provider}
          label={service.label}
          provider={service.provider}
        />
      ))}
    </>
  )
}
