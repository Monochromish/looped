// 1. import `NextUIProvider` component
import {createTheme, NextUIProvider} from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Layout from "../components/layout";

const lightTheme = createTheme({
    type: 'light',
})

const darkTheme = createTheme({
    type: 'dark',
})

function MyApp({ Component, pageProps }) {
  return (
      // 2. Use at the root of your app

      <NextThemesProvider
          defaultTheme="system"
          attribute="class"
          value={{
              light: lightTheme.className,
              dark: darkTheme.className
          }}
      >
        <NextUIProvider>
            <Layout>
                <Component />
            </Layout>
        </NextUIProvider>
      </NextThemesProvider>
  );
}

export default MyApp;
