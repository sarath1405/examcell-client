import React from 'react'

const Timer = ({hours, minutes, seconds}) => {
  return (
    <div className='timer'>
        <h1><span>{hours<10 ? '0'+hours : hours}</span> : <span>{minutes<10 ? '0'+minutes : minutes}</span> : <span>{seconds<10 ? '0'+seconds : seconds}</span></h1>
    </div>
  )
}

export default Timer