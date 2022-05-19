import React from 'react'
import {useState, useEffect} from 'react'
import Box from '../student/Box'
import Box1 from '../student/Box1'
import Box2 from '../student/Box2'

const Exams = ({username}) => {
  
  const [exams, setExams] = useState([]);
  const [exams1, setExams1] = useState([]);
  const [exams2, setExams2] = useState([]);
  const [show, setShow] = useState(true);

  const date = new Date();

  let dateString = '';
  dateString+=date.getFullYear().toString();
  dateString+='-';
  if(date.getMonth()+1 < 10) dateString+='0'+(date.getMonth()+1).toString();
  else dateString+=(date.getMonth()+1).toString();
  dateString+='-';
  if(date.getDate() < 10) dateString+='0'+date.getDate().toString();
  else dateString+=date.getDate().toString();

  useEffect(() => {
      const updateExams = async () => {
        const response = await fetch('https://examcell07.herokuapp.com/student/exams', {
            method : 'get',
            headers : {
                'examdate' : dateString,
                'studentname' : username,
            }
        })

        const response1 = await fetch('https://examcell07.herokuapp.com/student/exams1', {
            method : 'get',
            headers : {'examdate' : dateString}
        }) 

        const response2 = await fetch('https://examcell07.herokuapp.com/student/exams2', {
            method : 'get',
            headers : {'examdate' : dateString}
        })

        const data = await response.json();
        const data1 = await response1.json();
        const data2 = await response2.json();
        setExams(data.exams);
        setExams1(data1.exams);
        setExams2(data2.exams);
        setShow(false);
      }
      updateExams();
  })

  return (
    <div className='teacherExam'>
        {(show)? <img className='loader' src="/images/loading.gif" alt="loading" /> : (exams.length === 0) ? <h3>no active exams found, please check again later!</h3> :
            exams.map((exam) => {
                return <Box examName={exam.name} date={exam.date} duration={exam.duration} username={username}/>
            })
        }
        {exams1.map((exam) => {
            return <Box1 examName={exam.name} date={exam.date} duration={exam.duration}/>
        })}
        {exams2.map((exam) => {
            return <Box2 examName={exam.name} date={exam.date} duration={exam.duration}/>
        })}
    </div>
  )
}

export default Exams