import { createI18n } from "vue-i18n"
import en from "@/i18n/en"
import ua from "@/i18n/ua"
import ru from "@/i18n/ru"

let locale = 'en'
const pathnameNames = window.location.pathname.split('/')

if (pathnameNames.length > 1 && ['en', 'ua', 'ru'].includes(pathnameNames[1]))
    locale = pathnameNames[1]

const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {en, ua, ru}
})
export default i18n;
