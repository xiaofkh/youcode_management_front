import { Filter, X, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Combobox } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"

export interface FilterItem {
  key: string
  label: string
  type: "select" | "input"
  options?: Array<{ value: string; label: string }>
  placeholder?: string
}

export interface FilterBarProps {
  filters: FilterItem[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
  onClear: () => void
  showExport?: boolean
  onExport?: () => void
}

export function FilterBar({
  filters,
  values,
  onChange,
  onClear,
  showExport = false,
  onExport,
}: FilterBarProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Filter className="h-4 w-4" />
          <span>筛选条件:</span>
        </div>

        {filters.map((filter) => (
          <div key={filter.key} className="w-40">
            {filter.type === "select" ? (
              <Combobox
                options={filter.options || []}
                value={values[filter.key] || ""}
                onValueChange={(val) => onChange(filter.key, val)}
                placeholder={filter.placeholder || filter.label}
                className="h-8 text-sm"
              />
            ) : (
              <Input
                className="h-8 text-sm"
                placeholder={filter.placeholder || filter.label}
                value={values[filter.key] || ""}
                onChange={(e) => onChange(filter.key, e.target.value)}
              />
            )}
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="h-8"
        >
          <X className="mr-1 h-3 w-3" />
          清除
        </Button>

        {showExport && (
          <Button
            variant="default"
            size="sm"
            onClick={onExport}
            className="h-8 bg-green-600 hover:bg-green-700"
          >
            <FileSpreadsheet className="mr-1 h-3 w-3" />
            导出Excel
          </Button>
        )}
      </div>
    </div>
  )
}
