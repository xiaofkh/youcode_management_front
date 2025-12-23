import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LineChart, User, LogOut, ChevronDown } from "lucide-react"
import { currentUserAtom, mockUser } from "@/store/user"
import { useEffect } from "react"

export function Header() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  // 模拟用户登录（后续替换为实际登录逻辑）
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(mockUser)
    }
  }, [currentUser, setCurrentUser])

  const handleLogout = async () => {
    // TODO: 调用登出 API
    setCurrentUser(null)
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 px-6 shadow-md">
      {/* Logo 区域 */}
      <div className="flex items-center gap-3">
        <LineChart className="h-8 w-8 text-white" />
        <h1 className="text-xl font-semibold text-white">
          YouCode Statistics Dashboard
        </h1>
      </div>

      {/* 用户信息区域 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white hover:bg-white/10 hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <User className="h-5 w-5" />
            </div>
            <span className="font-medium">
              {currentUser?.displayName || "用户"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{currentUser?.displayName}</p>
              <p className="text-xs text-muted-foreground">
                {currentUser?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            登出
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
