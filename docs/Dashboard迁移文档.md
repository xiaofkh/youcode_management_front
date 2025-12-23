# YouCode Statistics Dashboard 迁移文档

## 一、原项目功能分析

### 1.1 项目概述

原 Dashboard 项目是一个基于 **Python Flask + Jinja2 模板 + 原生 JavaScript** 的统计数据分析平台，主要用于 YouCode 的使用数据统计和可视化展示。

### 1.2 前端技术栈（原项目）

| 类别 | 技术 | 说明 |
|------|------|------|
| 模板引擎 | Jinja2 | Flask 服务端渲染 |
| CSS 框架 | Bootstrap 5.3.0 | 响应式布局和组件 |
| 图标库 | Font Awesome 6.4.0 | 图标系统 |
| 图表库 | Chart.js 3.9.1 | 数据可视化 |
| JavaScript | ES6 Modules | 模块化开发 |
| 选择器组件 | Choices.js | 增强选择框 |
| HTTP 请求 | jQuery + Fetch API | API 调用 |

### 1.3 功能模块清单

原项目包含以下 **13 个主要功能模块**（Tab页签）：

| 序号 | 模块名称 | 文件名 | 功能描述 |
|------|----------|--------|----------|
| 1 | 概览 | `overview_tab` | 按BU/部门/领域的日活跃度统计 |
| 2 | 活跃用户 | `active_users_tab` | 活跃用户趋势图表、用户详情列表 |
| 3 | 代码生成用户 | `codegen_users_tab` | 代码生成活跃用户统计 |
| 4 | 代码生成详情 | `codegen_details_tab` | 代码生成采纳率趋势分析 |
| 5 | 采纳AI生成代码 | `code_adoption_tab` | AI代码采纳详情统计 |
| 6 | YouMa Next安装 | `youma_next_install_tab` | 插件安装统计 |
| 7 | MCP使用统计 | `mcp_usage_tab` | MCP功能使用情况 |
| 8 | 极样统计 | `extreme_sample_tab` | 极样平台数据统计 |
| 9 | 成本统计 | `cost_stats_tab` | Token消耗和费用统计 |
| 10 | 语言统计 | `language_stats_tab` | 编程语言使用分布 |
| 11 | 使用天数统计 | `usage_days_statistics` | 用户使用天数分析 |
| 12 | 模式使用详情 | `mode_usage_details` | 不同模式使用情况 |
| 13 | 自动补全采纳 | `autocomplete_accept_tab` | 自动补全功能采纳统计 |

### 1.4 通用功能组件

| 组件 | 功能描述 |
|------|----------|
| 导航栏 (`navbar`) | 品牌Logo、用户信息、管理入口、登出功能 |
| 登录页面 (`login`) | OIDC登录、账号密码登录 |
| 权限管理 (`unauthorized`) | 无权限提示页面 |
| Tab导航 (`tab_navigation`) | 动态Tab切换、权限控制 |
| 状态指示器 (`status`) | 加载状态显示 |
| 统计头部 (`stats_header`) | 缓存状态、刷新操作 |

### 1.5 前端 JavaScript 模块架构

```
static/js/
├── dashboard.js           # 主入口，Dashboard类
├── modules/               # 核心模块
│   ├── data-manager.js    # 数据管理、API调用、缓存
│   ├── chart-manager.js   # 图表管理
│   ├── table-manager.js   # 表格管理
│   ├── filter-manager.js  # 筛选器管理
│   ├── event-manager.js   # 事件管理
│   └── ui-utils.js        # UI工具函数
├── utils/                 # 工具函数
│   ├── loadInfo/          # 本地存储初始化
│   └── table_toggle/      # 表格展开/折叠
└── [各Tab模块].js          # 各功能页签独立JS
```

### 1.6 数据展示形式

