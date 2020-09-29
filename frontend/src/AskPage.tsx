import React from "react";
import { Field } from "./Field";
import { Form } from "./Form";
import { Page } from "./Page";

export const AskPage = () => (
  <Page title="Ask a question">
    <Form submitCaption="Submit Your Question">
      <Field name="title" label="Title" />
      <Field name="content" label="Content" type="TextArea" />
    </Form>
  </Page>
)
export default AskPage;
