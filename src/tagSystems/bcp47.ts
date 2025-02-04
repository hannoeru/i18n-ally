// @ts-ignore
import bcp47 from 'bcp-47'
import { Config } from '../core'
import { BaseTagSystem } from './base'

// https://tools.ietf.org/html/bcp47
export class BCP47 extends BaseTagSystem {
  normalize(locale?: string, fallback = 'en', strict = false) {
    if (!locale)
      return fallback

    return bcp47.stringify(bcp47.parse(locale, { normalize: strict, forgiving: !strict })) || fallback
  }

  toBCP47(locale: string) {
    return bcp47.stringify(bcp47.parse(locale, { normalize: true, forgiving: false })) || undefined
  }

  toFlagname(locale: string) {
    const { region, language } = bcp47.parse(locale, { normalize: true, forgiving: true })
    return (region || Config.localeCountryMap[language] || '').toLowerCase()
  }

  lookup(locale: string) {
    locale = this.normalize(locale)
    // @ts-ignore
    const canonical = Intl.getCanonicalLocales(locale)[0]
    return Intl.Collator.supportedLocalesOf(canonical, { localeMatcher: 'lookup' })[0]
  }
}
