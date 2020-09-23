const form = document.getElementById('siskuLogin');
const siskuUserInput = document.getElementById('siskuInputUser');
const siskuPasswordInput = document.getElementById('siskuInputPassword');
const users = JSON.parse(localStorage.getItem( 'siskuUsers' ));
const errorMessage = document.getElementById('siskuErrorMessageLogin');

const checklogged = obj => {
	if(obj[0].loggedUser != undefined){
		window.location.replace("last-quizzes.html");
	}
}

const siskuLogin = e => {
  e.preventDefault();
  
  const userInput = siskuUserInput.value;
  const passwordInput = siskuPasswordInput.value;
  const checkUser = users.filter(function(user){return user.userName == userInput;})[0];
  const checkPassword = users.filter(function(password){return password.password == passwordInput;})[0];

  if( checkUser != undefined && checkPassword != undefined){
  	users[0].loggedUser = checkUser.userName;
  	localStorage.setItem('siskuUsers', JSON.stringify(users));
  	window.location.replace("last-quizzes.html");
  }else{
  	errorMessage.style.visibility = 'visible';
  }
}

const hideError = e => {
    errorMessage.style.visibility = 'hidden';
}

checklogged(users); 
form.addEventListener('submit', siskuLogin);
siskuUserInput.addEventListener('click', hideError);
siskuPasswordInput.addEventListener('click', hideError);