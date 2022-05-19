import React from 'react'
import {useState} from 'react'
import '../../studentLogin.css'

const CreateQues = ({exam}) => {

    let examname = '';
    for(let i=1; i<exam.length; i++) {
        examname += exam[i];
    }

    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correct, setCorrect] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://examcell07.herokuapp.com/addQuestion', {
            method : 'POST',
            headers : {'content-Type' : 'application/json'},
            body : JSON.stringify({
                question,
                option1,
                option2,
                option3,
                option4,
                correct,
                examname
            })
        })
    
        const data = await response.json();
        if(data.status === 'ok') {
            alert('question added successfully!');
            setQuestion('');
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setCorrect('');
        }
        if(data.status === 'error') {
            setError(data.message);
        }
      }

  return (
    <div className='createQues'>
        <h2>Add Question</h2>
          {(error)?<div className="error">
                *{error}
            </div>:''}
        <form onSubmit={handleSubmit} className='form'>
              <textarea type="text" value={question} placeholder='question' onChange = {(e) => setQuestion(e.target.value)} required/> <br />
              <div className="options">
              <textarea type="text" value={option1} placeholder='option1' onChange = {(e) => setOption1(e.target.value)} required/>
              <textarea type="text" value={option2} placeholder='option2' onChange = {(e) => setOption2(e.target.value)} required/>
              <textarea type="text" value={option3} placeholder='option3' onChange = {(e) => setOption3(e.target.value)} required/>
              <textarea type="text" value={option4} placeholder='option4' onChange = {(e) => setOption4(e.target.value)} required/>
              </div>
              <select value={correct} onChange = {(e) => setCorrect(e.target.value)}>
                  <option value="">correct option</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
              </select>
                <br />
              <button className ='button' type="submit">Add</button>
          </form>
    </div>
  )
}

export default CreateQues