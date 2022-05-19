import React from 'react'
import {useState, useEffect} from 'react'
import Box2 from './Box2'

const Exams = ({username}) => {
  
  const [exams, setExams] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
      const updateExams = async () => {
        const response = await fetch('https://examcell07.herokuapp.com/exams', {
            method : 'get',
            headers : {
              'username' : username
            }
        })

        const data = await response.json();
        setExams(data.exams);
        setShow(false);
      }
      updateExams();
  })

  return (
    <div className='teacherExam'>
        {(show)? <img className='loader' src="/images/loading.gif" alt="loading" /> : (exams === undefined) ? <h3>no exams added !</h3> :
            exams.map((exam) => {
                return <Box2 examName={exam.name} date={exam.date} duration={exam.duration}/>
            })
        }
    </div>
  )
}

export default Exams