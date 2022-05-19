import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Snavbar2 from '../student/Snavbar2'
import Timer from './Timer.js'
import '../../studentLogin.css'

const StartExam = () => {
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState([]);
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [ind, setInd] = useState(0);  
  const [n, setN] = useState();
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState([]);
  const location = useLocation();
  const examName = location.pathname
  let exam = '';
  for(let i=9; examName[i]!=='/'; i++) exam+=examName[i];
  
  // setAnswers(new Array(n).fill(0));

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
  });

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch('https://examcell07.herokuapp.com/questions', {
        method : 'GET',
        headers : {'exam' : exam},
      })
      const data = await response.json();
      if(data.status === 'ok') {
          setQuestions(data.data);
          setN(data.data.length); 
      }
      else if(data.status === 'error') {
        setError(data.message);
      }
    }

    const getEndTime = async () => {
      const response = await fetch('https://examcell07.herokuapp.com/endTime', {
        method : 'GET',
        headers : {
          'exam' : exam,
          'studentname' : username,
        }
      })

      const data = await response.json();
      if(data.status === 'ok') {
        setEndTime(data.data)
      }
    }
    const getCorrect = async () => {
      const response = await fetch('https://examcell07.herokuapp.com/correct', {
        method : 'GET',
        headers : {'exam' : exam}
      })
      const data1 =await response.json();
      if(data1.status === 'ok') setCorrect(data1.data);
      else setError(data1.message);
    }
    getCorrect();
    getEndTime();
    getQuestions();
  })

  useEffect(() => {
    const updateTimer = () => {
      const date1 = new Date();
      const date2 = new Date(endTime);
      const h1 = date1.getHours(), h2 = date2.getHours();
      const m1 = date1.getMinutes(), m2 = date2.getMinutes();
      const s1 = date1.getSeconds(), s2 = date2.getSeconds();
      let hr = (h2-h1-1);
      let mnts = m2+(60-m1);
      if(mnts >= 60) {
        hr++;
        mnts = mnts-60;
      }
      let sec = s2+(60-s1);
      if(sec >= 60) {
        mnts++;
        if(mnts >= 60) {
          hr++;
          mnts = (60-mnts);
        }
        sec = sec-60;
      }

      if(mnts > 0) mnts--;

      if(hr >= 0) setHours(hr);
      if(mnts >= 0)setMinutes(mnts);
      if(mnts >= 0)setSeconds(sec);
    }
    setTimeout(() => {
      updateTimer();
    }, 1000);
  })

  useEffect(() => {
    const endExam1 = () => {
      if(hours===0 && minutes===0 && seconds===0) {
        alert('Time is up, click ok to continue!')
        getResults();
      }
    }
    endExam1();
  })

  const handleClick = () => {
    if(window.confirm('Exam will be submitted, sure to Logout?')) {
      getResults();
      localStorage.removeItem('token');
      navigate('/student')
    }
  }

  const incrementClick = (e) => {
    e.preventDefault();
    (ind < n-1)? setInd(ind+1) : setInd(ind)
    if(answers.length === ind) {
      answers.push('0');
      setAnswers(answers);
    }
  }

  const decrementClick = (e) => {
    e.preventDefault();
    (ind > 0)? setInd(ind-1) : setInd(ind)
  }

  const noClick = (e) => {
    e.preventDefault();
  }

  const getResults = async () => {
    let attempted = 0, score = 0, cor = 0;
    for(let i=0; i<correct.length; i++) {
      if(answers[i]!=='0') {
        attempted++;
        if(answers[i]-'0' === correct[i]) {
          score += 4;
          cor++;
        }
        else{
          score--;
        }
      }
    }
    
    const response2 = await fetch('https://examcell07.herokuapp.com/updateResult', {
      method : 'POST',
      headers : {'content-Type' : 'application/json'},
      body : JSON.stringify({
        exam : exam,
        student : username,
        total : n,
        attempted : attempted,
        score : score,
        cor : cor,
      }) 
    })

    const data2 = await response2.json();
    if(data2.status === 'ok') {
      alert('exam submitted successfully');
      navigate('/student/home')
    }
  }

  const endExam = async () => {
    if(window.confirm('are you sure you want to end Exam ?')) {
        getResults();
    }
}

  const handleOption = (e) => {
    e.preventDefault()
    answers[ind] = e.target.value;
    setAnswers(answers);
  }

  return (
    <div className='Scontainer'>
      <div><Snavbar2 className='navbar1' active="Home" navlinks = {[
          ['Logout', ''],
          ['End Exam', '']
        ]} username={username} click={handleClick} click1={endExam} hours={hours} minutes={minutes} seconds={seconds} image='/images/profile.png'/></div>
        <div className="ShomeBox1">
          <div className="examboard">
            {
              (error)?<div className="error">
                  *{error}
              </div>:
              questions[ind]? 
                <form className="quesBox">
                  <div><h2>Question {ind+1}</h2></div>
                  <div className="quesName"><h4>Q. {questions[ind].question}</h4></div>
                  <div className="options">
                    {(answers[ind]==='1')? 
                        <button className="option selected" value='1' onClick={handleOption}>
                          {questions[ind].option1}
                        </button> :
                        <button className="option" value='1' onClick={handleOption}>
                          {questions[ind].option1}
                        </button>
                    }
                    {(answers[ind]==='2')? 
                        <button className="option selected" value='2' onClick={handleOption}>
                          {questions[ind].option2}
                        </button> :
                        <button className="option" value='2' onClick={handleOption}>
                          {questions[ind].option2}
                        </button>
                    }
                    {(answers[ind]==='3')? 
                        <button className="option selected" value='3' onClick={handleOption}>
                          {questions[ind].option3}
                        </button> :
                        <button className="option" value='3' onClick={handleOption}>
                          {questions[ind].option3}
                        </button>
                    }
                    {(answers[ind]==='4')? 
                        <button className="option selected" value='4' onClick={handleOption}>
                          {questions[ind].option4}
                        </button> :
                        <button className="option" value='4' onClick={handleOption}>
                          {questions[ind].option4}
                        </button>
                    }
                  </div>
                </form> : <img className='image1' src="/images/loading.gif" alt="loading" />
            }
          </div>
          <div className="buttons">
              {(ind > 0) ? <button onClick={decrementClick} className='butt'>previous</button> : <button className='noClick' onClick={noClick}>previous</button> }
              {(ind < n-1) ? <button onClick={incrementClick} className='butt'>next</button> : <button className='noClick' onClick={noClick}>next</button> }
            </div>
        </div>
    </div>
  )
}

export default StartExam