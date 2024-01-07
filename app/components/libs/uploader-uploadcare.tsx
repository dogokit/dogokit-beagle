import * as LR from "@uploadcare/blocks"
import { type OutputFileEntry } from "@uploadcare/blocks"
import { useCallback, useEffect, useRef, useState } from "react"

import { IconMatch } from "~/components/libs/icon"
import { Anchor } from "~/components/ui/anchor"
import { ButtonIcon } from "~/components/ui/button-icon"
import { cn } from "~/utils/cn"

import styleInline from "@uploadcare/blocks/web/lr-file-uploader-inline.min.css"
import styleMinimal from "@uploadcare/blocks/web/lr-file-uploader-minimal.min.css"
import styleRegular from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css"

/**
 * File Uploader with Uploadcare
 *
 * https://uploadcare.com/docs/file-uploader
 * https://uploadcare.com/blog/how-to-upload-file-in-react
 * https://github.com/uploadcare/blocks-examples
 * https://github.com/uploadcare/blocks-examples/tree/main/examples/react-uploader
 *
 * Note: Uploadcare Blocks currently doesn't work well with TypeScript yet,
 * so there are a lot of @ts-ignore to resolve
 * element does not exist on type 'JSX.IntrinsicElements' error
 *
 * Install the dependency:
 * pnpm install @uploadcare/blocks
 */

LR.registerBlocks(LR)

export const defaultLRConfig = {
  sourceList: "local, url, gdrive",
  maxLocalFileSizeBytes: 10_000_000, // 10 MB
  multiple: false,
  imgOnly: true,
}

/**
 * IDEA: onUploaded function so after uploading the files,
 * store the info into the database records,
 * then can also delete them afterwards from anywhere
 */

export interface UploaderProps {
  contextName: string
  theme?: "light" | "dark"
  children?: React.ReactNode
}

export interface LRConfigProps {
  sourceList?: string
  maxLocalFileSizeBytes?: number
  multiple?: boolean
  imgOnly?: boolean
  cropPreset?: string
}

export interface UploaderConfigProps extends UploaderProps {
  pubkey: string
  mode?: "regular" | "minimal" | "inline"
  config?: LRConfigProps
}

export interface UploaderWithPreviewProps extends UploaderConfigProps {
  files: OutputFileEntry[]
  setFiles: (files: OutputFileEntry[]) => void
}

export interface PreviewFilesProps {
  multiple?: boolean
  size?: string
  files: OutputFileEntry[]
  removeFile: (uuid: OutputFileEntry["uuid"]) => void
}

export function LRConfig({
  pubkey = "demopublickey",
  contextName = "my-uploader",
  config = defaultLRConfig,
}: UploaderConfigProps) {
  return (
    // @ts-ignore
    <lr-config
      pubkey={pubkey}
      ctx-name={contextName}
      sourceList={config.sourceList}
      maxLocalFileSizeBytes={config.maxLocalFileSizeBytes}
      multiple={config.multiple}
      imgOnly={config.imgOnly}
      cropPreset={config.cropPreset}
      class="hidden"
      // More options: https://uploadcare.com/docs/file-uploader/options
    />
  )
}

export function LRFileUploaderRegular({ contextName, theme, children }: UploaderProps) {
  return (
    // @ts-ignore
    <lr-file-uploader-regular
      css-src={styleRegular}
      ctx-name={contextName}
      class={cn("uploadcare-config", theme)}
    >
      {children}
      {/* @ts-ignore */}
    </lr-file-uploader-regular>
  )
}

export function LRFileUploaderMinimal({ contextName, theme }: UploaderProps) {
  return (
    // @ts-ignore
    <lr-file-uploader-minimal
      css-src={styleMinimal}
      ctx-name={contextName}
      class={cn("uploadcare-config", theme)}
    />
  )
}

export function LRFileUploaderInline({ contextName, theme }: UploaderProps) {
  return (
    // @ts-ignore
    <lr-file-uploader-inline
      css-src={styleInline}
      ctx-name={contextName}
      class={cn("uploadcare-config", theme)}
    />
  )
}

export function LRUploadCtxProvider({
  contextName,
  ref,
}: UploaderProps & {
  ref: React.MutableRefObject<any>
}) {
  return (
    // @ts-ignore
    <lr-upload-ctx-provider ctx-name={contextName} ref={ref} />
  )
}

export function LRDataOutput({ contextName }: UploaderProps) {
  return (
    // @ts-ignore
    <lr-data-output ctx-name={contextName} use-console use-input use-group use-event />
  )
}

/**
 * Uploader with Switcher
 *
 * Changeable mode, but without output
 */
export function UploaderSwitcher({
  pubkey = "demopublickey",
  contextName = "my-uploader",
  theme = "light",
  mode = "regular",
  ...props
}: UploaderConfigProps) {
  return (
    <>
      <LRConfig pubkey={pubkey} contextName={contextName} {...props} />

      {mode === "regular" && <LRFileUploaderRegular contextName={contextName} theme={theme} />}
      {mode === "minimal" && <LRFileUploaderMinimal contextName={contextName} theme={theme} />}
      {mode === "inline" && <LRFileUploaderInline contextName={contextName} theme={theme} />}
    </>
  )
}

/**
 * Uploader with LR Data Output
 *
 * Simpler code, but show the files immediately
 */
