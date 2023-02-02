import { UiProvider } from '@/context';
import '@/styles/globals.css'
import { lightTheme } from '@/themes';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';

 function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <UiProvider>
        <ThemeProvider theme={ lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
      
    </SWRConfig>
  )
}

export default MyApp;