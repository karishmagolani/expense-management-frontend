import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const { handleChangeDisplayType } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const input = {
      email: data.email,
      password: data.password,
    };

    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = await response.json();
    if (result.token) {
      window.localStorage.setItem("token", result.token);
      window.location.href = "/expenses";
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
            })}
          />
          {errors.email &&
            (errors.email.type == "required" ? (
              <span className="error">This field is required</span>
            ) : (
              <span className="error">enter valid email</span>
            ))}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password &&
            (errors.password.type == "required" ? (
              <span className="error">This field is required</span>
            ) : (
              <span className="error">enter valid password</span>
            ))}
        </Form.Field>
        <Button color="blue">Login</Button>
      </Form>
      <br />
      <div style={{ marginTop: "5px" }}>
        Not registered? click here to{" "}
        <span
          onClick={() => handleChangeDisplayType("SIGNUP")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          register
        </span>
      </div>
    </div>
  );
};

export default Login;
