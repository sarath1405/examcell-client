import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Snavbar from '../student/Snavbar'
import Box3 from '../teacher/Box3'
import '../../studentLogin.css'

const Report = () => {
  const [username, setUsername] = useState('');
  const [list, setList] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const examName = location.pathname;
  let exam = examName.slice(8);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        const authentication = async () => {
            const response = await fetch('https://examcell07.herokuapp.com/teacher/auth', {
                method : 'GET',
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            })

            const data = await response.json();
            if(data.status === 'error') {
              window.location.href = '/teacher';
            }
            else {
              setUsername(decodeToken(token).username);
            }
        }
        authentication();
    }
    else window.location.href = '/teacher';
  },[])

  useEffect(() => {
      const dashboard =async () => {
        const response = await fetch('https://examcell07.herokuapp.com/report', {
            method : 'GET',
            headers : {
                'exam' : exam,
            },
        })
        const data = await response.json();
        if(data.status === 'ok') {
            setList(data.data);
        }
        else {
            setError(data.message);
        }
      } 
      dashboard();
  })

  const handleClick = () => {
    if(window.confirm('are you confirm to Logout?')) {
      localStorage.removeItem('token');
      navigate('/teacher')
    }
  }

  return (
    <div className='Scontainer'>
      <div><Snavbar active="Report" navlinks = {[
          ['Home', 'teacher/home'],
          ['Report', 'teacher/Treport'],
          ['Logout', '']
        ]} username={username} click={handleClick} image='/images/profile1.png'/></div>
        <div className="ShomeBox">
            <div className="examboard">
                {(error)?<div className="error">
                            *{error}
                        </div>:''}
                <Box3 data={{
                    student : 'username',
                    total : 'total',
                    attempted : 'attempted',
                    correct : 'correct',
                    score : 'score'
                }}/>
                {list.length!==0 ? 
                    list.map((temp) => {
                        return <Box3 data={temp}/>
                    }) : <h2>No student submitted!</h2>
                }
            </div>
        </div>
    </div>
  )
}

export default Report