const quizId = window.location.href.split("#")[1]; // id del quiz
const siskuQuizzes = JSON.parse(localStorage.getItem( 'siskuQuizzes' )); //todos los quizzes
const theQuiz = siskuQuizzes.filter((obj) => {return obj.id == quizId;})[0]; // el objeto del quiz
const quizInputName = document.getElementById('quizName');// input del nombre del curso
const quizInputDescription = document.getElementById('quizDescription');// input de la descripción del curso
const quizInputCategory = document.getElementById('quizCategory');// input selector de la categoría del curso
const inputCategories = ['mathematics','physics','chemistry','philosophy','history']; // categorías del curso
let indexCategories;
const quizQuestionsFather = document.getElementById('editQuizQuestions');
const cancelButton = document.getElementById('cancelQuizChanges');
const saveButton = document.getElementById('submitQuizChanges');
const saveAndPublishButton = document.getElementById('submitQuizPublish');

const checkQuizExistenceAndOwning = (quizid, quiz) => { //checa si el quiz existe (repetido en start course)
	if( quizid == undefined || quiz == undefined || theQuiz.authorUsername != loggedUserData.userName ){
		window.location.replace("my-quizzes.html");
	}	
}

const setModificationDate = () => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	let hh = (today.getHours()<10?'0':'') + today.getHours();
	let min = (today.getMinutes()<10?'0':'') + today.getMinutes();
	return mm + '/' + dd + '/' + yyyy + ' - ' + hh + ':' + min;
}

const emptyQuestionRow = () => {

	const quizQuestionRow = document.createElement('div');
	const col10 = document.createElement('div');
	const cardCreate = document.createElement('div');
	const cardHeader = document.createElement('div');
	const removeQuestion = document.createElement('i');
	const cardBody = document.createElement('div');
	const rowBody = document.createElement('div');
	const formGroupQuestion = document.createElement('div');
	const labelQuestion = document.createElement('label');
	const inputQuestion = document.createElement('input');
	const explanationOneP = document.createElement('p');
	const explanationTwoP = document.createElement('p');

	quizQuestionRow.className = 'quizQuestionRow row';
	col10.className = 'col-10 offset-1';
	cardCreate.className = 'card mb-4 card-create question';
	cardHeader.className = 'card-header question-number';
	removeQuestion.className = 'fas fa-trash-alt removeQuestion';
	removeQuestion.setAttribute('title','Remove Question');
	cardBody.className = 'card-body container-fluid';
	rowBody.className = 'row';
	formGroupQuestion.className = 'form-group col-12';
	labelQuestion.className = 'labelQuestion';
	inputQuestion.className = 'form-control inputQuestion';
	inputQuestion.setAttribute('type','text');
	explanationOneP.className = 'col-12 explanation';
	explanationTwoP.className = 'col-12 explanation';

	labelQuestion.appendChild(document.createTextNode('Question'));
	explanationOneP.appendChild(document.createTextNode('Enter the answer options of the question'));
	explanationTwoP.appendChild(document.createTextNode('Select the right option of the question'));

	formGroupQuestion.appendChild(labelQuestion);
	formGroupQuestion.appendChild(inputQuestion);
	rowBody.appendChild(formGroupQuestion);
	rowBody.appendChild(explanationOneP);

	const answerOptions = ['A','B','C','D'];
	for(let answerNumber = 0; answerNumber < 4; answerNumber++){
		const answerOption = document.createElement('div');
		const labelAnswer = document.createElement('label');
		const inputAnswer = document.createElement('input');
		answerOption.className = 'form-group col-6';
		inputAnswer.className = 'form-control inputAnswer';
		inputAnswer.setAttribute('type','text');
		labelAnswer.className = 'labelAnswer';
		labelAnswer.appendChild(document.createTextNode(answerOptions[answerNumber]+' :'));
		answerOption.appendChild(labelAnswer);
		answerOption.appendChild(inputAnswer);
		rowBody.appendChild(answerOption);
	}

	rowBody.appendChild(explanationTwoP);

	for(let answerNumber = 0; answerNumber < 4; answerNumber++){
		const answerOptionRadio = document.createElement('div');
		const labelAnswerRadio = document.createElement('label');
		const inputAnswerRadio = document.createElement('input');
		answerOptionRadio.className = 'form-check col-3 answer-option';
		inputAnswerRadio.className = 'form-check-input inputAnswerRadio';
		inputAnswerRadio.setAttribute('type','radio');
		inputAnswerRadio.setAttribute('value', answerNumber);
		labelAnswerRadio.className = 'labelAnswerRadio';
		labelAnswerRadio.appendChild(document.createTextNode('Option '+answerOptions[answerNumber]));
		answerOptionRadio.appendChild(labelAnswerRadio);
		answerOptionRadio.appendChild(inputAnswerRadio);
		rowBody.appendChild(answerOptionRadio);
	}

	cardBody.appendChild(rowBody);
	cardHeader.appendChild(removeQuestion);
	cardCreate.appendChild(cardHeader);
	cardCreate.appendChild(cardBody);
	col10.appendChild(cardCreate);
	quizQuestionRow.appendChild(col10);
	quizQuestionsFather.appendChild(quizQuestionRow);

}

