import { LanguageProvider } from '@/components/language-provider'
import { Portfolio } from '@/components/portfolio'

export default function Page() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}
