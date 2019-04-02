import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SETSTATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get("/quizes.json");

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      console.log(e);
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(
        `/quizes/${quizId}.json`
      );
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    // Подсвечиание ответов
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }
    const question = state.quiz[state.activeQuestions];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      // Если ложных ответов небыло, показать как правильное
      if (!results[question.id -1]) {
        results[question.id -1] = "success";
      }
      dispatch(quizSetState({ [answerId]: "success" }, results))

      // Переход между вопросами
      const timeout = window.setTimeout(() => {
        if (isQiuzFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestions + 1))
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      // Проверка чтобы не перезаписывать постоянно ложные ответы
      if (!results[question.id - 1]) {
        results[question.id-1] = "error";
      }
      dispatch(quizSetState({ [answerId]: "error" }, results))
    }
  }
}

function isQiuzFinished(state) {
  return state.activeQuestions + 1 === state.quiz.length;
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SETSTATE,
    answerState, results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}