import { createStore, combineReducers,applyMiddleware } from 'redux';
import quizReducer from '../reducers/quizReducer';
import { thunk } from 'redux-thunk'; // Corrected import

import { QuizFeedbackApi } from '../middleware/QuizFeedbackApi';
import QuizFeedbackReducer from '../reducers/QuizFeedbackReducer';


const rootReducer = combineReducers({
  quiz: quizReducer,
  quizfeedback:QuizFeedbackReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk,QuizFeedbackApi ));

export default store;








// import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk'; // If you're using Redux Thunk middleware
// import quizReducer from './reducers/quizReducer'; // Assuming you have a quizReducer

// const rootReducer = combineReducers({
//   quiz: quizReducer,
//   // Add other reducers here if needed
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;