import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

const Sregister = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://examcell07.herokuapp.com/student/register', {
            method : 'POST', 
            headers : { 'content-Type' : 'application/json' },
            body : JSON.stringify({
                name,
                username,
                password
            })
        });

        const data = await response.json();
        if(data.status === 'ok') {
            alert('Register successful !!');
            navigate('/student');
        }
        else if(data.status === 'error') {
            setError(data.message);
        }
    }

  return (
    <div className='home'>
        <Navbar active="Student" links={[
            ['Home', ''],
            ['Student', 'student'],
            ['Teacher', 'teacher'],
            ['About', 'about']
        ]}/>
        <div className="container">
            <div className="right">
            <h1>Student Register</h1>
            {(error)?<div className="error">
                *{error}
            </div>:''}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='name' required/> <br />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' required/> <br />
                    <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required/> <br />
                    <button type="submit">Register</button>
                    <span onClick={() => navigate('/student')}> <small><i>login ?</i></small> </span> 
                </form>
            </div>
            <div className="left">
                <img src="/images/vector.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Sregister