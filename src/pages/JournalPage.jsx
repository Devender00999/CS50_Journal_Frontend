import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import journalService from "../services/journalsServices";
const JournalPage = () => {
  const [journal, setJournal] = useState({
    title: "",
    subTitle: "",
    content: "",
  });

  useEffect(() => {
    async function getData() {
      const location = window.location.href;

      if (!location.endsWith("new")) {
        let id = location.split("/");
        id = id[id.length - 1];
        const journalData = await journalService.getJournalById(id);
        if (!journalData) window.location.href = "/";
        setJournal(journalData);
      }
    }

    getData();
  }, []);
  const handleDelete = async (e, id) => {
    await journalService.deleteJournal(id);
    window.location.href = "/";
  };
  return (
    <Container className="px-5">
      <div className="mb-3 d-flex justify-content-between">
        <h3>{journal.title}</h3>

        <div className="d-flex ">
          <Link
            to={"/journals/" + journal._id}
            className="me-3 btn btn-primary alignCenter"
            variant="primary"
            style={{ textDecoration: "none " }}
            type="submit"
          >
            Edit
          </Link>

          <Button
            className="ml-2"
            variant="danger"
            type="submit"
            onClick={(e) => handleDelete(e, journal._id)}
          >
            Delete
          </Button>
        </div>
      </div>

      <Form.Group className="mb-3">
        <h4>{journal.subTitle}</h4>
      </Form.Group>

      <Form.Group className="mb-3">
        <div
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: journal.content }}
        ></div>
      </Form.Group>
    </Container>
  );
};

export default JournalPage;
