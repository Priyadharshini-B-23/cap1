export const isFormValid = (nameofquiz, duration, passMark,attemptsAllowed) => {
    return nameofquiz !== '' && duration !== '' && passMark !== '' && attemptsAllowed !== '' ;
};

export const handleQuizTitleChange = (value, setError, setQuizTitle) => {
    if (/^\d+$/.test(value)) {
        setError('*Please enter only text ');
    } else {
        setError('');
        setQuizTitle(value);
    }
};























// export const handleDurationChange = (value, setError, setDuration) => {
//     if (!quizData.duration) {
//                 formIsValid = false;
//                 errors["duration"] = "*Please enter the duration.";
//             }
//             if (typeof quizData.duration !== "undefined") {
//                 if (quizData.duration > 180) {
//                     formIsValid = false;
//                     errors["duration"] = "*Duration should not exceed 180.";
//                 }
//             }
//      else {
//         setError('');
//         setDuration(value);
//     }
// };

// function validateForm() {
//     let errors = {};
//     let formIsValid = true;
//     // Validate Quiz Title
//     if (!quizData.nameOfQuiz) {
//         formIsValid = false;
//         errors["nameOfQuiz"] = "*Please enter your quiz title.";
//     }
//     if (typeof quizData.nameOfQuiz !== "undefined") {
//         if (!quizData.nameOfQuiz.match(/^[a-zA-Z ]*$/)) {
//             formIsValid = false;
//             errors["nameOfQuiz"] = "*Please enter alphabet characters only.";
//         }
//     }

//     // Validate Duration
//     if (!quizData.duration) {
//         formIsValid = false;
//         errors["duration"] = "*Please enter the duration.";
//     }
//     if (typeof quizData.duration !== "undefined") {
//         if (quizData.duration > 180) {
//             formIsValid = false;
//             errors["duration"] = "*Duration should not exceed 180.";
//         }
//     }

//     // Validate Grade
//     if (!quizData.passMark) {
//         formIsValid = false;
//         errors["passMark"] = "*Please enter the grade.";
//     }
//     if (typeof quizData.passMark !== "undefined") {
//         if (!quizData.passMark.match(/^[0-9]*$/)) {
//             formIsValid = false;
//             errors["passMark"] = "*Please enter numeric characters only.";
//         }
//     }

//     // Validate Attempts
//     if (!quizData.attemptsAllowed) {
//         formIsValid = false;
//         errors["attemptsAllowed"] = "*Please enter the number of attempts allowed.";
//     }
//     if (typeof quizData.attemptsAllowed !== "undefined") {
//         if (!quizData.attemptsAllowed.match(/^[0-9]*$/)) {
//             formIsValid = false;
//             errors["attemptsAllowed"] = "*Please enter numeric characters only.";
//         }
//     }

//     setError(errors);
//     return formIsValid;
// }

















// export const isFormValid = (quiz) => {
//     return quiz.quizTitle !== '' && quiz.duration !== '' && quiz.grade !== '';
// };


// export const handleQuizTitleChange = (value, setQuiz) => {
//     if (/^\d+$/.test(value)) {
//         setQuiz(prevState => ({
//             ...prevState,
//             quizTitle: '',
//             error: '*Please enter only text'
//         }));
//     } else {
//         setQuiz(prevState => ({
//             ...prevState,
//             quizTitle: value,
//             error: ''
//         }));
//     }
// };


