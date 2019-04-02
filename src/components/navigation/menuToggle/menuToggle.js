import React from 'react';
import classes from './menuToggle.module.css';

const menuToggle = props => {
  const cls = [
    classes.menuToggle,
    'fa'
  ]
  if (props.isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }

  return (
    <i
      onClick={props.onToggle}
      className={cls.join(' ')}
    />
  )
}

export default menuToggle