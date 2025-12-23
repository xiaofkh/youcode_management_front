import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/ui/combobox"
import { useState } from "react"

export interface PaginationProps {
  current: number
  pageSize: number
  total: number
  pageSizeOptions?: number[]
  onChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
}

export function Pagination({
  current,
  pageSize,
  total,
  pageSizeOptions = [10, 20, 50, 100],
  onChange,
  onPageSizeChange,
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState("")
  const totalPages = Math.ceil(total / pageSize)

  const handleJump = () => {
    const page = parseInt(jumpPage, 10)
    if (page >= 1 && page <= totalPages) {
      onChange(page)
      setJumpPage("")
    }
  }

  const renderPageButtons = () => {
    const buttons = []
    const maxButtons = 5
    let start = Math.max(1, current - Math.floor(maxButtons / 2))
    const end = Math.min(totalPages, start + maxButtons - 1)

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1)
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === current ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(i)}
          className="h-8 w-8 p-0"
        >
          {i}
        </Button>
      )
    }

    return buttons
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* 左侧：每页条数 */}
      {showSizeChanger && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">每页显示：</span>
          <Combobox
            options={pageSizeOptions.map((size) => ({
              value: size.toString(),
              label: `${size}条`,
            }))}
            value={pageSize.toString()}
            onValueChange={(val) => onPageSizeChange?.(parseInt(val, 10))}
            placeholder="选择"
            className="h-8 w-24"
          />
        </div>
      )}

      {/* 中间：总数信息 */}
      {showTotal && (
        <div className="text-sm text-gray-600">
          共 <span className="font-medium">{total}</span> 条，第{" "}
          <span className="font-medium">{current}</span> /{" "}
          <span className="font-medium">{totalPages}</span> 页
        </div>
      )}

      {/* 右侧：分页按钮 */}
      <div className="flex items-center gap-1">
        {showQuickJumper && (
          <div className="mr-2 flex items-center gap-1">
            <Input
              className="h-8 w-16 text-center text-sm"
              placeholder="页码"
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleJump}
              className="h-8"
            >
              跳转
            </Button>
          </div>
        )}

        {/* 首页 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(1)}
          disabled={current <= 1}
          className="h-8 w-8 p-0"
          title="首页"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* 上一页 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(current - 1)}
          disabled={current <= 1}
          className="h-8 w-8 p-0"
          title="上一页"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {renderPageButtons()}

        {/* 下一页 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(current + 1)}
          disabled={current >= totalPages}
          className="h-8 w-8 p-0"
          title="下一页"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* 末页 */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(totalPages)}
          disabled={current >= totalPages}
          className="h-8 w-8 p-0"
          title="末页"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
