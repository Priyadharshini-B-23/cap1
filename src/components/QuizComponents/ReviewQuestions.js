
import React , { useState,useEffect } from 'react'
// import { GetAllQuestion } from '../../middleware/QuestionApi'
import { useNavigate } from 'react-router-dom';
import '../../Styles/CreateQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'react-router-dom';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {QuizFeedbackApi} from '../../middleware/QuizFeedbackApi'
import { DeleteQuestion,GetAllQuestion, GetOpenEditQuestionModal, PostSingleQuestion, UpdateQuestion } from '../../middleware/QuestionApi';
// import { fetchQuestionsRequest } from '../../middleware/QuestionApi';
import { fetchQuestionsRequest } from '../../middleware/QuestionApi';
import { createquizfeedbackRequest } from '../../actions/QuizFeedbackAction';
import {  useDispatch } from 'react-redux';




export const ReviewQuestions=({GetAllQuestion}) =>{
    // const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [errorfb, setErrorfb] = useState('');
    const [loading, setLoading] = useState('');
    const [showAddfbModal, setShowAddfbModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        try {
              // await GetAllQuestion();
          navigate('/')
              
          } catch (error) {
              console.error('Error fetching data:', error)
          }
      
  };
    const  [questions, setQuestions]= useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
        correctOptions: ['', '', '']
    });
    const [fbQuestion, setFbQuestion] = useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
  
    });
    const [selectedfbType, setSelectedfbType] = useState('');

    // const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const GetAllQuestion = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5199/api/QuizQuestions/GetAllQuestions'
                );
                setQuestions(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        GetAllQuestion();
    }, []);
  
    const handleFeedback = () => {
        try {
            navigate("/quizfeedback");
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    const handleSaveQuestion = () => {
        let tempfbErrors = { question: '', questionType: '', optionText: '' };

        if (!fbQuestion.question) {
            tempfbErrors.question = 'Question is required';
        }
        if (!fbQuestion.questionType) {
            tempfbErrors.questionType = 'Question type is required';
        }
        if (fbQuestion.options.length === 0 && fbQuestion.questionType =="MCQ") {
            tempfbErrors.optionText = 'At least one option is required';
        }
        
        setErrorfb(tempfbErrors);

        if (tempfbErrors.question || tempfbErrors.questionType || tempfbErrors.optionText ) {
            return;
        }

        const requestBody = {
            quizId: "d609ff3e-5972-4340-97e0-7f46b55e8096",
            question: fbQuestion.question,
            questionType: fbQuestion.questionType,
            options: fbQuestion.options.map((optionText, index) => ({
                optionText: optionText
                // isCorrect: fbQuestion.correctOptions.includes(option) // Check if option is in correctOptions array
            }))
        };
         console.log(requestBody)
         dispatch(createquizfeedbackRequest(requestBody));
        handleCloseAddfbQuestionModal();
    };

    const handleOpenAddfbQuestionModal = () => {  
        setShowAddfbModal(true);
    };

    const handleCloseAddfbQuestionModal = () => {
        setShowAddfbModal(false);
    };
    const handleChange = (index, field, value) => {
        const updatedoptions = [...fbQuestion.options];
    updatedoptions[index] = value;
    setFbQuestion({ ...fbQuestion, options: updatedoptions });
        
        // if (field === 'correctOptions') {
        //     setFbQuestion(prevState => ({
        //         ...prevState,
        //         correctOptions: [...prevState.correctOptions.slice(0, index), value, ...prevState.correctOptions.slice(index + 1)]
        //     }));
        // } else {
            setFbQuestion(prevState => ({
                ...prevState,
                [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
            }));
        // }
    };

    const handlefbQuestionTypeChange = (e) => {
        const value = e.target.value;
        setSelectedfbType(value);
        setFbQuestion(prevState => ({
            ...prevState,
            questionType: value,
            options: [],
        }));
    };


    return (
        <div className='question template container'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {questions && questions.length > 0 && (
            <div>
                <h5>Review Questions</h5>
                {questions.map((question, index) => (
                    <div key={index} className='card mt-3'>
                        <div className='d-flex justify-content-end'>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Question {question.questionNo}:</h5>

                            <input value={question.question} className='form-control' readOnly />
                            <div className="form-group">
                                <label>Options:</label>
                                {question.options.map((option, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="form-control mt-2"
                                        value={option.option}
                                        readOnly
                                    />
                                ))}
                            </div>
                            <div className="form-group">
                                <label>Correct Answers:</label>
                                {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="form-control mt-2"
                                        value={correctOption.option}
                                        readOnly
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                ))}
                        <button onClick={handleSubmit} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white"}}>Go to Edit Page</button>

                        <button onClick={handleOpenAddfbQuestionModal} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white",marginLeft:"74%"}}>Review & Publish</button>
                                               
                         <button onClick={handleFeedback} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white",marginLeft:"74%"}}>Add Feedback</button>

            </div>
        )}

<div>
    <Modal show={showAddfbModal} onHide={handleCloseAddfbQuestionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Question Type:</label>
                        <select className='form-control' value={selectedfbType} onChange={handlefbQuestionTypeChange}>
                            <option value="">Select Question Type</option>
                            <option value="MCQ">MCQ</option>
                            <option value="Descriptive">Descriptive</option>
                        </select>
                        {errorfb.questionType && <div style={{color: "red"}}>{errorfb.questionType}</div>}
                    </div>
                   
                    {selectedfbType === 'MCQ' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={fbQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                                {errorfb.question && <div style={{color: "red"}}>{errorfb.question}</div>}
                            </div>
                            {[...Array(4)].map((_, index) => (
                                <div className="form-group" key={index}>
                                    <label>Option {index + 1}:</label>
                                    <input className='form-control' type="text" value={fbQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
                                    {errorfb.options && <div style={{color: "red"}}>{errorfb.options}</div>}
                                </div>
                            ))}
                        </>
                    )}
                    {selectedfbType === 'Descriptive' && (
                        <>
                            <div className="form-group">
                                <label>Question:</label>
                                <input className='form-control' type="text" value={fbQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
                                {errorfb.question && <div style={{color: "red"}}>{errorfb.question}</div>}
                            </div>
                           </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddfbQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={()=>{handleSaveQuestion()}}>Save</Button>
               
                </Modal.Footer>
            </Modal>

</div>
    </div>
    
    );
};


export default ReviewQuestions




























// <Modal show={showAddfbModal} onHide={handleCloseAddfbQuestionModal}>
// <Modal.Header closeButton>
//     <Modal.Title>Add Feedback Questions</Modal.Title>
// </Modal.Header>
// <Modal.Body>
//     <div className="form-group">
//         <label>Question Type:</label>
//         <select className='form-control' value={selectedfbType} onChange={handlefbQuestionTypeChange}>
//             <option value="">Select Question Type</option>
//             <option value="MCQ">MCQ</option>
//             <option value="Descriptive">Descriptive</option>
//         </select>
//         {errorfb.questionType && <div style={{color: "red"}}>{errorfb.questionType}</div>}
//     </div>
   
//     {selectedfbType === 'MCQ' && (
//         <>
//             <div className="form-group">
//                 <label>Question:</label>
//                 <input className='form-control' type="text" value={fbQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
//                 {errorfb.question && <div style={{color: "red"}}>{errorfb.question}</div>}
//             </div>
//             {[...Array(4)].map((_, index) => (
//                 <div className="form-group" key={index}>
//                     <label>Option {index + 1}:</label>
//                     <input className='form-control' type="text" value={fbQuestion.options[index] || ''} onChange={(e) => handleChange(index, 'options', e.target.value)} />
//                     {errorfb.options && <div style={{color: "red"}}>{errorfb.options}</div>}
//                 </div>
//             ))}
//         </>
//     )}
//     {selectedfbType === 'Descriptive' && (
//         <>
//             <div className="form-group">
//                 <label>Question:</label>
//                 <input className='form-control' type="text" value={fbQuestion.question} onChange={(e) => handleChange(-1, 'question', e.target.value)} />
//                 {errorfb.question && <div style={{color: "red"}}>{errorfb.question}</div>}
//             </div>
//            </>
//     )}
// </Modal.Body>
// <Modal.Footer>
//     <Button variant="secondary" onClick={handleCloseAddfbQuestionModal}>Close</Button>
//     <Button variant="primary" onClick={()=>{handleSaveQuestion()}}>Save</Button>

// </Modal.Footer>
// </Modal>














//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState('');
//     const [questions, setQuestions] = useState([]);

//     const navigate = useNavigate();
 

//     const [newQuestion, setNewQuestion] = useState({
//         question: '',
//         questionType: '',
//         options: ['', '', '', '', '', '', '', ''],
//         correctOptions: ['', '', '']
//     });
//     const GetAllQuestion = async () => {
//         try {
//              await GetAllQuestion(); 
//         } catch (error) {
//             console.error('Error fetching data:', error)
//         }
//     }

//   return (
//     <div>
//          <div className='question publish'>
//                 {loading && <p>Loading...</p>}
//                 {error && <p>Error: {error}</p>}
//                 {questions && questions.length > 0 && (
//                     <div>
//                         <h5>Review Questions</h5>
//                         {questions.map((question, index) => (
//                             <div key={index} className='card mt-3'>
//                                 <div className="card-body">
//                                     <h5 className="card-title">Question {question.questionNo}:</h5>

//                                     <input value={question.question} className='form-control' readOnly />
//                                     <div className="form-group">
//                                         <label>Options:</label>
//                                         {question.options.map((option, index) => (
//                                             <input
//                                                 key={index}
//                                                 type="text"
//                                                 className="form-control mt-2"
//                                                 value={option.option}
//                                                 readOnly
//                                             />
//                                         ))}
//                                     </div>
//                                     <div className="form-group">
//                                         <label>Correct Answers:</label>
//                                         {question.options.filter(option => option.isCorrect).map((correctOption, index) => (
//                                             <input
//                                                 key={index}
//                                                 type="text"
//                                                 className="form-control mt-2"
//                                                 value={correctOption.option}
//                                                 readOnly
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>

//                             </div>

//                         ))}
//                                 <button onClick={GetAllQuestion} className="btn btn-light mt-3 mb-5 float-right" style={{backgroundColor:"#365486", color:"white"}}>Save</button>

//                     </div>
//                 )}

//             </div>
//     </div>
//   )
// }