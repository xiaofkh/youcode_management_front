import { atom } from "jotai"

// 用户角色类型
export type UserRole = "unauthorized" | "user" | "admin" | "super_admin"

// 用户信息类型
export interface User {
  id: string
  email: string
  displayName: string
  role: UserRole
}

// 当前登录用户状态
export const currentUserAtom = atom<User | null>(null)

// 模拟用户数据（后续替换为实际登录数据）
export const mockUser: User = {
  id: "1",
  email: "zhangsan@company.com",
  displayName: "张三",
  role: "admin",
}
