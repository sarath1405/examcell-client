import React from 'react'
import {useState, useEffect} from 'react'
import Box1 from './Box1'

const ExamQues = ({exam, username}) => {

  let examname = '';
  for(let i=1; i<exam.length; i++) {
      examname += exam[i];
  }
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
      const updatequestions = async () => {
        const response = await fetch('https://examcell07.herokuapp.com/questions', {
            method : 'get',
            headers : {
              'exam' : examname
            }
        })

        const data = await response.json();
        setQuestions(data.data);
      }
      updatequestions();
  })

  return (
    <div className='teacherExam'>
      {questions ? <span>Questions added : {questions.length}</span> : ''}
        { 
            (questions)? 
            questions.map((question) => {
                return <Box1 question={question}/>
            }) : ''
        }
    </div>
  )
}

export default ExamQues