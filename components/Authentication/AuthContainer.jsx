import React, { useState } from "react";
import { Header, Segment } from "semantic-ui-react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthContainer = () => {
  const [diplayType, setdiplayType] = useState("LOGIN"); // "SIGNUP" | "LOGIN"
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        minWidth: "50vw",
        flexDirection: "column",
      }}
    >
      <Header>Welcome to Expense Management</Header>
      <Segment size="big">
        {diplayType == "SIGNUP" ? (
          <SignUp handleChangeDisplayType={setdiplayType} />
        ) : (
          <Login handleChangeDisplayType={setdiplayType} />
        )}
      </Segment>
    </div>
  );
};

export default AuthContainer;
