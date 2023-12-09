import { type FieldConfig } from "@conform-to/react"
import type * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { Alert } from "~/components/ui/alert"
import { Label, labelVariants } from "~/components/ui/label"
import { cn } from "~/utils/cn"

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
})
FormField.displayName = "FormField"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    disabled?: boolean
  }
>(({ className, disabled, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(
        labelVariants({ variant: disabled ? "disabled" : "default" }),
        className,
      )}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

const FormFieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, children, ...props }, ref) => {
  return (
    <fieldset
      ref={ref}
      className={cn("space-y-4 disabled:opacity-80", className)}
      {...props}
    >
      {children}
    </fieldset>
  )
})
FormFieldSet.displayName = "FormFieldSet"

const FormAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    fieldConfig: FieldConfig<string>
  }
>(({ fieldConfig, ...props }, ref) => {
  return (
    <>
      {fieldConfig.error && (
        <Alert
          variant="destructive"
          id={fieldConfig.errorId}
          ref={ref}
          {...props}
        >
          {fieldConfig.error}
        </Alert>
      )}
    </>
  )
})
FormAlert.displayName = "FormAlert"

function FormErrors({ children }: { children: FieldConfig<string> }) {
  return (
    <>
      {children.errors &&
        children.errors?.length > 0 &&
        children.errors?.map((error, index) => (
          <Alert key={index} variant="destructive">
            {error}
          </Alert>
        ))}
    </>
  )
}

export {
  FormAlert,
  FormDescription,
  FormErrors,
  FormField,
  FormFieldSet,
  FormLabel,
  FormMessage,
}
