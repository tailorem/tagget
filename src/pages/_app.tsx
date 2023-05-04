import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider, appStore } from "@/stores/appStore";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider value={appStore}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
