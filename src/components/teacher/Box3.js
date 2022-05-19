import React from 'react'

const Box3 = ({data}) => {
  return (
    <>
      {data.student === 'username' ? 
        <div className='box3 bright'>
            <div>{data.student}</div>
            {(data.total)?<div>{data.total}</div> : <div>0</div> }
            <div>{data.attempted}</div>
            <div>{data.correct}</div>
            <div>{data.score}</div>
        </div> : 
        <div className='box3'>
            <div>{data.student}</div>
            {(data.total)?<div>{data.total}</div> : <div>0</div> }
            <div>{data.attempted}</div>
            <div>{data.correct}</div>
            <div>{data.score}</div>
        </div>
      }
    </>
  )
}

export default Box3