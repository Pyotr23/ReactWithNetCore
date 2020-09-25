import React from 'react';
import { Header } from './Header';
import { HomePage } from './HomePage';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { AskPage } from './AskPage';
import { SignInPage } from './SignInPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div
        css={css `
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/ask" component={AskPage} />
        <Route path="/signin" component={SignInPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
