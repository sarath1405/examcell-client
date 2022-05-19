import React from 'react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Slogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
                if(data.status === 'ok') {
                  window.location.href = '/student/home';
                } 
            }
            authentication();
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://examcell07.herokuapp.com/student/login', {
            method : 'POST',
            headers : {
                'content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username,
                password
            }),
        });
        
        const data = await response.json();
        if(data.status === 'ok') {
            localStorage.setItem('token', data.student);
            window.location.href = '/student/home';
        }
        else if(data.status === 'error') {
            setError(data.message)
        }
    }

  return (
    <div>
        {(error)?<div className="error">
            *{error}
        </div>:''}
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' required/> <br />
            <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required/> <br />
            <button type="submit">Login</button>
            <span onClick={() => navigate('/student/register')}> <small><i>register ?</i></small> </span> 
        </form>
    </div>
  )
}

export default Slogin