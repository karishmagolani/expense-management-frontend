import { useEffect } from "react";
import CategoryContainer from "../components/Categories/CategoryContainer";

export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);
  return <CategoryContainer />;
}
