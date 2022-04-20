import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import Joi from "joi";
import journalService from "../services/journalsServices";

const EditJournalPage = () => {
  useEffect(() => {
    const location = window.location.href;
    async function getData() {
      if (!location.endsWith("new")) {
        let id = location.split("/");
        id = id[id.length - 1];
        setJournalId(id);
        let journalData = await journalService.getJournalById(id);

        if (!journalData) window.location.href = "/";

        journalData = {
          title: journalData.title,
          subTitle: journalData.subTitle,
          content: journalData.content,
        };
        setJournal(journalData);
        setButtonText("Save");
      }
    }
    getData();
  }, []);
  const [err, setErr] = useState();
  const [buttonText, setButtonText] = useState("Submit");
  const [journalId, setJournalId] = useState(null);
  const [journal, setJournal] = useState({
    title: "",
    subTitle: "",
    content: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const checkError = async () => {
    let { error } = validateJournal(journal);
    if (error) {
      error = error.details[0].message;
      error = error.replaceAll(`"`, "").trim();
      setErr(error.slice(0, 1).toUpperCase() + error.slice(1, error.length));
    } else {
      setErr(null);
      try {
        journalService.addJournal(journal, journalId);
        window.location.href = "/";
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          setErr(ex.response.data);
        } else {
          console.log(ex);
        }
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    checkError();
  };
  function validateJournal(journal) {
    const schema = Joi.object({
      title: Joi.string().required().min(5).max(50).only(),
      subTitle: Joi.string().required().min(5).max(50).only(),
      content: Joi.string().required().min(5),
    });
    return schema.validate(journal);
  }
  return (
    <Container className="px-5">
      <Form>
        {err && (
          <Alert style={{ padding: "0.4rem 1rem" }} variant={"danger"}>
            {err.replaceAll(`"`, "") + "."}
          </Alert>
        )}

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="How would you like to name your day?"
            value={journal.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSubTitle">
          <Form.Label>Sub Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="How would you like to describe your day in oneliner?"
            name="subTitle"
            value={journal.subTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            rows={Math.round(window.screen.availHeight / 70)}
            as="textarea"
            type="text"
            name="content"
            value={journal.content}
            onChange={handleChange}
            placeholder="How would you like to describe your day?"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </Form>
    </Container>
  );
};

export default EditJournalPage;
