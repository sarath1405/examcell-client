import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Snavbar from '../student/Snavbar'
import '../../exam.css'
import '../../studentLogin.css'

const Instructions = () => {
  const [username, setUsername] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const examName = location.pathname;
  let exam = examName.slice(9);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        const authentication = async () => {
            const response = await fetch('https://examcell07.herokuapp.com/student/auth', {
                method : 'GET',
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            })

            const data = await response.json();
            if(data.status === 'error') {
              window.location.href = '/student';
            }
            else {
              setUsername(decodeToken(token).username);
            }
        }
        authentication();
    }
    else window.location.href = '/student';
  },[])

  useEffect(() => {
    const updateHandle = async () => {
      
      const response = await fetch('https://examcell07.herokuapp.com/checkHistory', {
        method : 'GET',
        headers : {
          'studentname': username,
          'examname' : exam
        }
      })

      const data = await response.json();
      if(data.status === 'ok') {
        setShow1(true);
      }
      else if(data.status === 'error') {
        setError(data.message);
        setShow1(false);
      }
    }
  
    updateHandle();
  })

  const handleClick = () => {
    if(window.confirm('are you confirm to Logout?')) {
      localStorage.removeItem('token');
      navigate('/student')
    }
  }

  const handleClick1 = async () => {
    if(window.confirm(`are you confirm to Start the ${exam}?`)) {
      const startTime = new Date();
      let endTime;
      const response1 = await fetch('https://examcell07.herokuapp.com/examDetails', {
        method : 'GET',
        headers : {
          'exam' : exam,
        }
      })

      const data = await response1.json();

      if(data) {
        endTime = new Date(startTime.getTime() + data.data*60000);
      }

      const response = await fetch('https://examcell07.herokuapp.com/addTimer', {
        method : 'POST',
        headers : {'content-Type' : 'application/json'},
        body : JSON.stringify({
          studentName : username,
          exam : exam,
          startTime : startTime,
          endTime : endTime,
        })
      })
      const data1 = await response.json();

      const response2 = await fetch('https://examcell07.herokuapp.com/addhistory', {
        method : 'POST',
        headers : {'content-Type' : 'application/json'},
        body : JSON.stringify({
          studentName : username,
          exam : exam,
        })
      })

      const data2 = await response2.json();
      if(data1.status==='ok' && data2.status==='ok') {
        navigate(`/student/${exam}/startExam`)
      }
    }
  }

  const profileClick = () => {
    navigate('/student/profile');
  }

  return (
        <div className='Scontainer'>
          <div><Snavbar navlinks = {[
            ['Home', `student/home`],
            ['Dashboard', `student/dashboard`],
            ['Logout', '']
          ]} username={username} click={handleClick} profile={profileClick} image='/images/profile.png'/></div>
            <div className="ShomeBox">
                <div className="left1">
                  <h2>Instructions</h2>
                {(error)?<div className="error">
                        *{error}
                    </div>:''}
                  <div className="teacherExam">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus labore ut soluta perspiciatis atque libero sit nesciunt laborum accusamus, consequatur obcaecati eos quis ab veniam nam, similique voluptatibus cupiditate eligendi exercitationem quae nemo! Expedita doloribus omnis, provident est dignissimos dicta, temporibus aperiam harum in voluptate inventore eaque dolore fugiat. Doloremque.
                    </p>
                  </div>
                  <div className="startexam">
                    <span><input className='input1' type="checkbox" onChange={(e) => setShow(!show)}/> <strong>I have read all the instructions</strong></span>
                    {(show && show1)?<button className='button1 str-button' onClick={handleClick1}>Start Exam</button>:<button className='button2 nstr-button'>Start Exam</button>}
                  </div>
                </div>
            </div>
        </div>
  )
}

export default Instructions