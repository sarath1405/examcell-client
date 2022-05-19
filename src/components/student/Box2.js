import React from 'react'

const Box2 = ({examName, date, duration}) => {

  let newDate = '';
  for(let i=0; i<10; i++) newDate+=date[i];

  return (
    <div className='examBox3'>
        <h4>{examName}</h4>
        <h5 className='date'>{newDate}</h5>
        <h5 className='duration'>{duration} minutes</h5>
        <div className="button">
          <button value={examName} className='nstr-button update'>Expired</button>
        </div>
    </div>
  )
}

export default Box2