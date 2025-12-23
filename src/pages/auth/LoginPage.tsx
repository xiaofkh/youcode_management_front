import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { LineChart } from "lucide-react"
import { currentUserAtom, mockUser } from "@/store/user"

export function LoginPage() {
  const navigate = useNavigate()
  const [, setCurrentUser] = useAtom(currentUserAtom)
  const [isLoading, setIsLoading] = useState(false)

  const handleOIDCLogin = () => {
    // TODO: 实现 OIDC 登录
    setIsLoading(true)
    setTimeout(() => {
      setCurrentUser(mockUser)
      navigate("/")
    }, 500)
  }

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实现账号密码登录
    setIsLoading(true)
    setTimeout(() => {
      setCurrentUser(mockUser)
      navigate("/")
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <LineChart className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600">YouCode Statistics</h1>
          <p className="mt-2 text-gray-500">请登录以访问统计仪表板</p>
        </div>

        {/* OIDC 登录按钮 */}
        <Button
          onClick={handleOIDCLogin}
          disabled={isLoading}
          className="mb-4 w-full"
        >
          使用 OIDC 登录（邮箱账号密码）
        </Button>

        {/* 分隔线 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">或</span>
          </div>
        </div>

        {/* 账号密码登录表单 */}
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              用户名
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="请输入用户名"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              密码
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="请输入密码"
            />
          </div>
          <Button type="submit" variant="outline" disabled={isLoading} className="w-full">
            账号密码登录
          </Button>
        </form>
      </div>
    </div>
  )
}
