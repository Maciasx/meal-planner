import { useEffect, useState } from 'react'
import { fetchHello, type HelloResponse } from './api/client'

export default function App() {
  const [data, setData] = useState<HelloResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHello('Domino')
      .then(setData)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  return (
    <main className="container">
      <h1>React + Spring Boot</h1>
      {error && <p className="error">Backend niedostępny: {error}</p>}
      {!error && !data && <p>Ładowanie…</p>}
      {data && (
        <p>
          <strong>{data.message}</strong>
          <br />
          <small>{new Date(data.timestamp).toLocaleString('pl-PL')}</small>
        </p>
      )}
    </main>
  )
}
