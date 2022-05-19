import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Snavbar from './Snavbar'
import Box3 from './Box3'
import '../../studentLogin.css'

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [list, setList] = useState('');
  const [error, setError] = useState('');

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
      const dashboard =async () => {
        const response = await fetch('https://examcell07.herokuapp.com/dashboard', {
            method : 'GET',
            headers : {
                'student' : username,
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
      navigate('/student')
    }
  }

  return (
    <div className='Scontainer'>
      <div><Snavbar active="Dashboard" navlinks = {[
          ['Home', 'student/home'],
          ['Dashboard', 'student/dashboard'],
          ['Logout', '']
        ]} username={username} click={handleClick} image='/images/profile.png'/></div>
        <div className="ShomeBox">
            <div className="examboard">
                {(error)?<div className="error">
                            *{error}
                        </div>:''}
                <Box3 data={{
                    exam : 'exam',
                    total : 'total',
                    attempted : 'attempted',
                    correct : 'correct',
                    score : 'score'
                }}/>
                {list.length!==0 ? 
                    list.map((temp) => {
                        return <Box3 data={temp}/>
                    }) : <h2>No exams submitted!</h2>
                }
            </div>
        </div>
    </div>
  )
}

export default Dashboard