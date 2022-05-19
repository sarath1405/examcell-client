import React from 'react'
const Box1 = ({question}) => {

  const correct = question.correct;

  const deleteQues = async () => {
    const ques = question.question;
    console.log(ques);
    if(window.confirm('are you sure you want to delete question ?')) {
        const response = await fetch('https://examcell07.herokuapp.com/deleteQuestion', {
        method : 'DELETE',
        headers : {'question' : ques},
      })

      const data = await response.json();
      if(data.status === 'error') {
        alert(data.message);
      }
    }
  }

  return (
    <div className='box1'>
      <div className="question">{question.question}</div>
      {(correct===1)? <div className='correct option'>
          {question.option1}
      </div> : <div className="option">{question.option1}</div>}
      {(correct===2)? <div className='correct option'>
          {question.option2}
      </div> : <div className="option">{question.option2}</div>}
      {(correct===3)? <div className='correct option'>
          {question.option3}
      </div> : <div className="option">{question.option3}</div>}
      {(correct===4)? <div className='correct option'>
          {question.option4}
      </div> : <div className="option">{question.option4}</div>}
      <div className="answer">
        <button onClick={deleteQues} className='delete'>delete</button>
      </div>
    </div>
  )
}

export default Box1