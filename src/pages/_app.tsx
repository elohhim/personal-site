import "normalize.css";
import { AppProps } from "next/app";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import useUnloadHypothesis from "../lib/unloadHypothesis";

export default function App({ Component, pageProps }: AppProps) {
  useUnloadHypothesis();
  return <Component {...pageProps} />;
}
