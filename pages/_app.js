import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  console.log(process.env);

  return <Component {...pageProps} />;
}

export default MyApp;
