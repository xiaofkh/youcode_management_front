import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CheckSquare, Square } from "lucide-react"

export interface CheckboxGroupProps {
  label?: string
  options: Array<{ value: string; label: string }>
  value: string[]
  onChange: (value: string[]) => void
  showSelectAll?: boolean
  columns?: number
}

export function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  showSelectAll = true,
  columns = 4,
}: CheckboxGroupProps) {
  const handleSelectAll = () => {
    onChange(options.map((opt) => opt.value))
  }

  const handleDeselectAll = () => {
    onChange([])
  }

  const handleToggle = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter((v) => v !== optValue))
    } else {
      onChange([...value, optValue])
    }
  }

  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        {label && (
          <h6 className="text-sm font-medium">
            {label}{" "}
            <span className="text-gray-500">({value.length}/{options.length})</span>
          </h6>
        )}
        {showSelectAll && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="h-7 text-xs"
            >
              <CheckSquare className="mr-1 h-3 w-3" />
              全选
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
              className="h-7 text-xs"
            >
              <Square className="mr-1 h-3 w-3" />
              取消全选
            </Button>
          </div>
        )}
      </div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            <Checkbox
              id={opt.value}
              checked={value.includes(opt.value)}
              onCheckedChange={() => handleToggle(opt.value)}
            />
            <Label
              htmlFor={opt.value}
              className="cursor-pointer text-sm font-normal"
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
