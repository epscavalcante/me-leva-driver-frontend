export default class Config {
  static get appName() {
    return import.meta.env.VITE_APP_NAME || 'Me Leva - Passageiro'
  }

  static get apiUrl() {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  }
}
