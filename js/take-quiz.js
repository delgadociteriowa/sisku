const takeQuizTitle = document.getElementById('takeQuizTitle');
const takeQuizDescription = document.getElementById('takeQuizDescription');
const quizToTake = JSON.parse(localStorage.getItem( 'siskuTakeQuiz' ));
const listOfQuestions = document.getElementById('listOfQuestions');
const finishQuiz = document.getElementById( 'siskuFinishQuiz' );
const leaveQuiz = document.getElementById( 'siskuLeaveQuiz' );
const quizQuestions = document.getElementsByClassName('take-quiz-question');
const userAnswers = [];

const setQuiz = (quiz) => {
	
	let questionNumber = 1;
	let answerNumber = 0;
	const answerLetters = ['A','B','C','D'];

	takeQuizTitle.appendChild(document.createTextNode(quiz.name));
	takeQuizDescription.appendChild(document.createTextNode(quiz.description));

	quiz.questions.forEach((question) => {

		const divRow = document.createElement('div');
		const divQuestionNumber = document.createElement('div');
		const divQuestion = document.createElement('div');

		divRow.className = 'row take-quiz-question';
		divQuestionNumber.id = 'siskuQuizQuestionNumber-'+questionNumber;
		divQuestionNumber.className = 'col-1 number';
		divQuestion.id = 'siskuQuizQuestion-'+questionNumber;
		divQuestion.className = 'col-11 question-text';

		divQuestionNumber.appendChild(document.createTextNode(questionNumber+'.'));
		divQuestion.appendChild(document.createTextNode(question.question));

		divRow.appendChild(divQuestionNumber);
		divRow.appendChild(divQuestion);

		question.answers.forEach((answer) =>{

			const answerOption = document.createElement('div');
			const answerSelector = document.createElement('div');
			const letterHolder = document.createElement('span');
			const optionTextHolder = document.createElement('span');
			const inputSelector = document.createElement('input'); 

			answerOption.className = 'col-5 option';
			answerSelector.className = 'col-1 selector';
			letterHolder.className = 'letter';
			optionTextHolder.className = 'optionText';
			optionTextHolder.id = 'question-'+questionNumber+'-option-'+answerNumber;
			inputSelector.className = 'form-check-input';
			inputSelector.id = 'radioQuestion-'+questionNumber+'-option-'+answerNumber;
			inputSelector.setAttribute('type','radio');
			inputSelector.setAttribute('name','siskuOptionsGroup-'+questionNumber);
			inputSelector.setAttribute('value',answerNumber);

			letterHolder.appendChild(document.createTextNode(answerLetters[answerNumber]));
			optionTextHolder.appendChild(document.createTextNode(answer));

			answerOption.appendChild(letterHolder);
			answerOption.appendChild(optionTextHolder);

			answerSelector.appendChild(inputSelector);

			divRow.appendChild(answerOption);
			divRow.appendChild(answerSelector);

			answerNumber = answerNumber == 3 ? answerNumber = 0 : answerNumber + 1;
		});

		listOfQuestions.appendChild(divRow);
		
		questionNumber++;	
	});
}

const getAnswers = e =>{
	e.preventDefault();
	if( confirm('Have you already finished the quiz?') ){
		for( let i = 0; i < quizQuestions.length; i++){
			const answers = quizQuestions[i].getElementsByClassName('form-check-input');
			for( let j = 0; j < answers.length; j++){
				if( answers[j].checked ){
					userAnswers.push(answers[j].value);
					break;
				}else if ( j == 3){
					userAnswers.push('x');
				}
			}
		}
		localStorage.setItem('siskuUserAnswers', JSON.stringify(userAnswers));
		window.location.replace('end-quiz.html#'+quizToTake.id);
	}
}

const leaveTheQuiz = e =>{
	e.preventDefault();
	if( confirm('Are you sure you want to leave the quiz?') ){
		window.location.replace('last-quizzes.html');
	}
}

setQuiz(quizToTake);
finishQuiz.addEventListener('click',getAnswers);
leaveQuiz.addEventListener('click',leaveTheQuiz);

