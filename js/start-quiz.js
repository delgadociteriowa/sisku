const quizId = window.location.href.split("#")[1];
const quizTitleSpace = document.getElementById('siskuQuizTitle');
const quizAuthorSpace = document.getElementById('siskuQuizAuthor');
const quizCategorySpace = document.getElementById('siskuQuizCategory');
const quizDescriptionSpace = document.getElementById('siskuQuizDescription');
const startSiskuQuiz = document.getElementById('startSiskuQuiz');
const siskuQuizzes = JSON.parse(localStorage.getItem( 'siskuQuizzes' ));
const theQuiz = siskuQuizzes.filter((obj) => {return obj.id == quizId;})[0];
const theQuizUserData = loggedUserData.quizzesTaken.filter((obj)=>{return obj.id == quizId})[0];
const yourAttempts = document.getElementById('yourAttempts');
const yourLastScore = document.getElementById('yourLastScore');
const yourLastTry = document.getElementById('yourLastTry');
const yourBestScore = document.getElementById('yourBestScore');
const averageScore = document.getElementById('averageScore');
const bestScoreBy = document.getElementById('bestScoreBy');
const bestScore = document.getElementById('bestScore');

const cleanAnswers = () =>{
	for ( let i = 0; i < theQuiz.questions.length; i++){
		theQuiz.questions[i].rightAnswer = '-';
	}
}

const checkQuizExistence = (quizid, quiz) => {
	if(quizid == undefined || quiz == undefined){
		window.location.replace("last-quizzes.html");
	}	
}

const setQuizData = () => {
	quizTitleSpace.appendChild(document.createTextNode(theQuiz.name));
	quizAuthorSpace.appendChild(document.createTextNode(theQuiz.author));
	quizCategorySpace.appendChild(document.createTextNode(theQuiz.category));
	quizDescriptionSpace.appendChild(document.createTextNode(theQuiz.description));

	if( theQuiz.averageScore == null ){
		averageScore.appendChild(document.createTextNode('Any user have tried this quiz.'));
		bestScoreBy.appendChild(document.createTextNode('Any user have tried this quiz.'));
		bestScore.appendChild(document.createTextNode('Any user have tried this quiz.'));
	}else{
		averageScore.appendChild(document.createTextNode(theQuiz.averageScore + '/' + theQuiz.questions.length));
		bestScoreBy.appendChild(document.createTextNode(theQuiz.bestScoreBy.toString()));
		bestScore.appendChild(document.createTextNode(theQuiz.bestScore + '/' + theQuiz.questions.length));
	}

	if( theQuizUserData == undefined ){
		yourAttempts.appendChild(document.createTextNode("You haven't tried this quiz."));
		yourLastScore.appendChild(document.createTextNode("You haven't tried this quiz."));
		yourLastTry.appendChild(document.createTextNode("You haven't tried this quiz."));
		yourBestScore.appendChild(document.createTextNode("You haven't tried this quiz."));
	}else{
		yourAttempts.appendChild(document.createTextNode(theQuizUserData.attempts));
		yourLastScore.appendChild(document.createTextNode(theQuizUserData.lastScore + '/' + theQuiz.questions.length));
		yourLastTry.appendChild(document.createTextNode(theQuizUserData.lastTry));
		yourBestScore.appendChild(document.createTextNode(theQuizUserData.bestScore + '/' + theQuiz.questions.length));
	}
	
}

const startQuiz = (e) => {
	localStorage.setItem('siskuTakeQuiz', JSON.stringify(theQuiz));
	window.location.replace("take-quiz.html");		
}

cleanAnswers();
checkQuizExistence(quizId, theQuiz);
setQuizData();
startSiskuQuiz.addEventListener('click', startQuiz);