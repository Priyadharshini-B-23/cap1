
// validate.js
export function validateQuestionType(selectedQuestionType) {
    if (selectedQuestionType === "") {
        return "Required field";
    } else {
        return "";
    }
}
