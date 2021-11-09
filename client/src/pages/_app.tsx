import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/global.css";
import { AppContextProvider } from "../contexts/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Movies App</title>
        <meta name="description" content="Movie application" />
        <link rel="icon" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
}

export default MyApp;
