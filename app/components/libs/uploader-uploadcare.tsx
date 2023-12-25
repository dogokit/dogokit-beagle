import * as LR from "@uploadcare/blocks"
import styleInline from "@uploadcare/blocks/web/lr-file-uploader-inline.min.css"
import styleMinimal from "@uploadcare/blocks/web/lr-file-uploader-minimal.min.css"
import styleRegular from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css"

import { useRootLoaderData } from "~/hooks/use-root-loader-data"

LR.registerBlocks(LR)

/**
 * File Uploader with Uploadcare
 *
 * https://uploadcare.com/docs/file-uploader
 * https://github.com/uploadcare/blocks-examples
 */

export function UploaderUploadcare({
  contextName = "my-uploader",
  look = "regular",
  sourceList = "local, url, gdrive",
  maxLocalFileSizeBytes = 10_000_000, // 10 MB
  multiple = false,
  imgOnly = true,
  isDemo = false,
}: {
  contextName: string
  look?: "regular" | "minimal" | "inline"
  sourceList?: string
  maxLocalFileSizeBytes?: number
  multiple?: boolean
  imgOnly?: boolean
  isDemo?: boolean
}) {
  const { ENV } = useRootLoaderData()

  const pubkey = isDemo ? "demopublickey" : ENV.UPLOADCARE_PUBLIC_KEY
  if (!pubkey) return null

  return (
    <>
      {/* @ts-ignore */}
      <lr-config
        pubkey={pubkey}
        ctx-name={contextName}
        sourceList={sourceList}
        maxLocalFileSizeBytes={maxLocalFileSizeBytes}
        multiple={multiple}
        imgOnly={imgOnly}
        class="hidden"
      />

      {look === "regular" && <UploaderRegular contextName={contextName} />}
      {look === "minimal" && <UploaderMinimal contextName={contextName} />}
      {look === "inline" && <UploaderInline contextName={contextName} />}
    </>
  )
}

function UploaderRegular({ contextName }: { contextName: string }) {
  return (
    // @ts-ignore
    <lr-file-uploader-regular
      css-src={styleRegular}
      ctx-name={contextName}
      class="uploadcare-config"
    />
  )
}

function UploaderMinimal({ contextName }: { contextName: string }) {
  return (
    // @ts-ignore
    <lr-file-uploader-minimal
      css-src={styleMinimal}
      ctx-name={contextName}
      class="uploadcare-config"
    />
  )
}

function UploaderInline({ contextName }: { contextName: string }) {
  return (
    // @ts-ignore
    <lr-file-uploader-inline
      css-src={styleInline}
      ctx-name={contextName}
      class="uploadcare-config"
    />
  )
}