const displayAddQuestionButton = () => {
	const addQuestionButton = document.createElement('span');
	addQuestionButton.id = 'addQuestion';
	addQuestionButton.className = 'btn btn-primary addQuestion';
	addQuestionButton.appendChild(document.createTextNode('Add Question'));
	quizQuestionsFather.appendChild(addQuestionButton);
}

const setQuizData = () => {
	
	quizInputName.value = theQuiz.name;
	quizInputDescription.value = theQuiz.description;

	for( indexCategories = 0; indexCategories < inputCategories.length; indexCategories++ ){
		if( inputCategories[indexCategories] == theQuiz.category){
			break;
		}
	}

	inputCategories.splice(indexCategories, 1);
	inputCategories.unshift(theQuiz.category);

	inputCategories.forEach((inputCategory) => {
		const option = document.createElement('option');
		option.setAttribute('value',inputCategory);
		let capitalizeCategory = inputCategory.charAt(0).toUpperCase() + inputCategory.slice(1);
		option.appendChild(document.createTextNode(capitalizeCategory));
		quizInputCategory.appendChild(option);
	});

	
	theQuiz.questions.forEach( (question) => {
		emptyQuestionRow();	
	});

	displayAddQuestionButton();

	const quizQuestions = document.getElementsByClassName( 'quizQuestionRow' );

	for( let i = 0; i < quizQuestions.length ; i++){
		const questionNumber = quizQuestions[i].getElementsByClassName('question-number')[0];
		const labelQuestion = quizQuestions[i].getElementsByClassName('labelQuestion')[0];
		const inputQuestion = quizQuestions[i].getElementsByClassName('inputQuestion')[0];
		const labelAnswers = quizQuestions[i].getElementsByClassName('labelAnswer');
		const inputAnswers = quizQuestions[i].getElementsByClassName('inputAnswer');
		const labelAnswerRadios = quizQuestions[i].getElementsByClassName('labelAnswerRadio');
		const inputAnswerRadios = quizQuestions[i].getElementsByClassName('inputAnswerRadio');
		
		questionNumber.appendChild(document.createTextNode('Question '+(i+1)));
		labelQuestion.setAttribute('for', 'quiz'+quizId+'-question'+i);
		inputQuestion.id = 'quiz'+quizId+'-question'+i;
		inputQuestion.value = theQuiz.questions[i].question;

		for( let j = 0; j < 4; j++){
			labelAnswers[j].setAttribute('for', 'quiz'+quizId+'-question'+i+'-answer'+j);
			inputAnswers[j].id = 'quiz'+quizId+'-question'+i+'-answer'+j;
			inputAnswers[j].value = theQuiz.questions[i].answers[j];
			labelAnswerRadios[j].setAttribute('for', 'quiz'+quizId+'-question'+i+'-radio'+j);
			inputAnswerRadios[j].id = 'quiz'+quizId+'-question'+i+'-radio'+j;
			inputAnswerRadios[j].setAttribute('name', 'quiz'+quizId+'-question'+i+'-radio');
			inputAnswerRadios[j].setAttribute('value', j);
			if (theQuiz.questions[i].rightAnswer == j){
				inputAnswerRadios[j].click();
			}
		}
	}
}

