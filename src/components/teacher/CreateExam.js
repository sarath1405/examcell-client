import React from 'react'
import {useState} from 'react'
import '../../studentLogin.css'

const CreateExam = ({username}) => {

    const [name, setName] = useState('');
    const [error, setError] = useState(''); 
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    
    const current = new Date();
    let dateString = '';
    dateString+=current.getFullYear().toString();
    dateString+='-';
    if(current.getMonth()+1 < 10) dateString+='0'+(current.getMonth()+1).toString();
    else dateString+=(current.getMonth()+1).toString();
    dateString+='-';
    if(current.getDate() < 10) dateString+='0'+current.getDate().toString();
    else dateString+=current.getDate().toString();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://examcell07.herokuapp.com/addExam', {
            method : 'POST',
            headers : {'content-Type' : 'application/json'},
            body : JSON.stringify({
                name,
                username,
                date,
                duration
            })
        })
    
        const data = await response.json();
        if(data.status === 'ok') {
            alert('exam added successfully, please refresh!');
        }
        if(data.status === 'error') {
            setError(data.message);
        }
      }

  return (
    <div className='createExam'>
        <h2>Add Exam</h2>
          {(error)?<div className="error">
                *{error}
            </div>:''}
        <form onSubmit={handleSubmit}>
              <input type="text" value={name} placeholder='exam name' onChange = {(e) => setName(e.target.value)} required/> <br />
              <label htmlFor="date">Date :</label>
              <input type="date" min={dateString} value={date} onChange={(e) => setDate(e.target.value)} required/> <br />
              <label htmlFor="duration">Duration :</label>
              <input type="number" value={duration} id="duration" onChange={(e) => setDuration(e.target.value)} required min="1" placeholder='minutes'/>
              <br />
              <button type="submit">Add</button>
          </form>
    </div>
  )
}

export default CreateExam