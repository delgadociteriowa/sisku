const quizId = window.location.href.split("#")[1];
const siskuQuizzes = JSON.parse(localStorage.getItem( 'siskuQuizzes' ));
const theQuiz = siskuQuizzes.filter((obj) => {return obj.id == quizId;})[0];
const rightAnswersArray = theQuiz.questions.map((obj) => {return obj.rightAnswer});
const userAnswersArray =  JSON.parse(localStorage.getItem( 'siskuUserAnswers' )).map((obj) => {return parseInt(obj);});
const quizTitleSpace = document.getElementById('siskuQuizTitle');
const quizAuthorSpace = document.getElementById('siskuQuizAuthor');
const quizCategorySpace = document.getElementById('siskuQuizCategory');
const quizDescriptionSpace = document.getElementById('siskuQuizDescription');
const userScore = document.getElementById('userScore');
const quizTotal = document.getElementById('quizTotal');
const approvedFailed = document.getElementById('approvedFailed');
const yourAttempts = document.getElementById('yourAttempts');
const yourBestScore = document.getElementById('yourBestScore');
const averageScore = document.getElementById('averageScore');
const bestScoreBy = document.getElementById('bestScoreBy');
const bestScore = document.getElementById('bestScore');
const tryAgainButton = document.getElementById('tryAgainButton');
let userNumberScore = 0;

const checkQuizExistence = (quizid, quiz) => {
	if(quizid == undefined || quiz == undefined){
		window.location.replace("last-quizzes.html");
	}	
}

const setTryAgain = () => {
	tryAgainButton.setAttribute('href','start-quiz.html#'+quizId);
}

const displayQuizData = () => {
	
	quizTitleSpace.appendChild(document.createTextNode(theQuiz.name));
	quizAuthorSpace.appendChild(document.createTextNode(theQuiz.author));
	quizCategorySpace.appendChild(document.createTextNode(theQuiz.category));
	quizDescriptionSpace.appendChild(document.createTextNode(theQuiz.description));
	quizTotal.appendChild(document.createTextNode(theQuiz.questions.length));''
	userScore.appendChild(document.createTextNode(userNumberScore));

	if( userNumberScore >= theQuiz.questions.length/2){
		approvedFailed.style.color = '#1E9B96';
		approvedFailed.appendChild(document.createTextNode('approved'));
	}else{
		approvedFailed.style.color = '#EB1302';
		approvedFailed.appendChild(document.createTextNode('failed'));
	}

	yourAttempts.appendChild(document.createTextNode( loggedUserData.quizzesTaken.filter((obj)=>{return obj.id == quizId})[0].attempts ));
	yourBestScore.appendChild(document.createTextNode( userBestScore + '/' + theQuiz.questions.length ));
	averageScore.appendChild(document.createTextNode( theQuiz.averageScore + '/' + theQuiz.questions.length ));
	bestScoreBy.appendChild(document.createTextNode( theQuiz.bestScoreBy.toString()));
	bestScore.appendChild(document.createTextNode( theQuiz.bestScore + '/' + theQuiz.questions.length ));
}

const setLastTryDate = () => {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();
	let hh = (today.getHours()<10?'0':'') + today.getHours();
	let min = (today.getMinutes()<10?'0':'') + today.getMinutes();
	return mm + '/' + dd + '/' + yyyy + ' - ' + hh + ':' + min;
}


function Result( id, lastTry, attempts, lastScore, bestScore, attemptsFailed, attemptsPassed ){
	this.id = id;
	this.lastTry = lastTry;
	this.attempts = attempts;
	this.lastScore = lastScore;
	this.bestScore = bestScore;
	this.attemptsFailed = attemptsFailed;
	this.attemptsPassed = attemptsPassed;
}