const setPublishButton = () => {
	if( theQuiz.status == 'published' ){
		saveAndPublishButton.setAttribute('value','Save Quiz & Hide');
	}else{
		saveAndPublishButton.setAttribute('value','Save Quiz & Publish');
	}
}

const deleteQuestion = e => {
	let trash = e.target;
	if(trash.classList.contains('removeQuestion')){
		if(confirm('Are you sure you want to delete this question?')){
			trash.parentElement.parentElement.parentElement.parentElement.remove();
			const questionNumber = document.getElementsByClassName( 'question-number' );
			const quizQuestions = document.getElementsByClassName( 'quizQuestionRow' );
			for(let i = 0; i < questionNumber.length; i++){
				questionNumber[i].childNodes[1].nodeValue = 'Question '+(i+1);

				const labelQuestion = quizQuestions[i].getElementsByClassName('labelQuestion')[0];
				const inputQuestion = quizQuestions[i].getElementsByClassName('inputQuestion')[0];
				const labelAnswers = quizQuestions[i].getElementsByClassName('labelAnswer');
				const inputAnswers = quizQuestions[i].getElementsByClassName('inputAnswer');
				const labelAnswerRadios = quizQuestions[i].getElementsByClassName('labelAnswerRadio');
				const inputAnswerRadios = quizQuestions[i].getElementsByClassName('inputAnswerRadio');

				labelQuestion.setAttribute('for', 'quiz'+quizId+'-question'+i);
				inputQuestion.id = 'quiz'+quizId+'-question'+i;

				for( let j = 0; j < 4; j++){
					labelAnswers[j].setAttribute('for', 'quiz'+quizId+'-question'+i+'-answer'+j);
					inputAnswers[j].id = 'quiz'+quizId+'-question'+i+'-answer'+j;
					labelAnswerRadios[j].setAttribute('for', 'quiz'+quizId+'-question'+i+'-radio'+j);
					inputAnswerRadios[j].id = 'quiz'+quizId+'-question'+i+'-radio'+j;
					inputAnswerRadios[j].setAttribute('name', 'quiz'+quizId+'-question'+i+'-radio');
				}
			}
		}
	}
}

const addQuestion = e => {
	document.getElementById('addQuestion').remove();
	emptyQuestionRow();
	displayAddQuestionButton();

	const quizQuestions = document.getElementsByClassName( 'quizQuestionRow' );
	const lq = quizQuestions.length-1;

	const questionNumber = quizQuestions[lq].getElementsByClassName('question-number')[0];
	const labelQuestion = quizQuestions[lq].getElementsByClassName('labelQuestion')[0];
	const inputQuestion = quizQuestions[lq].getElementsByClassName('inputQuestion')[0];
	const labelAnswers = quizQuestions[lq].getElementsByClassName('labelAnswer');
	const inputAnswers = quizQuestions[lq].getElementsByClassName('inputAnswer');
	const labelAnswerRadios = quizQuestions[lq].getElementsByClassName('labelAnswerRadio');
	const inputAnswerRadios = quizQuestions[lq].getElementsByClassName('inputAnswerRadio');
	const answerOptions = ['A','B','C','D'];
	
	questionNumber.appendChild(document.createTextNode('Question '+(lq+1)));
	labelQuestion.setAttribute('for', 'quiz'+quizId+'-question'+lq);
	inputQuestion.id = 'quiz'+quizId+'-question'+lq;
	inputQuestion.value = "Add a new Question";

	for( let j = 0; j < 4; j++){
		labelAnswers[j].setAttribute('for', 'quiz'+quizId+'-question'+lq+'-answer'+j);
		inputAnswers[j].id = 'quiz'+quizId+'-question'+lq+'-answer'+j;
		inputAnswers[j].value = 'Enter the answer option '+answerOptions[j];
		labelAnswerRadios[j].setAttribute('for', 'quiz'+quizId+'-question'+lq+'-radio'+j);
		inputAnswerRadios[j].id = 'quiz'+quizId+'-question'+lq+'-radio'+j;
		inputAnswerRadios[j].setAttribute('name', 'quiz'+quizId+'-question'+lq+'-radio');
		inputAnswerRadios[j].setAttribute('value', j);
	}

	const addQuestionButton = document.getElementById('addQuestion');
	addQuestionButton.addEventListener('click',addQuestion);
}

