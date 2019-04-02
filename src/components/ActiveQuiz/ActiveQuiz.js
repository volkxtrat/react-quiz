import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Questions}>
      <span className="hello">
        <strong>{props.answerNumber}.</strong>
        {props.question}
      </span>
      <small>{props.answerNumber} из {props.quizLength}</small>
    </p>
    <AnswerList 
      state={props.state}
      answers={props.answers} 
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;
