import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  console.log(process.env);

  return (
    <div>
      <div>
        <Toaster position="bottom-center" />
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
