import { React, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import Joi from "joi";
import auth from "../services/auth";
const LoginPage = () => {
  const [err, setErr] = useState("");

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { error } = validateUser(userDetails);
    if (error) {
      error = error.details[0].message;
      error = error.replaceAll(`"`, "").trim();
      setErr(error.slice(0, 1).toUpperCase() + error.slice(1, error.length));
    } else {
      setErr(null);
      try {
        await auth.login(userDetails);
        window.location.href = "/";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) setErr(ex.response.data);
      }
    }
  };
  function validateUser(user) {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(50)
        .only(),
      password: Joi.string().required().min(8).max(32),
    });
    return schema.validate(user);
  }
  return (
    <Container
      className="formContainer"
      style={{
        height: "calc(100vh - 120px)",
      }}
    >
      <img
        style={{ width: "50%", maxWidth: "450px" }}
        draggable="false"
        alt=""
        src="/images/register.png"
      />
      <Form style={{ width: "50%", maxWidth: "450px" }}>
        <h3>Login</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={userDetails.email}
            onChange={handleUpdate}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleUpdate}
            required
          />
          {err && (
            <Alert style={{ padding: "0.4rem 1rem" }} variant={"danger"}>
              {err.replaceAll(`"`, "") + "."}
            </Alert>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
