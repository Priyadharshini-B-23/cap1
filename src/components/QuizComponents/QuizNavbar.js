
import React from 'react'
import { useState } from 'react';
import "../../Styles/QuizNavbar.css"

// Import your questions from questions.js
import { ReviewQuestions } from "./ReviewQuestions";

const QuizNavbar=()=> {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // const  [questions]= useState({
    //     question: '',
    //     questionType: '',
    //     options: ['', '', '', '', '', '', '', ''],
    //     correctOptions: ['', '', '']
    // });
    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
    };
    // const handleQuestionClick = (index) => {
    //     setCurrentQuestion(index);
    //   };
      const questions = [
        { id: 1, question: 'What is France?' },
        { id: 2, question: 'What is Apple?' },
        { id: 3, question: 'What is Spain?' },
        { id: 4, question: 'What is  India?' },
        { id: 5, question: 'What is the css?' },
        { id: 6, question: 'What is html?' },
        { id: 7, question: 'What is js?' },
        { id: 8, question: 'What is react?' },
        { id: 9, question: 'What is dotnet?' },
        { id: 10, question: 'What is web api?' },
      ];
      
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      
        const handleNext = () => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }
        };
      
        const handlePrevious = () => {
          if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }
        };
      
        const handleQuestionClick = (index) => {
          setCurrentQuestionIndex(index);
        };
      
    
  return (
    <div>
 <div className="App" >
            <h1>Quiz Navbar</h1>
    <div>
      <div className='question'>   
        <h2 className='ques'>{questions[currentQuestionIndex].question}</h2>
      </div>
      <div>
        {/* {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(index)}
            style={{ fontWeight: currentQuestionIndex === index ? 'bold' : 'normal' }}
          >
            {index + 1}
          </button>
        ))} */}
        <div>
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {questions.slice(0, 3).map((_, index) => (
      <button
        key={index}
        className='btn'
        onClick={() => handleQuestionClick(index)}
        style={{ fontWeight: currentQuestionIndex === index ? 'bold' : 'normal',marginLeft:"2%" ,marginTop:"2%"}}
      >
        {index + 1}
      </button>
    ))}
  </div>
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {questions.slice(3, 6).map((_, index) => (
      <button
        key={index + 3}
        className='btn'
        onClick={() => handleQuestionClick(index + 3)}
        style={{ fontWeight: currentQuestionIndex === index + 3 ? 'bold' : 'normal' ,marginLeft:"2%" ,marginTop:"2%" }}
      >
        {index + 4}
      </button>
    ))}
  </div>
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {questions.slice(6, 9).map((_, index) => (
      <button
        key={index + 6}
        className='btn'
        onClick={() => handleQuestionClick(index + 6)}
        style={{ fontWeight: currentQuestionIndex === index + 6 ? 'bold' : 'normal' ,marginLeft:"2%" ,marginTop:"2%" }}
      >
        {index + 7}
      </button>
    ))}
  </div>
</div>

      </div>
    </div>
        </div>

    </div>
  )
}

export default QuizNavbar








// {currentQuestion < questions.length ? (
//     <div>
//         <h2>Question {currentQuestion + 1}:</h2>
//         <p>{questions[currentQuestion].questionText}</p>
//         <div className="answer-options">
//             {questions[currentQuestion].answerOptions.map((option, index) => (
//                 <button key={index}>{option}</button>
//             ))}
//         </div>
//         <button onClick={handleNextQuestion}>Next</button>
//     </div>
// ) : (
//     <p>Quiz completed! 🎉</p>
// )}

{/* <div>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </button>
      </div> */}