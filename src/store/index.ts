// Jotai 全局状态示例
// 按需在此文件或单独文件中定义 atoms

import { atom } from "jotai"

// 示例: 用户状态
export const userAtom = atom<{ id: number; name: string } | null>(null)

// 示例: 侧边栏折叠状态
export const sidebarCollapsedAtom = atom(false)
