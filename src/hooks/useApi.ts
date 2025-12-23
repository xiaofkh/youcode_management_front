import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query"
import { api } from "@/lib/api"

// GET 请求 Hook
export function useGet<T>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => api.get(url),
    ...options,
  })
}

// POST 请求 Hook
export function usePost<T, V>(
  url: string,
  options?: UseMutationOptions<T, Error, V>
) {
  return useMutation<T, Error, V>({
    mutationFn: (data) => api.post(url, data),
    ...options,
  })
}

// PUT 请求 Hook
export function usePut<T, V>(
  url: string,
  options?: UseMutationOptions<T, Error, V>
) {
  return useMutation<T, Error, V>({
    mutationFn: (data) => api.put(url, data),
    ...options,
  })
}

// DELETE 请求 Hook
export function useDelete<T>(
  url: string,
  options?: UseMutationOptions<T, Error, void>
) {
  return useMutation<T, Error, void>({
    mutationFn: () => api.delete(url),
    ...options,
  })
}
