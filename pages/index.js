import { useEffect } from "react";
import AuthContainer from "../components/Authentication/AuthContainer";

export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      window.location.href = "/expenses";
    }
  }, []);
  return <AuthContainer />;
}