const updateQuiz = e => {
	e.preventDefault();

	let message;
	if(e.target.id != 'submitQuizPublish'){
		message = 'Are you sure you want to save the changes?';
	}else{
		if( theQuiz.status == 'published'){
			message = 'Are you sure you want to save the changes and hide the quiz from the public view?';
		}else{
			message = 'Are you sure you want to save the changes and publish the quiz?';
		}
	}

	if( confirm(message) ){

		if( e.target.id == 'submitQuizPublish'){
			if( theQuiz.status == 'published'){
				theQuiz.status = 'not-published'
			}else{
				theQuiz.status = 'published'
			}
		}

		theQuiz.name = quizInputName.value;
		theQuiz.description = quizInputDescription.value;
		theQuiz.category = quizInputCategory.value;
		theQuiz.lastModification = setModificationDate();

		const updatedQuestions = [];
		const newQuestionsData = document.getElementsByClassName( 'quizQuestionRow' );

		function Question( questionText, questionAnswers, rightAnswer){
			this.question = questionText;
			this.answers = [];
			this.answers[0] = questionAnswers[0];
			this.answers[1] = questionAnswers[1];
			this.answers[2] = questionAnswers[2];
			this.answers[3] = questionAnswers[3];
			this.rightAnswer = rightAnswer;
		}

		for( let i = 0; i < newQuestionsData.length; i++){
			const questionText = newQuestionsData[i].getElementsByClassName( 'inputQuestion' )[0].value;
			const questionAnswersArray = [
											newQuestionsData[i].getElementsByClassName( 'inputAnswer' )[0].value,
											newQuestionsData[i].getElementsByClassName( 'inputAnswer' )[1].value,
											newQuestionsData[i].getElementsByClassName( 'inputAnswer' )[2].value,
											newQuestionsData[i].getElementsByClassName( 'inputAnswer' )[3].value
										 ]
			const rightAnswersRadioArray = newQuestionsData[i].getElementsByClassName( 'inputAnswerRadio' );
			let rightAnswerChecked;

			for( let i = 0; i < rightAnswersRadioArray.length; i++){
				if(rightAnswersRadioArray[i].checked){
					rightAnswerChecked = rightAnswersRadioArray[i].value;
					break;
				}else{
					rightAnswerChecked = undefined;
				}
			}

			const question = new Question( questionText,questionAnswersArray, rightAnswerChecked);
			updatedQuestions.push(question);
		}

		theQuiz.questions = updatedQuestions;
		
		let quizIndex;
		for( quizIndex = 0; quizIndex < siskuQuizzes.length; quizIndex++){
			if( quizId == siskuQuizzes[quizIndex].id){
				break;
			}
		}

		siskuQuizzes.splice(quizIndex, 1);
		siskuQuizzes.push(theQuiz);
		localStorage.setItem('siskuQuizzes', JSON.stringify(siskuQuizzes));
		setPublishButton();
		alert("The quiz has been updated.");
	}
}

const cancelEdition = e => {
	e.preventDefault();
	if(confirm('Are you sure you want to leave without saving your changes?')){
		window.location.replace("my-quizzes.html");
	}
}

checkQuizExistenceAndOwning(quizId, theQuiz);
setQuizData();
setPublishButton();
const addQuestionButton = document.getElementById('addQuestion');
saveButton.addEventListener('click',updateQuiz);
saveAndPublishButton.addEventListener('click',updateQuiz);
cancelButton.addEventListener('click', cancelEdition);
quizQuestionsFather.addEventListener('click',deleteQuestion);
addQuestionButton.addEventListener('click',addQuestion);



