import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">YouCode Management</h1>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
