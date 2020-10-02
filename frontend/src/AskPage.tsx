import React from "react";
import { Field } from "./Field";
import { Form, minLength, required, Values } from "./Form";
import { Page } from "./Page";
import { postQuestion } from "./QuestionData";

export const AskPage = () => {
  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date()
    });
    return { success: question ? true : false };
  };

  return (
    <Page title="Ask a question">
      <Form
        submitCaption="Submit Your Question"
        onSubmit={handleSubmit}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
        validationRules={
          {
            title: [
              { validator: required },
              { validator: minLength, args: 10 }
            ],
            content: [
              { validator: required },
              { validator: minLength, args: 50 }
            ]
          }
        }
      >
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  )
}
export default AskPage;