1. **统计卡片**: 数值展示（活跃用户数、采纳率等）
2. **数据表格**: 用户列表、统计明细（支持筛选、排序、分页、导出Excel）
3. **趋势图表**: 折线图（活跃趋势）、饼图（占比分析）
4. **时间选择器**: 昨日/7天/30天/自定义时间范围

---

## 二、目标项目技术栈

### 2.1 技术栈对比

| 类别 | 原项目 | 目标项目 | 迁移影响 |
|------|--------|----------|----------|
| 前端框架 | 无（原生JS） | React 18.x | **重写组件** |
| 类型系统 | 无 | TypeScript 5.x | **添加类型定义** |
| 构建工具 | Flask 静态文件 | Vite 6.x | **工程化升级** |
| 样式方案 | Bootstrap 5 | Tailwind CSS 4.x | **样式重写** |
| UI组件 | Bootstrap组件 | Radix UI + shadcn/ui | **组件替换** |
| 状态管理 | 全局变量 | Jotai 2.x | **状态重构** |
| 服务端状态 | 手动缓存 | React Query 5.x | **数据层重构** |
| HTTP客户端 | jQuery/Fetch | Axios 1.x | **请求封装** |
| 路由 | Flask路由 | React Router 7.x | **前端路由** |
| 图标库 | Font Awesome | Lucide React | **图标替换** |
| 图表库 | Chart.js | 需引入（如 Recharts） | **图表重写** |

### 2.2 目标项目目录结构

```
src/
├── components/          # 通用组件
│   ├── ui/             # 基础 UI 组件
│   └── layout/         # 布局组件
├── pages/              # 页面组件
│   ├── dashboard/      # 看板主页
│   ├── overview/       # 概览页
│   ├── active-users/   # 活跃用户
│   ├── codegen/        # 代码生成统计
│   ├── cost-stats/     # 成本统计
│   └── ...             # 其他页面
├── hooks/              # 全局自定义 hooks
├── lib/                # 工具函数和配置
├── store/              # Jotai 状态管理
├── types/              # TypeScript 类型定义
├── styles/             # 全局样式
├── App.tsx             # 根组件和路由配置
└── main.tsx            # 应用入口
```

---

## 三、迁移步骤

### 阶段一：基础设施搭建（第1-2天）

#### 步骤 1.1：安装额外依赖

```bash
cd youcode-management-front

# 图表库
pnpm add recharts

# 日期选择器
pnpm add react-day-picker

# 数据表格
pnpm add @tanstack/react-table

# Excel导出
pnpm add xlsx

# 类名工具（已有）
# clsx, tailwind-merge
```

#### 步骤 1.2：创建基础类型定义

创建 `src/types/dashboard.ts`:

```typescript
// 用户信息类型
export interface User {
  id: string
  email: string
  displayName: string
  bu: string
  department: string
  domain: string
  position: string
}

// 活跃用户统计
export interface ActiveUserStats {
  totalUsers: number
  dailyActive: number
  weeklyActive: number
  monthlyActive: number
  percentages: {
    daily: number
    weekly: number
    monthly: number
  }
}

// 时间段类型
export type PeriodType = 'daily' | 'weekly' | 'monthly' | 'custom'

// 通用API响应
export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  message?: string
  lastUpdated?: string
}

// 图表数据点
export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

// 表格筛选条件
export interface TableFilters {
  bu?: string
  department?: string
  domain?: string
  position?: string
  status?: string
}

// 代码采纳统计
export interface CodeAdoptionStats {
  appliedLines: number
  totalLines: number
  rejectedLines: number
  adoptionRate: number
}

// 成本统计
export interface CostStats {
  totalCost: number
  inputTokens: number
  outputTokens: number
  totalTokens: number
}
```

#### 步骤 1.3：配置 API 客户端

创建 `src/lib/api.ts`:

