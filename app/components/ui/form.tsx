import { type FieldConfig } from "@conform-to/react"
import type * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { Alert } from "~/components/ui/alert"
import { Label, labelVariants } from "~/components/ui/label"
import { cn } from "~/utils/cn"

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-1", className)} {...props} />
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
    field: FieldConfig<string>
  }
>(({ field, ...props }, ref) => {
  return (
    <>
      {field.error && (
        <Alert variant="destructive" id={field.errorId} ref={ref} {...props}>
          {field.error}
        </Alert>
      )}
    </>
  )
})
FormAlert.displayName = "FormAlert"

export {
  FormAlert,
  FormDescription,
  FormField,
  FormFieldSet,
  FormLabel,
  FormMessage,
}
