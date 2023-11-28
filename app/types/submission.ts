import { type Submission } from "@conform-to/react"

export type SubmissionResult = {
  intent: Submission["intent"]
  payload: Submission["payload"] | null
  error: Submission["error"]
}
