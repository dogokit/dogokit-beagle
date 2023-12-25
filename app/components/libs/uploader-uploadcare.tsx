import * as LR from "@uploadcare/blocks"
import { type OutputFileEntry } from "@uploadcare/blocks"
import styleInline from "@uploadcare/blocks/web/lr-file-uploader-inline.min.css"
import styleMinimal from "@uploadcare/blocks/web/lr-file-uploader-minimal.min.css"
import styleRegular from "@uploadcare/blocks/web/lr-file-uploader-regular.min.css"
import { useCallback, useEffect, useRef, useState } from "react"

import { Anchor } from "~/components/ui/anchor"
import { ButtonIcon } from "~/components/ui/button-icon"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

/**
 * File Uploader with Uploadcare
 *
 * https://uploadcare.com/docs/file-uploader
 * https://uploadcare.com/blog/how-to-upload-file-in-react
 * https://github.com/uploadcare/blocks-examples
 * https://github.com/uploadcare/blocks-examples/tree/main/examples/react-uploader
 */

LR.registerBlocks(LR)

export interface UploaderProps {
  contextName: string
  theme?: "light" | "dark"
  children?: React.ReactNode
}

export interface UploaderConfigProps extends UploaderProps {
  pubkey: string
  mode?: "regular" | "minimal" | "inline"
  sourceList?: string
  maxLocalFileSizeBytes?: number
  multiple?: boolean
  imgOnly?: boolean
}

export interface UploaderWithPreviewProps extends UploaderConfigProps {
  files: OutputFileEntry[]
  setFiles: (files: OutputFileEntry[]) => void
}

export function LRConfig({
  pubkey = "demopublickey",
  contextName = "my-uploader",
  sourceList = "local, url, gdrive",
  maxLocalFileSizeBytes = 10_000_000, // 10 MB
  multiple = false,
  imgOnly = true,
}: UploaderConfigProps) {
  return (
    // @ts-ignore
    <lr-config
      pubkey={pubkey}
      ctx-name={contextName}
      sourceList={sourceList}
      maxLocalFileSizeBytes={maxLocalFileSizeBytes}
      multiple={multiple}
      imgOnly={imgOnly}
      class="hidden"
      // More options: https://uploadcare.com/docs/file-uploader/options
    />
  )
}

export function LRFileUploaderRegular({
  contextName,
  theme,
  children,
}: UploaderProps) {
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
    <lr-data-output
      ctx-name={contextName}
      use-console
      use-input
      use-group
      use-event
    />
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

      {mode === "regular" && (
        <LRFileUploaderRegular contextName={contextName} theme={theme} />
      )}
      {mode === "minimal" && (
        <LRFileUploaderMinimal contextName={contextName} theme={theme} />
      )}
      {mode === "inline" && (
        <LRFileUploaderInline contextName={contextName} theme={theme} />
      )}
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
  files,
  setFiles,
  ...props
}: UploaderWithPreviewProps) {
  const dataOutputRef = useRef<LR.DataOutput>()
  const hasFiles = Array.isArray(files) && files.length > 0

  const handleUploaderEvent = useCallback(
    (e: CustomEvent<any>) => {
      const { data } = e.detail
      setFiles(data)
    },
    [setFiles],
  )

  const handleRemoveFile = useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      setFiles(files.filter(f => f.uuid !== uuid)),
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
        <LRConfig pubkey={pubkey} contextName={contextName} {...props} />
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

      <div className="flex flex-wrap gap-2">
        {/* !hasFiles && ... */}
        {hasFiles &&
          files.map(file => {
            if (!file.cdnUrl) return null
            const fileUrl = `${file.cdnUrl}-/preview/-/resize/x200/`

            return (
              <div key={file.uuid} className="flex gap-1">
                <Anchor href={fileUrl} className="block">
                  <img
                    src={fileUrl}
                    key={file.uuid}
                    alt={file.originalFilename || ""}
                    title={file.originalFilename || ""}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                </Anchor>

                <ButtonIcon
                  variant="ghost"
                  size="xs"
                  type="button"
                  onClick={() => handleRemoveFile(file.uuid)}
                >
                  <Iconify icon="ph:x" />
                  <span className="sr-only">Remove File</span>
                </ButtonIcon>
              </div>
            )
          })}
      </div>
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
  files,
  setFiles,
  ...props
}: UploaderWithPreviewProps) {
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[]>([])
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)
  const hasFiles = Array.isArray(files) && files.length > 0

  const handleRemoveFile = useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      setFiles(files.filter(f => f.uuid !== uuid)),
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
      ctxProviderRef.current?.removeEventListener(
        "data-output",
        handleUploadEvent,
      )
    }
  }, [setUploadedFiles])

  useEffect(() => {
    const resetUploaderState = () =>
      ctxProviderRef.current?.uploadCollection.clearAll()

    const handleDoneFlow = () => {
      resetUploaderState()
      setFiles([...files, ...uploadedFiles])
      setUploadedFiles([])
    }

    ctxProviderRef.current?.addEventListener("done-flow", handleDoneFlow)

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctxProviderRef.current?.removeEventListener("done-flow", handleDoneFlow)
    }
  }, [files, setFiles, uploadedFiles, setUploadedFiles])

  return (
    <div className="space-y-2">
      <div>
        <LRConfig pubkey={pubkey} contextName={contextName} {...props} />
        <LRFileUploaderRegular contextName={contextName} theme={theme} />

        {/* @ts-ignore */}
        <lr-upload-ctx-provider ctx-name={contextName} ref={ctxProviderRef} />
        {/* Note: ctxProviderRef cannot be passed to custom component props */}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* !hasFiles && ... */}
        {hasFiles &&
          files.map(file => {
            const fileUrl = `${file.cdnUrl}-/preview/-/resize/x200/`

            return (
              <div key={file.uuid} className="flex gap-1">
                <Anchor href={fileUrl} className="block">
                  <img
                    src={fileUrl}
                    key={file.uuid}
                    alt={file.originalFilename || ""}
                    title={file.originalFilename || ""}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                </Anchor>

                <ButtonIcon
                  variant="ghost"
                  size="xs"
                  type="button"
                  onClick={() => handleRemoveFile(file.uuid)}
                >
                  <Iconify icon="ph:x" />
                  <span className="sr-only">Remove File</span>
                </ButtonIcon>
              </div>
            )
          })}
      </div>
    </div>
  )
}
