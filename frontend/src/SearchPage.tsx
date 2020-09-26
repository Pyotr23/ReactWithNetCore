import { css } from '@emotion/core';
import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
import { QuestionData, searchQuestions } from './QuestionData';
import { QuestionList } from './QuestionList';

export const SearchPage: FC<RouteComponentProps> = ({ location }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
    }
    doSearch(search);
  }, [search]);

  return <Page title="Search Results">
    {search && (
      <p
      css={css`
        font-size: 16px;
        font-style: italic;
        margin-top: 0px;
      `}
      >
        for "{search}"
      </p>
    )}
    <QuestionList data={questions} />
  </Page>;
}
