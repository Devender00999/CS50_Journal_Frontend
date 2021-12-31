import React from "react";
import { Card } from "react-bootstrap";

const Info = () => {
  return (
    <Card
      style={{ borderRadius: "10px", overflow: "hidden", position: "relative" }}
    >
      <Card.Body>
        What do Albert Einstein, Marie Curie, Frida Kahlo, Leonardo da Vinci,
        and Frederick Douglass all have in common? Each of these famous figures
        kept a journal or diary to record their experiences, thoughts, or
        feelings. <br />
        Kahlo and da Vinci even used illustrations to express emotions and
        sketch out ideas. From scientific geniuses to thoughtful artists and
        everyone in between keeping a journal can be a beneficial self-care
        practice. In fact, journaling can help you:
        <div className="features">
          <span className="feature">Achieve goals</span>
          <span className="feature">Find inspiration</span>

          <span className="feature">Track progress and growth</span>
          <span className="feature">Gain self-confidence</span>
          <span className="feature">
            Improve writing and communication skills
          </span>
          <span className="feature">Reduce stress and anxiety</span>
          <span className="feature">Strengthen memory</span>
        </div>
        <a
          target={"_blank"}
          rel="noreferrer"
          style={{ fontSize: "12px", textDecoration: "none" }}
          href="https://wa-health.kaiserpermanente.org/seven-journal-writing-benefits/"
        >
          For more info click here.
        </a>
      </Card.Body>
    </Card>
  );
};
export default Info;
