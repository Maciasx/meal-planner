import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchHello } from './api/client'

describe('fetchHello', () => {
  afterEach(() => vi.restoreAllMocks())

  it('calls the backend with an encoded name', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Cześć, Ala Kot!', timestamp: '2026-01-01T00:00:00Z' }), {
        status: 200,
      }),
    )

    const res = await fetchHello('Ala Kot')

    expect(fetchMock).toHaveBeenCalledWith('/api/hello?name=Ala%20Kot', expect.anything())
    expect(res.message).toBe('Cześć, Ala Kot!')
  })

  it('throws on non-2xx', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }))
    await expect(fetchHello('x')).rejects.toThrow('500')
  })
})
