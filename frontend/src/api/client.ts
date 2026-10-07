// Jedno miejsce na wywołania backendu. Ścieżki są względne (/api/...),
// więc działa to tak samo w dev (proxy Vite) i na produkcji (proxy nginx).

export interface HelloResponse {
  message: string
  timestamp: string
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} (${path})`)
  }
  return (await res.json()) as T
}

export function fetchHello(name: string): Promise<HelloResponse> {
  return getJson<HelloResponse>(`/api/hello?name=${encodeURIComponent(name)}`)
}
