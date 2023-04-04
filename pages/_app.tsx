import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useTheme } from 'roku-ui'
import 'roku-ui/style.css'

export default function App ({ Component, pageProps }: AppProps) {
  useTheme()
  return <Component {...pageProps} />
}
