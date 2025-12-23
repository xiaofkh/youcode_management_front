import { Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"

// 概览模块页面（dashboard）
import { OverviewPage } from "@/pages/dashboard/overview/OverviewPage"
import { ActiveUsersPage } from "@/pages/dashboard/active-users/ActiveUsersPage"
import { CodegenUsersPage } from "@/pages/dashboard/codegen-users/CodegenUsersPage"
import { CodegenDetailsPage } from "@/pages/dashboard/codegen-details/CodegenDetailsPage"
import { CodeAdoptionPage } from "@/pages/dashboard/code-adoption/CodeAdoptionPage"
import { YoumaInstallPage } from "@/pages/dashboard/youma-install/YoumaInstallPage"
import { McpUsagePage } from "@/pages/dashboard/mcp-usage/McpUsagePage"
import { ExtremeSamplePage } from "@/pages/dashboard/extreme-sample/ExtremeSamplePage"
import { CostStatsPage } from "@/pages/dashboard/cost-stats/CostStatsPage"
import { LanguageStatsPage } from "@/pages/dashboard/language-stats/LanguageStatsPage"
import { UsageDaysPage } from "@/pages/dashboard/usage-days/UsageDaysPage"
import { ModeUsagePage } from "@/pages/dashboard/mode-usage/ModeUsagePage"
import { AutocompletePage } from "@/pages/dashboard/autocomplete/AutocompletePage"

// 管理模块页面（manage）
import { UsersManagePage } from "@/pages/manage/users/UsersManagePage"
import { DevcloudUsersPage } from "@/pages/manage/devcloud-users/DevcloudUsersPage"
import { TabsManagePage } from "@/pages/manage/tabs/TabsManagePage"

// 认证页面（auth）
import { LoginPage } from "@/pages/auth/LoginPage"

function App() {
  return (
    <Routes>
      {/* 登录页面 - 无布局 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 主应用 - 带布局 */}
      <Route path="/" element={<Layout />}>
        {/* 默认重定向到总览 */}
        <Route index element={<Navigate to="/overview" replace />} />

        {/* 概览模块 */}
        <Route path="overview" element={<OverviewPage />} />
        <Route path="active-users" element={<ActiveUsersPage />} />
        <Route path="codegen-users" element={<CodegenUsersPage />} />
        <Route path="codegen-details" element={<CodegenDetailsPage />} />
        <Route path="code-adoption" element={<CodeAdoptionPage />} />
        <Route path="youma-install" element={<YoumaInstallPage />} />
        <Route path="mcp-usage" element={<McpUsagePage />} />
        <Route path="extreme-sample" element={<ExtremeSamplePage />} />
        <Route path="cost-stats" element={<CostStatsPage />} />
        <Route path="language-stats" element={<LanguageStatsPage />} />
        <Route path="usage-days" element={<UsageDaysPage />} />
        <Route path="mode-usage" element={<ModeUsagePage />} />
        <Route path="autocomplete" element={<AutocompletePage />} />

        {/* 管理模块 */}
        <Route path="manage">
          <Route path="users" element={<UsersManagePage />} />
          <Route path="devcloud-users" element={<DevcloudUsersPage />} />
          <Route path="tabs" element={<TabsManagePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
