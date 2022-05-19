import {useNavigate} from 'react-router-dom'
import React from 'react'

const Box2 = ({examName, date, duration}) => {

  const navigate = useNavigate();

  let newDate = '';
  for(let i=0; i<10; i++) newDate+=date[i];

  const viewReport = async () => {
    navigate(`/report/${examName}`)
  }

  return (
    <div className='examBox'>
        <h4>{examName}</h4>
        <h5 className='date'>{newDate}</h5>
        <h5 className='duration'>{duration} minutes</h5>
        <div className="button">
          <button value={examName} onClick={viewReport} className='button update'>Report</button>
        </div>
    </div>
  )
}

export default Box2