import { ButtonSocial } from "~/components/ui/button-social"
import { configAuth } from "~/configs/auth"

export function AuthButtons() {
  return (
    <>
      {configAuth.services.map(service => (
        <ButtonSocial
          key={service.provider}
          label={service.label}
          provider={service.provider}
        />
      ))}
    </>
  )
}