```typescript
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可添加认证token等
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// API 方法封装
export const dashboardApi = {
  // 仪表板数据
  getDashboard: () => api.get('/dashboard'),
  
  // 活跃用户
  getDailyActiveUsers: () => api.get('/daily-active-users'),
  getWeeklyActiveUsers: () => api.get('/weekly-active-users'),
  getMonthlyActiveUsers: () => api.get('/monthly-active-users'),
  
  // 代码生成统计
  getCodeLineStatistics: (params: {
    startTime: string
    endTime: string
    page?: number
    limit?: number
  }) => api.get('/code-line-statistics', { params }),
  
  // 代码生成详情
  getCodegenDetails: (period: string) => api.get(`/codegen-details/${period}`),
  getCodegenTrend: (period: string) => api.get(`/codegen-details/trend/${period}`),
  
  // 缓存管理
  getCacheInfo: () => api.get('/file-cache/info'),
  clearCache: () => api.post('/file-cache/clear-all'),
  
  // 刷新数据
  refreshData: () => api.get('/refresh-data'),
}
```

#### 步骤 1.4：创建全局状态

创建 `src/store/dashboard.ts`:

```typescript
import { atom } from 'jotai'
import type { PeriodType, TableFilters, User } from '@/types/dashboard'

// 当前用户
export const currentUserAtom = atom<User | null>(null)

// 全局时间范围
export const globalPeriodAtom = atom<PeriodType>('daily')

// 自定义时间范围
export const customDateRangeAtom = atom<{
  startDate: string | null
  endDate: string | null
}>({
  startDate: null,
  endDate: null,
})

// 全局筛选条件
export const globalFiltersAtom = atom<TableFilters>({})

// 数据刷新状态
export const isRefreshingAtom = atom<boolean>(false)

// 当前激活的Tab
export const activeTabAtom = atom<string>('overview')
```

---

### 阶段二：通用组件开发（第3-5天）

#### 步骤 2.1：创建布局组件

创建 `src/components/layout/DashboardLayout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import { DashboardNav } from './DashboardNav'
import { DashboardSidebar } from './DashboardSidebar'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

#### 步骤 2.2：创建统计卡片组件

创建 `src/components/ui/stat-card.tsx`:

```tsx
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

const variantStyles = {
  default: 'border-gray-200 text-gray-900',
  primary: 'border-blue-500 text-blue-600',
  success: 'border-green-500 text-green-600',
  warning: 'border-yellow-500 text-yellow-600',
  danger: 'border-red-500 text-red-600',
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border-l-4 bg-white p-6 shadow-sm',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className={cn('text-3xl font-bold', variantStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <Icon className={cn('h-12 w-12 opacity-20', variantStyles[variant])} />
        )}
      </div>
    </div>
  )
}
```

#### 步骤 2.3：创建时间范围选择器

创建 `src/components/ui/period-selector.tsx`:

```tsx
import { useAtom } from 'jotai'
import { globalPeriodAtom, customDateRangeAtom } from '@/store/dashboard'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import type { PeriodType } from '@/types/dashboard'

const periods: { value: PeriodType; label: string }[] = [
  { value: 'daily', label: '昨日' },
  { value: 'weekly', label: '最近7天' },
  { value: 'monthly', label: '最近30天' },
  { value: 'custom', label: '更多' },
]

