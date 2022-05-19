import React from 'react'

const Box3 = ({data}) => {
  return (
    <>
      {data.exam === 'exam' ? 
        <div className='box3 bright'>
            <div>{data.exam}</div>
            {(data.total)?<div>{data.total}</div> : <div>0</div> }
            <div>{data.attempted}</div>
            <div>{data.correct}</div>
            <div>{data.score}</div>
        </div> : 
        <div className='box3'>
            <div>{data.exam}</div>
            {(data.total)?<div>{data.total}</div> : <div>0</div> }
            <div>{data.attempted}</div>
            <div>{data.correct}</div>
            <div>{data.score}/{data.total*4}</div>
        </div>
      }
    </>
  )
}

export default Box3