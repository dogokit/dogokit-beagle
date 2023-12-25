import { type OutputFileEntry } from "@uploadcare/blocks"
import { useState } from "react"
import { Theme, useTheme } from "remix-themes"

import {
  UploaderSwitcher,
  UploaderWithOutput,
  UploaderWithProvider,
} from "~/components/libs/uploader-uploadcare"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function ExampleUploadcare() {
  const { ENV } = useRootLoaderData()

  const [filesA, setFilesA] = useState<OutputFileEntry[]>([])
  const [filesB, setFilesB] = useState<OutputFileEntry[]>([])

  const [themeSymbol] = useTheme()
  const hasTheme = Boolean(themeSymbol)
  const theme = hasTheme && themeSymbol === Theme.DARK ? "dark" : "light"

  if (!ENV.UPLOADCARE_PUBLIC_KEY) return null

  return (
    <div className="space-y-8">
      <header>
        <h2>Uploadcare</h2>
        <p>File upload, especially image.</p>
      </header>

      <div className="max-w-2xl">
        <UploaderWithOutput
          pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
          contextName="my-uploader-output"
          theme={theme}
          files={filesA}
          setFiles={setFilesA}
        />
      </div>

      <div className="max-w-2xl">
        <UploaderWithProvider
          pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
          contextName="my-uploader-provider"
          theme={theme}
          files={filesB}
          setFiles={setFilesB}
        />
      </div>

      <div className="max-w-2xl space-y-8">
        <div className="space-y-2">
          <h3>Regular</h3>
          <UploaderSwitcher
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="uploader-regular"
            mode="regular"
            theme={theme}
          />
        </div>

        <div className="space-y-2">
          <h3>Minimal</h3>
          <UploaderSwitcher
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="uploader-minimal"
            mode="minimal"
            theme={theme}
          />
        </div>

        <div className="space-y-2">
          <h3>Inline</h3>
          <UploaderSwitcher
            pubkey={ENV.UPLOADCARE_PUBLIC_KEY}
            contextName="uploader-inline"
            mode="inline"
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}