export function PeriodSelector() {
  const [period, setPeriod] = useAtom(globalPeriodAtom)
  const [customRange, setCustomRange] = useAtom(customDateRangeAtom)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="font-medium">时间范围</span>
        </div>
        <div className="flex gap-2">
          {periods.map(({ value, label }) => (
            <Button
              key={value}
              variant={period === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {period === 'custom' && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-sm text-gray-600">开始日期</label>
              <input
                type="date"
                className="mt-1 block rounded border px-3 py-2"
                value={customRange.startDate || ''}
                onChange={(e) =>
                  setCustomRange((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">结束日期</label>
              <input
                type="date"
                className="mt-1 block rounded border px-3 py-2"
                value={customRange.endDate || ''}
                onChange={(e) =>
                  setCustomRange((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
            <Button className="mt-6">应用</Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

#### 步骤 2.4：创建数据表格组件

创建 `src/components/ui/data-table.tsx`:

```tsx
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import * as XLSX from 'xlsx'

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pageSize?: number
  exportable?: boolean
  exportFileName?: string
}

export function DataTable<T>({
  data,
  columns,
  pageSize = 10,
  exportable = true,
  exportFileName = 'export',
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  })

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data')
    XLSX.writeFile(wb, `${exportFileName}.xlsx`)
  }

  return (
    <div className="space-y-4">
      {exportable && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            导出Excel
          </Button>
        </div>
      )}

      <div className="rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-left text-sm">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          第 {table.getState().pagination.pageIndex + 1} 页，共{' '}
          {table.getPageCount()} 页
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

### 阶段三：页面模块迁移（第6-15天）

#### 步骤 3.1：概览页面迁移

创建 `src/pages/overview/OverviewPage.tsx`:

```tsx
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api'
import { StatCard } from '@/components/ui/stat-card'
import { DataTable } from '@/components/ui/data-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Calendar, TrendingUp } from 'lucide-react'

export function OverviewPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: dashboardApi.getDashboard,
  })

  if (isLoading) {
    return <div className="flex justify-center p-8">加载中...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">概览</h1>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">日活跃</TabsTrigger>
          <TabsTrigger value="codegen">代码生成活跃度</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          {/* 按BU统计表格 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
              最近30天工作日活跃（按BU）
            </h2>
            {/* DataTable 组件 */}
          </div>

          {/* 按部门统计表格 */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
              最近30天工作日活跃（按部门）
            </h2>
            {/* DataTable 组件 */}
          </div>
        </TabsContent>

        <TabsContent value="codegen">
          {/* 代码生成活跃度内容 */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

#### 步骤 3.2：页面迁移顺序建议

按照以下优先级顺序进行页面迁移：

| 优先级 | 页面 | 复杂度 | 预计时间 |
|--------|------|--------|----------|
| P0 | 概览页 (Overview) | 中 | 1天 |
| P0 | 活跃用户 (Active Users) | 高 | 2天 |
| P1 | 代码生成用户 (Codegen Users) | 中 | 1天 |
| P1 | 代码生成详情 (Codegen Details) | 高 | 2天 |
| P1 | 采纳AI代码 (Code Adoption) | 高 | 2天 |
| P2 | 成本统计 (Cost Stats) | 高 | 2天 |
| P2 | 语言统计 (Language Stats) | 中 | 1天 |
| P3 | 其他页面 | 中 | 4天 |

---

### 阶段四：图表组件迁移（第10-12天）

#### 步骤 4.1：安装 Recharts

```bash
pnpm add recharts
```

#### 步骤 4.2：创建趋势图表组件

创建 `src/components/charts/TrendChart.tsx`:

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface TrendChartProps {
  data: Array<{
    date: string
    [key: string]: string | number
  }>
  lines: Array<{
    dataKey: string
    name: string
    color: string
  }>
  height?: number
}

export function TrendChart({ data, lines, height = 400 }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map(({ dataKey, name, color }) => (
          <Line
            key={dataKey}
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke={color}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
```

#### 步骤 4.3：创建饼图组件

创建 `src/components/charts/PieChartComponent.tsx`:

```tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface PieChartProps {
  data: Array<{
    name: string
    value: number
  }>
  colors?: string[]
  height?: number
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function PieChartComponent({
  data,
  colors = DEFAULT_COLORS,
  height = 300,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(1)}%`
          }
        >
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
```

---

### 阶段五：路由与权限配置（第13-14天）

#### 步骤 5.1：配置路由

更新 `src/App.tsx`:

```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { OverviewPage } from '@/pages/overview/OverviewPage'
import { ActiveUsersPage } from '@/pages/active-users/ActiveUsersPage'
import { CodegenUsersPage } from '@/pages/codegen-users/CodegenUsersPage'
import { CodegenDetailsPage } from '@/pages/codegen-details/CodegenDetailsPage'
import { CodeAdoptionPage } from '@/pages/code-adoption/CodeAdoptionPage'
import { CostStatsPage } from '@/pages/cost-stats/CostStatsPage'
import { LanguageStatsPage } from '@/pages/language-stats/LanguageStatsPage'
import { LoginPage } from '@/pages/auth/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/overview" replace />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="active-users" element={<ActiveUsersPage />} />
        <Route path="codegen-users" element={<CodegenUsersPage />} />
        <Route path="codegen-details" element={<CodegenDetailsPage />} />
        <Route path="code-adoption" element={<CodeAdoptionPage />} />
        <Route path="cost-stats" element={<CostStatsPage />} />
        <Route path="language-stats" element={<LanguageStatsPage />} />
      </Route>
    </Routes>
  )
}

export default App
```

#### 步骤 5.2：创建导航侧边栏

创建 `src/components/layout/DashboardSidebar.tsx`:

```tsx
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Code,
  FileCode,
  CheckCircle,
  DollarSign,
  Languages,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/overview', icon: LayoutDashboard, label: '概览' },
  { path: '/active-users', icon: Users, label: '活跃用户' },
  { path: '/codegen-users', icon: Code, label: '代码生成用户' },
  { path: '/codegen-details', icon: FileCode, label: '代码生成详情' },
  { path: '/code-adoption', icon: CheckCircle, label: '采纳AI代码' },
  { path: '/cost-stats', icon: DollarSign, label: '成本统计' },
  { path: '/language-stats', icon: Languages, label: '语言统计' },
]

export function DashboardSidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <nav className="space-y-1 p-4">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
```

---

### 阶段六：测试与优化（第15-17天）

#### 步骤 6.1：测试清单

- [ ] 所有页面加载正常
- [ ] API 调用和数据展示正确
- [ ] 图表渲染正确
- [ ] 表格筛选、排序、分页功能正常
- [ ] Excel 导出功能正常
- [ ] 响应式布局适配
- [ ] 时间范围选择联动正确
- [ ] 状态管理数据同步

#### 步骤 6.2：性能优化

1. **代码分割**: 使用 `React.lazy()` 按需加载页面
2. **数据缓存**: 合理配置 React Query 的 `staleTime` 和 `cacheTime`
3. **虚拟列表**: 大数据表格使用虚拟滚动

---

## 四、组件映射对照表

### 4.1 Bootstrap → Tailwind/Radix 映射

| Bootstrap 组件 | 替换方案 | 说明 |
|----------------|----------|------|
| `btn btn-primary` | `<Button variant="default">` | Radix Button |
| `btn btn-outline-*` | `<Button variant="outline">` | |
| `card` | `<div className="rounded-lg bg-white shadow">` | Tailwind 样式 |
| `card-header` | `<div className="rounded-t-lg bg-gradient-to-r ...">` | |
| `table table-striped` | `<DataTable>` | TanStack Table |
| `nav nav-tabs` | `<Tabs>` | Radix Tabs |
| `form-select` | `<Select>` | Radix Select |
| `form-control` | `<Input>` | shadcn/ui Input |
| `modal` | `<Dialog>` | Radix Dialog |
| `dropdown` | `<DropdownMenu>` | Radix DropdownMenu |
| `alert` | `<Alert>` | shadcn/ui Alert |
| `spinner-border` | `<Loader2 className="animate-spin">` | Lucide + Tailwind |

### 4.2 Font Awesome → Lucide 图标映射

| Font Awesome | Lucide React | 用途 |
|--------------|--------------|------|
| `fa-chart-line` | `<LineChart>` | 折线图图标 |
| `fa-users` | `<Users>` | 用户图标 |
| `fa-calendar-alt` | `<Calendar>` | 日历图标 |
| `fa-filter` | `<Filter>` | 筛选图标 |
| `fa-file-excel` | `<FileSpreadsheet>` | Excel图标 |
| `fa-sync-alt` | `<RefreshCw>` | 刷新图标 |
| `fa-sign-out-alt` | `<LogOut>` | 登出图标 |
| `fa-building` | `<Building2>` | 建筑/BU图标 |
| `fa-code` | `<Code>` | 代码图标 |
| `fa-dollar-sign` | `<DollarSign>` | 费用图标 |

---

## 五、API 接口对接清单

### 5.1 需要对接的 API 接口

| 接口路径 | 方法 | 用途 | 对应页面 |
|----------|------|------|----------|
| `/api/dashboard` | GET | 仪表板总览数据 | 概览 |
| `/api/daily-active-users` | GET | 昨日活跃用户 | 活跃用户 |
| `/api/weekly-active-users` | GET | 周活跃用户 | 活跃用户 |
| `/api/monthly-active-users` | GET | 月活跃用户 | 活跃用户 |
| `/api/code-line-statistics` | GET | 代码行数统计 | 代码生成 |
| `/api/code-line-statistics/{period}` | GET | 按时间段统计 | 代码生成 |
| `/api/codegen-details/{period}` | GET | 代码生成详情 | 代码生成详情 |
| `/api/codegen-details/trend/{period}` | GET | 代码生成趋势 | 代码生成详情 |
| `/api/refresh-data` | GET | 刷新数据 | 全局 |
| `/api/file-cache/info` | GET | 缓存状态 | 全局 |
| `/api/file-cache/clear-all` | POST | 清空缓存 | 全局 |

### 5.2 创建 React Query Hooks

创建 `src/hooks/useDashboard.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api'

// 获取仪表板数据
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getDashboard,
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

// 获取活跃用户
export function useActiveUsers(period: 'daily' | 'weekly' | 'monthly') {
  const apiMap = {
    daily: dashboardApi.getDailyActiveUsers,
    weekly: dashboardApi.getWeeklyActiveUsers,
    monthly: dashboardApi.getMonthlyActiveUsers,
  }

  return useQuery({
    queryKey: ['active-users', period],
    queryFn: apiMap[period],
    staleTime: 5 * 60 * 1000,
  })
}

// 刷新数据
export function useRefreshData() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardApi.refreshData,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}

// 清空缓存
export function useClearCache() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardApi.clearCache,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
```

---

## 六、注意事项

### 6.1 样式迁移注意点

1. **颜色映射**: Bootstrap 的 `primary/success/warning/danger` 对应 Tailwind 的 `blue/green/yellow/red`
2. **间距单位**: Bootstrap 使用 `rem`，Tailwind 使用 `4px` 倍数
3. **响应式断点**: 两者断点略有不同，需要调整

### 6.2 数据格式注意点

1. 确保后端 API 返回格式与前端类型定义一致
2. 日期格式统一使用 ISO 8601
3. 数值类型注意精度处理

### 6.3 兼容性注意点

1. 保持与后端 API 的兼容
2. 确保登录认证流程正确对接
3. 注意 CORS 配置

---

## 七、迁移时间估算

| 阶段 | 任务 | 预计时间 |
|------|------|----------|
| 阶段一 | 基础设施搭建 | 2天 |
| 阶段二 | 通用组件开发 | 3天 |
| 阶段三 | 页面模块迁移 | 10天 |
| 阶段四 | 图表组件迁移 | 3天 |
| 阶段五 | 路由与权限配置 | 2天 |
| 阶段六 | 测试与优化 | 3天 |
| **总计** | | **约23个工作日** |

---

## 八、后续优化建议

1. **添加单元测试**: 使用 Vitest + React Testing Library
2. **添加 E2E 测试**: 使用 Playwright
3. **添加错误边界**: 防止局部错误影响整体
4. **添加骨架屏**: 提升加载体验
5. **添加国际化**: 支持多语言
6. **添加主题切换**: 支持深色模式
