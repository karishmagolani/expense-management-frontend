import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const SignUp = (props) => {
  const { handleChangeDisplayType } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = await response.json();
    console.log("DATA", result);
  };
  console.log(errors);
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" {...register("name")} />
          {errors.name &&
            (errors.name.type == "required" ? (
              <span className="red">This field is required</span>
            ) : (
              <span className="red">enter valid name</span>
            ))}
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
            })}
          />
          {errors.email &&
            (errors.email.type == "required" ? (
              <span className="red">This field is required</span>
            ) : (
              <span className="red">enter valid email</span>
            ))}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password &&
            (errors.password.type == "required" ? (
              <span className="red">This field is required</span>
            ) : (
              <span className="red">enter valid password</span>
            ))}
        </Form.Field>
        <Button color="blue">Login</Button>
      </Form>
      <br />

      <div style={{ marginTop: "5px" }}>
        Already registered? click here to{" "}
        <span
          onClick={() => handleChangeDisplayType("LOGIN")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default SignUp;
