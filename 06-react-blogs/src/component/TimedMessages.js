import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const INFO = 0;
export const ERROR = 1;

const TimedMessages = ({messages, type=INFO, timeout=10000}) => {
  const [info, setInfo] = useState(messages);
  useEffect(() => {
    setTimeout(() => setInfo(undefined), timeout)
  }, [timeout])
  return (<>{info && <div className={type === ERROR? 'errors' : 'messages'}>{info}</div>}</>)
}

TimedMessages.propTypes = {
    messages: PropTypes.string,
    type: PropTypes.oneOf([INFO, ERROR])
}

export default TimedMessages