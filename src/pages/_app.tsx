import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import AppProvider from "../contexts";
import { store } from "../store";
import { GlobalStyle } from "../styles/globalStyle";
import i18n from "../i18n";
import { makeServer } from "../services/mirage";

if (process.env.NODE_ENV === "development") makeServer();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <GlobalStyle />
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default MyApp;
