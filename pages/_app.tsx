import '../styles/globals.css'
import 'primereact/resources/themes/fluent-light/theme.css'
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
