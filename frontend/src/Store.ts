import { getUnansweredQuestions, postQuestion, PostQuestionData, QuestionData } from "./QuestionData";
import { Action, Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

interface QuestionState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[] | null;
  readonly postedResult?: QuestionData
}

export interface AppState {
  readonly questions: QuestionState
}

const initialQuestionState: QuestionState = {
  loading: false,
  unanswered: null
}

interface GettingUnansweredQuestionsAction extends Action<'GettingUnansweredQuestions'> { }

export interface GotUnansweredQuestionsAction extends Action<'GotUnansweredQuestions'> {
  questions: QuestionData[]
}

export interface PostedQuestionAction extends Action<'PostedAction'> {
  result: QuestionData | undefined
}

type QuestionsActions =
  | GettingUnansweredQuestionsAction
  | GotUnansweredQuestionsAction
  | PostedQuestionAction

export const getUnansweredQuestionsActionCreator: ActionCreator<
  ThunkAction<
    Promise<void>,
    QuestionData[],
    null,
    GotUnansweredQuestionsAction
  >
> = () => {
  return async (dispatch: Dispatch) => {
    const gettingUnansweredQuestionsAction: GettingUnansweredQuestionsAction = {
      type: 'GettingUnansweredQuestions'
    };
    dispatch(gettingUnansweredQuestionsAction);
    const questions = await getUnansweredQuestions();
    const gotUnansweredQuestionsAction: GotUnansweredQuestionsAction = {
      questions,
      type: 'GotUnansweredQuestions'
    };
    dispatch(gotUnansweredQuestionsAction);
  }
}

export const postQuestionActionCreator: ActionCreator<
  ThunkAction<
    Promise<void>,
    QuestionData,
    PostQuestionData,
    PostedQuestionAction
  >
> = (question: PostQuestionData) => {
  return async (dispatch: Dispatch) => {
  const result = await postQuestion(question);
  const postedQuestionAction: PostedQuestionAction = {
    result,
    type: 'PostedAction'
  };
  dispatch(postedQuestionAction);
  };
};

export const clearPostedQuestionActionCreator: ActionCreator<
  PostedQuestionAction
  > = () => {
  const postedQuestionAction: PostedQuestionAction = {
    type: 'PostedAction',
    result: undefined,
  };
  return postedQuestionAction;
};
