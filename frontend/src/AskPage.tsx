import React, { FC, useEffect } from "react";
import { Field } from "./Field";
import {
  Form,
  minLength,
  required,
  Values,
  SubmitResult
} from "./Form";
import { Page } from "./Page";
import { postQuestion } from "./QuestionData";
import { PostQuestionData, QuestionData } from './QuestionData';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  postQuestionActionCreator,
  AppState,
  clearPostedQuestionActionCreator
} from './Store';
import { AnyAction } from 'redux';

interface Props {
  postQuestion: (question: PostQuestionData) => Promise<void>;
  postedQuestionResult?: QuestionData;
  clearPostedQuestion: () => void;
}

const AskPage: FC<Props> = ({ postQuestion, postedQuestionResult, clearPostedQuestion }) => {
  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]);
  const handleSubmit = (values: Values) => {
    postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date()
    });
  };

  let submitResult: SubmitResult | undefined;
  if (postedQuestionResult) {
    submitResult = { success: postedQuestionResult !== undefined };
  }

  return (
    <Page title="Ask a question">
      <Form
        submitCaption="Submit Your Question"
        onSubmit={handleSubmit}
        submitResult={submitResult}
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

const mapStateToProps = (store: AppState) => {
  return {
    postedQuestionResult: store.questions.postedResult,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AnyAction>,
) => {
  return {
    postQuestion: (question: PostQuestionData) =>
    dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () =>
    dispatch(clearPostedQuestionActionCreator()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AskPage);
