import {useNavigate} from 'react-router-dom'
import React from 'react'

const Box = ({examName, date, duration}) => {

  const navigate = useNavigate();

  let newDate = '';
  for(let i=0; i<10; i++) newDate+=date[i];

  const deleteExam = async () => {
    if(window.confirm(`are you sure you want to delete ${examName} ?`)) {
        const response = await fetch('https://examcell07.herokuapp.com/deleteExam', {
            method : 'DELETE',
            headers : {'examName' : examName}
        })

        const data = await response.json();

        if(data.status === 'none') {
          <h2>{data.message}</h2>
        }

        if(data.status === 'error') {
          alert(data.message);
        }
    }
  }

  const viewExam = async () => {
    navigate(`/${examName}`)
  }

  return (
    <div className='examBox'>
        <h4>{examName}</h4>
        <h5 className='date'>{newDate}</h5>
        <h5 className='duration'>{duration} minute</h5>
        <div className="button">
          <button value={examName} onClick={viewExam} className='button update'>View</button>
          <button value={examName} onClick={deleteExam} className='button delete'>delete</button>
        </div>
    </div>
  )
}

export default Box