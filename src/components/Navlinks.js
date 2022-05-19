import React from 'react'
import {Link} from 'react-router-dom'

const Navlinks = ({links, active, click, click1}) => {

  return (
    <div className='navlinks1'>
        <ul className='dropdown'>
        {
            links.map((link) => {
              return (link[0]!=='Logout') ? (active === link[0]) ? <Link className='temp1' to={`/${link[1]}`}><li className='active btn'>{link[0]}</li></Link> : 
              (link[0]==='End Exam')? <button className='delete button2' onClick={click1}>{link[0]}</button> : 
              <Link className='temp1' to={`/${link[1]}`}><li className='in-active btn'>{link[0]}</li></Link> : <li onClick={click} className='in-active btn'>{link[0]}</li>
            })
        }
        </ul>
    </div>
  )
}

export default Navlinks