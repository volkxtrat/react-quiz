import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total
  }, 0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        { props.quiz.map((quizItem, index) => {
          console.log(props.results[index]);
          const cls = [
            'fa',
            props.results[index] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[index]]
          ]
          return (
            <li
              key={index}
            >
              <strong>{index + 1}.</strong>
              {quizItem.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        }) }
      </ul>
      <p>Праильно {successCount} из {props.quiz.length}</p>

      <div>
        <Button onClick={props.onRetry} type='primary'>Повторить</Button>
        {/* <Link> */}
        <Button onClick={props.onRetry} type='success'>Перейти в список тестов</Button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default FinishedQuiz