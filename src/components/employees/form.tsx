"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { EducationLevel, MartialStatus, Race, Religion } from "@/types/types"
import FormFieldMapper, { FormFieldItem } from "@/components/shared/form-field-mapper"
import { DatePicker } from "@/components/shared/date-picker"
import { SelectScrollable } from "@/components/shared/select"

const FormSchema = z.object({
  birthDate: z.date(),
  children: z.number().default(0),
  educationLevel: z.nativeEnum(EducationLevel),
  email: z.string().nullable(),
  endDate: z.date().nullable(),
  joinDate: z.date(),
  martialStatus: z.nativeEnum(MartialStatus),
  name: z.string(),
  nationality: z.string(),
  phone: z.string().nullable(),
  qualification: z.string().nullable(),
  race: z.nativeEnum(Race),
  religion: z.nativeEnum(Religion),
  spouseName: z.string().nullable(),
  spouseOccupation: z.string().nullable(),
})

export function EmployeeForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    },
  })

  function handleSubmit() {
    const data = form.getValues()
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  const items: FormFieldItem[] = [
    {
      name: "name",
      label: "Name",
      input: Input,
    },
    {
      name: "email",
      label: "Email",
      input: Input,
    },
    {
      name: "joinDate",
      label: "Join Date",
      input: DatePicker,
    },
    {
      name: "birthDate",
      label: "Birth Date",
      input: DatePicker,
    },
    {
      name: "race",
      label: "Race",
      input: SelectScrollable,
      inputProps: {
        items: Object.values(Race)
      }
    },
    {
      name: "Religion",
      label: "Religion",
      input: SelectScrollable,
      inputProps: {
        items: Object.values(Religion)
      }
    },
    {
      name: "phone",
      label: "Phone",
      input: Input,
    },
  ]

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormFieldMapper form={form} items={items} />
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </form>
    </Form>
  )
}
