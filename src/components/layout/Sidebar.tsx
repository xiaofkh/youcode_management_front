import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Code,
  FileCode,
  CheckCircle,
  Package,
  Wrench,
  Target,
  DollarSign,
  Globe,
  Calendar,
  Settings,
  Zap,
  ChevronDown,
  ChevronRight,
  UserCog,
  CloudDownload,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react"

// 菜单项类型
interface MenuItem {
  path: string
  label: string
  icon: LucideIcon
}

// 菜单组类型
interface MenuGroup {
  key: string
  label: string
  icon: LucideIcon
  children: MenuItem[]
}

// 菜单配置
const menuConfig: MenuGroup[] = [
  {
    key: "overview",
    label: "概览",
    icon: LayoutDashboard,
    children: [
      { path: "/overview", label: "总览", icon: LayoutDashboard },
      { path: "/active-users", label: "活跃用户", icon: Users },
      { path: "/codegen-users", label: "代码生成用户", icon: Code },
      { path: "/codegen-details", label: "代码生成详情", icon: FileCode },
      { path: "/code-adoption", label: "采纳AI代码", icon: CheckCircle },
      { path: "/youma-install", label: "YouMa Next安装", icon: Package },
      { path: "/mcp-usage", label: "MCP使用统计", icon: Wrench },
      { path: "/extreme-sample", label: "极样统计", icon: Target },
      { path: "/cost-stats", label: "成本统计", icon: DollarSign },
      { path: "/language-stats", label: "语言统计", icon: Globe },
      { path: "/usage-days", label: "使用天数统计", icon: Calendar },
      { path: "/mode-usage", label: "模式使用详情", icon: Settings },
      { path: "/autocomplete", label: "自动补全采纳", icon: Zap },
    ],
  },
  {
    key: "management",
    label: "管理",
    icon: Settings,
    children: [
      { path: "/manage/users", label: "用户管理", icon: UserCog },
      {
        path: "/manage/devcloud-users",
        label: "开发云用户导入",
        icon: CloudDownload,
      },
      { path: "/manage/tabs", label: "页签管理", icon: LayoutGrid },
    ],
  },
]

export function Sidebar() {
  const location = useLocation()

  // 根据当前路径确定默认展开的菜单
  const getDefaultExpanded = (): Set<string> => {
    const defaults = new Set<string>()
    const currentPath = location.pathname

    for (const menu of menuConfig) {
      if (menu.children.some((child) => currentPath.startsWith(child.path))) {
        defaults.add(menu.key)
      }
    }

    // 如果没有匹配的，默认展开概览
    if (defaults.size === 0) {
      defaults.add("overview")
    }

    return defaults
  }

  // 使用 Set 存储展开的菜单，支持多个同时展开
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    getDefaultExpanded
  )

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <aside className="sticky top-16 h-[calc(100vh-64px)] w-64 overflow-y-auto border-r border-gray-200 bg-white">
      <nav className="p-4">
        {menuConfig.map((menu) => {
          const isExpanded = expandedMenus.has(menu.key)
          const Icon = menu.icon

          return (
            <div key={menu.key} className="mb-2">
              {/* 一级菜单 */}
              <button
                onClick={() => toggleMenu(menu.key)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors",
                  isExpanded
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{menu.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* 二级菜单 */}
              {isExpanded && (
                <div className="mt-1 space-y-1 pl-4">
                  {menu.children.map((child) => {
                    const ChildIcon = child.icon
                    return (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "border-r-2 border-blue-600 bg-blue-50 text-blue-600"
                              : "text-gray-600 hover:bg-gray-100"
                          )
                        }
                      >
                        <ChildIcon className="h-4 w-4" />
                        <span>{child.label}</span>
                      </NavLink>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
