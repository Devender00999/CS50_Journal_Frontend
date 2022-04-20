import { React, useState } from "react";
import Joi from "joi";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { register } from "../services/usersService";
import auth from "../services/auth";
const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
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
        const { data: token } = await register(userDetails);
        auth.loginWithToken(token);
        window.location.href = "/";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          setErr(ex.response.data);
        }
      }
    }
  };

  function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(50),
      email: Joi.string().required().min(5).max(50).only(),
      password: Joi.string().required().min(8).max(32),
    });
    return schema.validate(user);
  }
  return (
    <Container className="formContainer">
      <img
        style={{ width: "50%", maxWidth: "450px" }}
        draggable="false"
        src="/images/register.png"
        alt=""
      />
      <Form style={{ width: "50%", maxWidth: "450px" }}>
        <h3>Register</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={userDetails.name}
            type="text"
            onChange={handleUpdate}
            name="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userDetails.email}
            type="email"
            onChange={handleUpdate}
            name="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userDetails.password}
            type="password"
            onChange={handleUpdate}
            name="password"
            placeholder="Password"
          />
          {err && (
            <Alert style={{ padding: "0.4rem 1rem" }} variant={"danger"}>
              {err}
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
export default RegisterPage;
