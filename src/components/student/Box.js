import {useNavigate} from 'react-router-dom'
import React from 'react'

const Box = ({examName, date, duration}) => {

  const navigate = useNavigate();

  let newDate = '';
  for(let i=0; i<10; i++) newDate+=date[i];

  const viewExam = () => {
    navigate(`/student/${examName}`)
  }

  return (
    <div className='examBox1'>
        <h4>{examName}</h4>
        <h5 className='date'>{newDate}</h5>
        <h5 className='duration'>{duration} minutes</h5>
        <div className="button">
          <button value={examName} onClick={viewExam} className='str-button update'>Start</button>
        </div>
    </div>
  )
}

export default Box