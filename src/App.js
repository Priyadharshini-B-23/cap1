import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import QuizEditorView from './View/QuizEditorView';
import CreateQuizView from './View/CreateQuizView';
import QuizEditor from './components/QuizEditor';
import { QuestionTemplate } from './components/QuizComponents/QuestionTemplate';
import { Provider } from 'react-redux';
// import store from './store/configureStore'; 
import store from './Store/fileConfigureStore';
import UploadBulkQuiz from './components/QuizComponents/UploadBulkQuiz';
import './App.css'
import './Styles/CreateQuiz.css'
import QuestionTemplateView from './View/QuestionTemplateView';
import ReviewQuestions from './components/QuizComponents/ReviewQuestions';
import QuizNavbar from './components/QuizComponents/QuizNavbar';
import QuizFeedback from './components/QuizFeedback';
function App() {
  return (
      <Routes>
        <Route path="/quiz" element={<QuizEditor />} />
        <Route path="/" element={<CreateQuizView/>}/>  
        <Route path='/questiontemplate' element={<QuestionTemplateView/>}/>
        <Route path='/reviewquestions' element={<ReviewQuestions/>}/>
        <Route path='/quiznavbar' element={<QuizNavbar/>}/>
        <Route path='/quizfeedback' element={<QuizFeedback/>}/>
        <Route path='/upload' element={
          // <Provider store={store}>
          //   <div>
              <UploadBulkQuiz />
          //   </div>
          // </Provider>
        } />
      </Routes>
  )};
export default App;



















// import './App.css';
// import {Routes, Route} from 'react-router-dom'
// import QuizEditorView from './view/QuizEditorView';


// function App() {
//   return (
//     <div className="App">
//      <Routes>
//         <Route path="quizEditorview" element={<QuizEditorView/>} /> 
//       </Routes>
//     </div>
    
//   );
// }
// export default App;
























// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;