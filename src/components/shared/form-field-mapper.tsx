import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UseFormReturn } from 'react-hook-form'
import { generateUniqueId } from '@/utils'

export type FormFieldItem = {
  name: string
  label: string
  input: any
  hidden?: boolean
  disabled?: boolean
  inputProps?: any
  description?: string
}

type FormFieldMapperProps = {
  form: UseFormReturn<any>
  items: FormFieldItem[]
}

const FormFieldMapper = ({ form, items = [] }: FormFieldMapperProps) => {
  if (!items.length) return null

  return (<>
    {
      items.map((item, index) => {
        const { name, label, description, inputProps = {}, hidden, disabled } = item
        return (
          <FormField
            control={form.control}
            name={name}
            key={`${index}-${generateUniqueId()}`}
            // disabled={!!disabled}
            render={({ field }) => (
              <FormItem hidden={!!hidden}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <item.input {...inputProps} {...field} />
                </FormControl>
                {description && <FormDescription>
                  {description}
                </FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })
    }
  </>)
}

export default FormFieldMapper