import { Metadata } from "next"
import NewJobForm from "./newJobForm"

export const metadata: Metadata = {
    title: "Post a new Job"
}
export default function Page() {
  return (
    <NewJobForm/>
  )
}
