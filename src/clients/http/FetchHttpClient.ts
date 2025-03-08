import type { HttpOptions } from './HttpClient'
import type HttpClient from './HttpClient'

export default class FetchHttpAdapter implements HttpClient {
  baseUrl: string

  constructor(readonly baseURL: string) {
    if (!baseURL) throw new Error('The baseURL is required')
    this.baseUrl = baseURL
  }

  async get<R>(url: string, options?: HttpOptions): Promise<R> {
    const headers = new Headers()
    if (options?.headers) {
      for (const header of Object.keys(options.headers)) {
        headers.append(header, String(options.headers[header]))
      }
    }

    const _url = new URL(url, this.baseUrl)
    if (options?.queryParams) {
      for (const param of Object.keys(options.queryParams)) {
        if (options.queryParams[param])
          _url.searchParams.append(param, String(options.queryParams[param]))
      }
    }

    const request = new Request(_url, {
      method: 'GET',
      headers,
    })
    const response = await fetch(request)

    return response.json()
  }

  async getJson<R>(url: string, options?: HttpOptions): Promise<R> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    if (options?.headers) {
      for (const header of Object.keys(options.headers)) {
        if (options.headers[header]) headers.append(header, String(options.headers[header]))
      }
    }

    const _url = new URL(url, this.baseUrl)
    if (options?.queryParams) {
      for (const param of Object.keys(options.queryParams)) {
        if (options.queryParams[param])
          _url.searchParams.append(param, String(options.queryParams[param]))
      }
    }

    const request = new Request(_url, {
      method: 'GET',
      headers,
    })
    const response = await fetch(request)

    return response.json()
  }

  async postJson<B, R>(url: string, data?: B, options?: HttpOptions): Promise<R> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    if (options?.headers) {
      for (const header of Object.keys(options.headers)) {
        headers.append(header, String(options.headers[header]))
      }
    }

    const _url = new URL(url, this.baseUrl)
    if (options?.queryParams) {
      for (const param of Object.keys(options.queryParams)) {
        _url.searchParams.append(param, String(options.queryParams[param]))
      }
    }

    const request = new Request(_url, {
      method: 'POST',
      headers,
      ...(data && { body: JSON.stringify(data) }),
    })
    const response = await fetch(request)

    return response.json()
  }

  async patchJson<B, R>(url: string, data?: B, options?: HttpOptions): Promise<R> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    if (options?.headers) {
      for (const header of Object.keys(options.headers)) {
        headers.append(header, String(options.headers[header]))
      }
    }

    const _url = new URL(url, this.baseUrl)
    if (options?.queryParams) {
      for (const param of Object.keys(options.queryParams)) {
        _url.searchParams.append(param, String(options.queryParams[param]))
      }
    }

    const request = new Request(_url, {
      method: 'PATCH',
      headers,
      ...(data && { body: JSON.stringify(data) }),
    })
    const response = await fetch(request)

    return response.json()
  }
}
