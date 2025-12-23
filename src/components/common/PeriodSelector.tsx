import { useState } from "react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Calendar, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type PeriodValue = "daily" | "weekly" | "monthly" | "custom"

export interface DateRange {
  from: string
  to: string
}

export interface PeriodOption {
  value: PeriodValue
  label: string
}

export interface PeriodSelectorProps {
  value: PeriodValue
  onChange: (value: PeriodValue) => void
  options?: PeriodOption[]
  dateRange?: DateRange
  onDateRangeChange?: (range: DateRange) => void
  onDateRangeApply?: (range: DateRange) => void
}

const defaultOptions: PeriodOption[] = [
  { value: "daily", label: "昨日" },
  { value: "weekly", label: "最近七天" },
  { value: "monthly", label: "最近30天" },
  { value: "custom", label: "更多" },
]

export function PeriodSelector({
  value,
  onChange,
  options = defaultOptions,
  dateRange,
  onDateRangeChange,
  onDateRangeApply,
}: PeriodSelectorProps) {
  const [showCustomRange, setShowCustomRange] = useState(false)
  const [localRange, setLocalRange] = useState<DateRange>({
    from: dateRange?.from || format(new Date(), "yyyy-MM-dd"),
    to: dateRange?.to || format(new Date(), "yyyy-MM-dd"),
  })

  const handleOptionClick = (optionValue: PeriodValue) => {
    onChange(optionValue)
    if (optionValue === "custom") {
      setShowCustomRange(true)
    } else {
      setShowCustomRange(false)
    }
  }

  const handleApply = () => {
    onDateRangeChange?.(localRange)
    onDateRangeApply?.(localRange)
  }

  return (
    <div className="space-y-3">
      <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionClick(option.value)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-all",
              value === option.value
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {showCustomRange && value === "custom" && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-700">
            <Calendar className="h-4 w-4" />
            自定义时间范围
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-gray-600">开始日期</Label>
              <Input
                type="date"
                value={localRange.from}
                onChange={(e) =>
                  setLocalRange((prev) => ({ ...prev, from: e.target.value }))
                }
                className="h-9 w-40"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-gray-600">结束日期</Label>
              <Input
                type="date"
                value={localRange.to}
                onChange={(e) =>
                  setLocalRange((prev) => ({ ...prev, to: e.target.value }))
                }
                className="h-9 w-40"
              />
            </div>
            <Button onClick={handleApply} size="sm" className="h-9">
              <Check className="mr-1 h-4 w-4" />
              应用
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
