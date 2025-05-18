import App from "./App.jsx";
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import resources from './locales/index.js';

const init = async () => {
    filter.loadDictionary('en');
    const i18n = i18next.createInstance();
        await i18n
            .use(initReactI18next)
            .init({
            resources,
            lng: 'ru',
            fallbackLng: 'ru',
            interpolation: {
                escapeValue: false,
            },
        });
    return (
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    );
}

export default init;