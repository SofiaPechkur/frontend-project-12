import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import filter from 'leo-profanity'
import { Provider, ErrorBoundary } from '@rollbar/react'
import resources from './locales/index.js'
import App from './App.jsx'

const init = async () => {
  filter.loadDictionary('en')
  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  }
  const i18n = i18next.createInstance()
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default init