const setUserResult = () => {
	
	for(let i = 0; i < rightAnswersArray.length; i++){
		if( rightAnswersArray[i] == userAnswersArray[i] ){
			userNumberScore++;
		}
	}

	if( userNumberScore >= theQuiz.questions.length / 2){
		loggedUserData.approvedQuizzes = loggedUserData.approvedQuizzes + 1; 
	}else{
		loggedUserData.failedQuizzes = loggedUserData.failedQuizzes + 1;
	}

	const userResultArray = loggedUserData.quizzesTaken.filter((obj)=>{return obj.id == quizId}); //indica la existencia del objeto
	if (userResultArray.length > 0){//significa que ya lo ha presentado
		for(let i = 0; i < loggedUserData.quizzesTaken.length; i++){
			if (loggedUserData.quizzesTaken[i].id == quizId){
				loggedUserData.quizzesTaken[i].lastTry = lastTryDate;
				loggedUserData.quizzesTaken[i].attempts = loggedUserData.quizzesTaken[i].attempts + 1;
				loggedUserData.quizzesTaken[i].lastScore = userNumberScore;				
				loggedUserData.quizzesTaken[i].bestScore = loggedUserData.quizzesTaken[i].bestScore > userNumberScore ?
														   loggedUserData.quizzesTaken[i].bestScore :
														   userNumberScore;
				loggedUserData.quizzesTaken[i].attemptsFailed = userNumberScore < theQuiz.questions.length / 2 ? 
																loggedUserData.quizzesTaken[i].attemptsFailed + 1 :
																loggedUserData.quizzesTaken[i].attemptsFailed;
				loggedUserData.quizzesTaken[i].attemptsPassed = userNumberScore > theQuiz.questions.length / 2 ?
																loggedUserData.quizzesTaken[i].attemptsPassed + 1 :
																loggedUserData.quizzesTaken[i].attemptsPassed;
				break;
			}
		}
	}else{
		let pass = 0;
		let fail = 0;

		if (userNumberScore > theQuiz.questions.length / 2){
			pass = 1;
		}else{
			fail = 1; 	
		}

		const quizIdInteger = parseInt(quizId);

		const quizResult = new Result( quizIdInteger, lastTryDate, 1, userNumberScore, userNumberScore, fail, pass );
		console.log(quizResult);
		loggedUserData.quizzesTaken.push(quizResult);
	}

	if( loggedUserData.highestScore.score == null ){
		loggedUserData.highestScore.score = userNumberScore;
		loggedUserData.highestScore.quiz = theQuiz.name;
	}else if( userNumberScore == loggedUserData.highestScore.score ){
		if( !(loggedUserData.highestScore.quiz.includes(theQuiz.name)) ){
			loggedUserData.highestScore.quiz = loggedUserData.highestScore.quiz + ", " + theQuiz.name;
		}
	}else if( userNumberScore > loggedUserData.highestScore.score ){
		loggedUserData.highestScore.score = userNumberScore;
		loggedUserData.highestScore.quiz = theQuiz.name;
	}

	if( loggedUserData.lowestScore.score == null ){
		loggedUserData.lowestScore.score = userNumberScore;
		loggedUserData.lowestScore.quiz = theQuiz.name;
	}else if( userNumberScore == loggedUserData.lowestScore.score ){
		if( !(loggedUserData.lowestScore.quiz.includes(theQuiz.name)) ){
			loggedUserData.lowestScore.quiz = loggedUserData.lowestScore.quiz + ", " + theQuiz.name;
		}
	}else if( userNumberScore < loggedUserData.lowestScore.score ){
		loggedUserData.lowestScore.score = userNumberScore;
		loggedUserData.lowestScore.quiz = theQuiz.name;
	}

	loggedUserData.quizAttempts = loggedUserData.quizAttempts + 1;

	localStorage.setItem('siskuUsers', JSON.stringify(users));

}

const setQuizData = () => {
	let sumScores = 0;
	let average;
	let averageRounded;
	let bscoreb = [];
	let bscore = 0;

	theQuiz.scores.push({ user: loggedUserData.userName, score: userNumberScore });
	
	for( let i = 0; i < theQuiz.scores.length; i++){
		sumScores = sumScores + theQuiz.scores[i].score;

		if( bscore < theQuiz.scores[i].score ){
			bscoreb = [];
			bscore = theQuiz.scores[i].score;
			bscoreb.push(theQuiz.scores[i].user);
		}else if( bscore == theQuiz.scores[i].score ){
			let match = 0;
			for( let j = 0; j < bscoreb.length; j++ ){
				if( bscoreb[j] == theQuiz.scores[i].user ){
					match = match + 1;
				}
			}
			if( match == 0 ){
				bscoreb.push(theQuiz.scores[i].user);
			}
		}
	}

	average = Math.round( sumScores/theQuiz.scores.length );

	theQuiz.averageScore = average;
	theQuiz.bestScoreBy = bscoreb;
	theQuiz.bestScore = bscore;

	localStorage.setItem('siskuQuizzes', JSON.stringify(siskuQuizzes));
} 

const lastTryDate = setLastTryDate();
checkQuizExistence(quizId, theQuiz);
setTryAgain();
setUserResult();
setQuizData();
const userBestScore = loggedUserData.quizzesTaken.filter((obj)=>{return obj.id == quizId})[0].bestScore;
displayQuizData();


