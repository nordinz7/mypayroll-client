import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { startCase } from "lodash"

export type SelectItem = {
  value: any
  label: string
}

type SelectScrollableProps = {
  placeholder?: string
  items: (SelectItem | string)[]
  value?: any
  onChange?: (value: any) => void
}

export const SelectScrollable = ({ placeholder = 'select', items, value, onChange }: SelectScrollableProps) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => {
            const isString = typeof item === 'string'
            const value = isString ? item : item.value
            const label = isString ? startCase(item) : item.label

            return <SelectItem key={value} value={value}>
              <SelectLabel>{label}</SelectLabel>
            </SelectItem>
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
