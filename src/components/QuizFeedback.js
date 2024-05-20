
import React, { useState,useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';
// import { DeleteQuestion, GetAllQuestion, GetOpenEditQuestionModal, PostSingleQuestion, UpdateQuestion } from '../../middleware/QuestionApi';
import {  useDispatch } from 'react-redux';
import axios from 'axios';
import { createquizfeedbackRequest } from '../actions/QuizFeedbackAction';


export const QuizFeedback = () => {

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
    const [fbQuestion, setFbQuestion] = useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
  
    });
    const [selectedfbType, setSelectedfbType] = useState('');
  
    const handleFeedback = () => {
        try {
            // navigate("/");
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
        
            setFbQuestion(prevState => ({
                ...prevState,
                [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
            }));
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
        <div>
            <AdminNavbar />
            <div>
            <form className=' main-content'>
                <div className="card" id="QuizCard">
                    <div className="card-body">
                        <div className="d-flex mt-2">
                            <div className="container">
                                {/* <a onClick={handleOpenQuizEditModal}><BiSolidPencil style={{ fontSize: "25", marginLeft: "90%" }} /></a> */}
                                <Button class="btn btn-light" style={{marginLeft:"80%" , marginTop:"-3%" , backgroundColor:"#365486", color:"white"}} ><AiFillEdit/> Edit</Button>
                                <Button class="btn btn-light" style={{marginLeft:"89%" , marginTop:"-8.5%", backgroundColor:"#365486", color:"white"}} ><FaTrashCan/> Delete</Button>
                                {/* <a onClick={handleDeleteQuiz}><FaTrashCan style={{ fontSize: "23", marginLeft: "2%" }} /></a> */}
                                <div className="form-group row mt-3">
                                    <label htmlFor="lbl1" className="col-sm-3 col-form-label" style={{ fontWeight: "bold" }} >Question Type<span id='required'>*</span></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="lbl1" placeholder="Select your Question Type" style={{ borderRadius: 8 }} name='nameOfQuiz' value={fbQuestion.questionType}  />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl3" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Question<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl3" placeholder="Enter your Question" style={{ borderRadius: 8 }} name='duration' value={fbQuestion.question} />
                                    </div>
                                </div>
                                <div class="form-group row mt-3">
                                    <label for="lbl5" class="col-sm-3 col-form-label" style={{ fontWeight: "bold" }}>Option<span id='required'>*</span></label>
                                    <div class="col-sm-8">
                                        <input type="number" class="form-control" id="lbl5" placeholder="Select your option" style={{ borderRadius: 8 }} name='passMark' value={fbQuestion.options} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                    {/* <Button class="btn btn-light" style={{marginLeft:"80%" , marginTop:"-3%" , backgroundColor:"#365486", color:"white"}} onClick={handleOpenQuizEditModal}><AiFillEdit/> Edit</Button> */}
                                      <Button type="submit" className="btn btn-light" onClick={(e) => { handleSaveQuestion(e) }} style={{ marginLeft: "50%", marginTop: "3%", borderRadius: 8 , backgroundColor:"#365486", color:"white"}} ><FaUpload/> Import Question</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* <Modal show={showAddfbModal} onHide={handleCloseAddfbQuestionModal}>
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
            </Modal> */}

            </div>

        </div>
    )
}

export default QuizFeedback