export function UploaderWithOutput({
  pubkey = "demopublickey",
  contextName = "my-uploader",
  theme = "light",
  config = defaultLRConfig,
  files,
  setFiles,
  ...props
}: UploaderWithPreviewProps) {
  const dataOutputRef = useRef<LR.DataOutput>()

  const handleUploaderEvent = useCallback(
    (e: CustomEvent<any>) => {
      const { data } = e.detail
      setFiles(data)
    },
    [setFiles],
  )

  const removeFile = useCallback(
    (uuid: OutputFileEntry["uuid"]) => setFiles(files.filter(f => f.uuid !== uuid)),
    [files, setFiles],
  )

  useEffect(() => {
    const el = dataOutputRef.current

    // @ts-ignore
    el?.addEventListener(
      "lr-data-output",
      handleUploaderEvent as EventListenerOrEventListenerObject,
    )
    return () => {
      // @ts-ignore
      el?.removeEventListener(
        "lr-data-output",
        handleUploaderEvent as EventListenerOrEventListenerObject,
      )
    }
  }, [handleUploaderEvent])

  return (
    <div className="space-y-2">
      <div>
        <LRConfig pubkey={pubkey} contextName={contextName} config={config} {...props} />
        <LRFileUploaderRegular contextName={contextName} theme={theme}>
          {/* @ts-ignore */}
          <lr-data-output
            ctx-name={contextName}
            use-event
            hidden
            onEvent={handleUploaderEvent}
            ref={dataOutputRef}
          />
          {/* Note: dataOutputRef cannot be passed to custom component props */}
        </LRFileUploaderRegular>
      </div>

      <PreviewFiles multiple={config.multiple} files={files} removeFile={removeFile} />
    </div>
  )
}

/**
 * Uploader with Upload CTX Provider
 *
 * Show the files after done flow
 */
export function UploaderWithProvider({
  pubkey = "demopublickey",
  contextName = "my-uploader",
  theme = "light",
  config = defaultLRConfig,
  files,
  setFiles,
  ...props
}: UploaderWithPreviewProps) {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([])
  const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null)

  const removeFile = useCallback(
    (uuid: OutputFileEntry["uuid"]) => setFiles(files.filter(f => f.uuid !== uuid)),
    [files, setFiles],
  )

  useEffect(() => {
    const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
      if (e.detail) {
        setUploadedFiles([...e.detail])
      }
    }

    ctxProviderRef.current?.addEventListener("data-output", handleUploadEvent)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctxProviderRef.current?.removeEventListener("data-output", handleUploadEvent)
    }
  }, [setUploadedFiles])

  useEffect(() => {
    const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll()

    const handleDoneFlow = () => {
      resetUploaderState()
      if (config.multiple) {
        setFiles([...files, ...uploadedFiles])
        setUploadedFiles([])
      }
      if (!config.multiple) {
        setFiles([...uploadedFiles])
        setUploadedFiles([])
      }
    }

    ctxProviderRef.current?.addEventListener("done-flow", handleDoneFlow)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctxProviderRef.current?.removeEventListener("done-flow", handleDoneFlow)
    }
  }, [files, setFiles, uploadedFiles, setUploadedFiles, config.multiple])

  return (
    <div className="space-y-2">
      <div>
        <LRConfig pubkey={pubkey} contextName={contextName} config={config} {...props} />
        <LRFileUploaderRegular contextName={contextName} theme={theme} />

        {/* @ts-ignore */}
        <lr-upload-ctx-provider ctx-name={contextName} ref={ctxProviderRef} />
        {/* Note: ctxProviderRef cannot be passed to custom component props */}
      </div>

      <PreviewFiles multiple={config.multiple} files={files} removeFile={removeFile} />
    </div>
  )
}

/**
 * Preview Files with File URL config
 */

export function getFileUrl(cdnUrl: string, resize: string = "x200") {
  const fileUrl = `${cdnUrl}
-/preview/
-/format/auto/
-/resize/${resize}/
-/quality/smart_retina/`
  return fileUrl
}

export function PreviewFiles({
  size = "x200",
  multiple = false,
  files,
  removeFile,
}: PreviewFilesProps) {
  const hasFiles = Array.isArray(files) && files.length > 0

  if (!hasFiles) {
    return (
      <p className="text-sm text-muted-foreground">
        {multiple ? "No multiple files yet." : "No one file yet."}
      </p>
    )
  }

  const handleRemoveDeleteFile = (file: LR.OutputFileEntry) => {
    removeFile(file.uuid)
    // FIXME: Delete the file in the Uploadcare storage
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {files.map(file => {
        if (!file.cdnUrl) return null
        const fileUrl = getFileUrl(file.cdnUrl, size)

        return (
          <li key={file.uuid} className="flex gap-1">
            <Anchor href={fileUrl} className="block">
              <img
                src={fileUrl}
                key={file.uuid}
                alt={file.originalFilename || ""}
                title={file.originalFilename || ""}
                className="max-h-32 max-w-xs object-cover"
              />
            </Anchor>

            <ButtonIcon
              variant="ghost"
              size="xs"
              type="button"
              onClick={() => handleRemoveDeleteFile(file)}
            >
              <IconMatch icon="x" />
              <span className="sr-only">Remove File</span>
            </ButtonIcon>
          </li>
        )
      })}
    </ul>
  )
}
