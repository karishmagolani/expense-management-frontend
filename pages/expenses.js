import { useEffect } from "react";
import AuthContainer from "../components/Authentication/AuthContainer";
import ExpenseContainer from "../components/Expenses/ExpenseContainer";

export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);
  return <ExpenseContainer />;
}
