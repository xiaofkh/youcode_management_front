import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  variant?: "primary" | "success" | "warning" | "danger" | "info"
  description?: string
  loading?: boolean
}

const variantStyles = {
  primary: {
    border: "border-blue-500",
    icon: "text-blue-500",
    value: "text-blue-600",
  },
  success: {
    border: "border-green-500",
    icon: "text-green-500",
    value: "text-green-600",
  },
  warning: {
    border: "border-yellow-500",
    icon: "text-yellow-500",
    value: "text-yellow-600",
  },
  danger: {
    border: "border-red-500",
    icon: "text-red-500",
    value: "text-red-600",
  },
  info: {
    border: "border-cyan-500",
    icon: "text-cyan-500",
    value: "text-cyan-600",
  },
}

export function StatCard({
  title,
  value,
  icon: Icon,
  variant = "primary",
  description,
  loading = false,
}: StatCardProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        "rounded-xl border-2 bg-white p-6 text-center shadow-sm",
        styles.border
      )}
    >
      {Icon && (
        <Icon className={cn("mx-auto mb-3 h-8 w-8", styles.icon)} />
      )}
      <h4
        className={cn(
          "mb-1 text-2xl font-bold",
          styles.value,
          loading && "animate-pulse"
        )}
      >
        {loading ? "-" : value}
      </h4>
      <p className="text-sm text-gray-600">{title}</p>
      {description && (
        <small className="mt-1 block text-xs text-gray-400">
          {description}
        </small>
      )}
    </div>
  )
}
