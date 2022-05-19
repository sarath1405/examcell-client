import React from 'react'
import {Link} from 'react-router-dom'

const Navlinks2 = ({links, active, click}) => {

  return (
    <div className='navlinks2'>
        <ul>
        {
            links.map((link) => {
              return (link[0]!=='Logout') ? (active === link[0]) ? <Link className='temp1' to={`/${link[1]}`}><li className='active btn'>{link[0]}</li></Link> : 
              <Link className='temp1' to={`/${link[1]}`}><li className='in-active btn'>{link[0]}</li></Link> : <li onClick={click} className='in-active btn'>{link[0]}</li>
            })
        }
        </ul>
    </div>
  )
}

export default Navlinks2