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
import { FormMode } from "@/types/customGlobalTypes"
import { startCase } from "lodash"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_EMPLOYEE, VIEW_EMPLOYEE, UPDATE_EMPLOYEE } from "@/components/employees/schema"
import { useNavigate } from "react-router-dom"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

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

type EmployeeFormProps = {
  mode: FormMode
  employeeId?: string
}

export const EmployeeForm = ({ mode, employeeId }: EmployeeFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  })

  const navigate = useNavigate()

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: (data) => {
      if (data.createEmployee.id) {
        navigate(`/employee/${data.createEmployee.id}`)
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      })
    }
  })
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE,
    {
      onCompleted: () => {
        toast({
          title: "Success",
          description: "Employee updated successfully",
        })
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
        })
      }
    }
  )

  const { loading } = useQuery(VIEW_EMPLOYEE, {
    variables: { id: Number(employeeId) },
    skip: mode === FormMode.create || !employeeId,
    onCompleted: (data) => {
      form.reset(data.employee)
    }
  })

  const handleSubmit = async (e: any) => {
    e?.preventDefault()
    const data = form.getValues()
    data.children = Number(data.children)
    if (mode === FormMode.create) {
      await createEmployee({ variables: { input: data } })
    } else {
      await updateEmployee({ variables: { id: Number(employeeId), input: data } })
    }
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
      name: "birthDate",
      label: "Birth Date",
      input: DatePicker,
    },
    {
      name: "joinDate",
      label: "Join Date",
      input: DatePicker,
    },
    {
      name: "endDate",
      label: "End Date",
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
      name: "religion",
      label: "Religion",
      input: SelectScrollable,
      inputProps: {
        items: Object.values(Religion)
      }
    },
    {
      name: "martialStatus",
      label: "Martial Status",
      input: SelectScrollable,
      inputProps: {
        items: Object.values(MartialStatus)
      }
    },
    {
      name: "educationLevel",
      label: "EducationLevel",
      input: SelectScrollable,
      inputProps: {
        items: Object.values(EducationLevel)
      }
    },
    {
      name: "qualification",
      label: "Qualification",
      input: Input,
    },
    {
      name: "nationality",
      label: "Nationality",
      input: Input,
    },
    {
      name: "spouseName",
      label: "SpouseName",
      input: Input,
    },
    {
      name: "spouseOccupation",
      label: "SpouseOccupation",
      input: Input,
    },
    {
      name: "children",
      label: "No. of Children",
      input: Input,
      inputProps: {
        type: "number"
      }
    },
    {
      name: "phone",
      label: "Phone",
      input: Input,
    },
  ]

  if (loading) {
    < LoadingSpinner />
  }

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6" onSubmit={handleSubmit}>
        <FormFieldMapper form={form} items={items} />
        <Button type='submit'>{startCase(mode)}</Button>
      </form>
    </Form>
  )
}
