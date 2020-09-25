import React, { FC, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray3, gray6 } from './Styles';
import { QuestionData } from './QuestionData';

interface RouteParams {
  questionId: string
}

export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({
  match
}) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  return <Page>Question Page {match.params.questionId}</Page>;
}
