import { UploaderUploadcare } from "~/components/libs/uploader-uploadcare"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function ExampleUploadcare() {
  const { ENV } = useRootLoaderData()
  const isDemo = ENV.NODE_ENV === "development" ? false : true

  return (
    <div className="space-y-8">
      <h2>Uploadcare</h2>

      <div className="max-w-2xl space-y-8">
        <div className="space-y-2">
          <h3>Regular</h3>
          <UploaderUploadcare
            isDemo={isDemo}
            contextName="uploader-regular"
            look="regular"
          />
        </div>

        <div className="space-y-2">
          <h3>Minimal</h3>
          <UploaderUploadcare
            isDemo={isDemo}
            contextName="uploader-minimal"
            look="minimal"
          />
        </div>

        <div className="space-y-2">
          <h3>Inline</h3>
          <UploaderUploadcare
            isDemo={isDemo}
            contextName="uploader-inline"
            look="inline"
          />
        </div>
      </div>
    </div>
  )
}
