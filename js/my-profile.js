const displayUsername = document.getElementById('myProfileDisplayUsername');
const displayFirstname = document.getElementById('myProfileDisplayFirstname');
const displayLastname = document.getElementById('myProfileDisplayLastname');
const displayPassword = document.getElementById('myProfileDisplayPasword');
const displayProfileimg = document.getElementById('myProfileDisplayImg');
const fieldFirstname = document.getElementById('myProfileFirstname');
const fieldLastname = document.getElementById('myProfileLastname');
const fieldPassword = document.getElementById('myProfilePassword');
const editFirstnameBtn = document.getElementById('siskuEditFirstname');
const editLastnameBtn = document.getElementById('siskuEditLastname');
const editPasswordBtn = document.getElementById('siskuEditPassword');
const cancelFirstnameBtn = document.getElementById('siskuCancelFirstname');
const cancelLastnameBtn = document.getElementById('siskuCancelLastname');
const cancelPasswordBtn = document.getElementById('siskuCancelPassword');
const formMyProfile = document.getElementById('siskuUpdateProfile');
const quizzesTaken = document.getElementById('quizzesTaken');
const approvedQuizzes = document.getElementById('approvedQuizzes');
const failedQuizzes = document.getElementById('failedQuizzes');
const highestScore = document.getElementById('highestScore');
const lowestScore = document.getElementById('lowestScore');

const displayProfileData = () => {
	displayUsername.appendChild(document.createTextNode(loggedUserData.userName));
	displayFirstname.appendChild(document.createTextNode(loggedUserData.firstName));
	displayLastname.appendChild(document.createTextNode(loggedUserData.lastName));
	displayPassword.appendChild(document.createTextNode(loggedUserData.password));
	displayProfileimg.setAttribute('src','./img/'+loggedUserData.userName+'-big.jpg');
	fieldFirstname.value = loggedUserData.firstName;
	fieldLastname.value = loggedUserData.lastName;
	fieldPassword.value = loggedUserData.password;

	quizzesTaken.appendChild(document.createTextNode(loggedUserData.quizAttempts));
	approvedQuizzes.appendChild(document.createTextNode(loggedUserData.approvedQuizzes));
	failedQuizzes.appendChild(document.createTextNode(loggedUserData.failedQuizzes));

	if( loggedUserData.highestScore.score != null ){
		highestScore.appendChild(document.createTextNode(loggedUserData.highestScore.score + " - " + loggedUserData.highestScore.quiz));
		lowestScore.appendChild(document.createTextNode(loggedUserData.lowestScore.score + " - " + loggedUserData.lowestScore.quiz));
	}else{
		highestScore.appendChild(document.createTextNode("You haven't taken any quiz."));
		lowestScore.appendChild(document.createTextNode("You haven't taken any quiz."));		
	}
}

const toggleShow = ( objoneshow, objtwoshow, objonehide, objtwohide ) => {
	objoneshow.style.display = 'inherit';
	objtwoshow.style.display = 'inherit';
	objonehide.style.display = 'none';
	objtwohide.style.display = 'none';
	
	if( objonehide.className == 'form-control'){
		objonehide.value = objoneshow.textContent;
	}
}

const updateUser = e => {
	e.preventDefault();
	let indexUser;
	const justUsers = users.slice(0);

	let childDisplayUsername = displayUsername.childNodes[0];
	let childDisplayFirstname = displayFirstname.childNodes[0];
	let childDisplayLastname = displayLastname.childNodes[0];
	let childDisplayPassword = displayPassword.childNodes[0];
	let childDisplayFirstLast = siskuProfileName.childNodes[0];

	justUsers.shift();

	for( indexUser = 0; indexUser < justUsers.length; indexUser++){
		if( justUsers[indexUser].userName == loggedUserData.userName){
			break;
		}
	}

	indexUser++;

	users[indexUser].firstName = fieldFirstname.value;
	users[indexUser].lastName = fieldLastname.value;
	users[indexUser].password = fieldPassword.value;

	localStorage.setItem('siskuUsers', JSON.stringify(users));

	displayUsername.removeChild(childDisplayUsername);
	displayFirstname.removeChild(childDisplayFirstname);
	displayLastname.removeChild(childDisplayLastname);
	displayPassword.removeChild(childDisplayPassword);
	siskuProfileName.removeChild(childDisplayFirstLast);

	displayProfileData();
	siskuProfileName.appendChild(document.createTextNode(fieldFirstname.value+" "+fieldLastname.value));

	justDisplay(displayFirstname,editFirstnameBtn,fieldFirstname,cancelFirstnameBtn);
	justDisplay(displayLastname,editLastnameBtn,fieldLastname,cancelLastnameBtn);
	justDisplay(displayPassword,editPasswordBtn,fieldPassword,cancelPasswordBtn);

}

const justDisplay = (objone, objtwo, objthree, objfour) => {
	if (objone.style.display == 'none'){
		objone.style.display = 'inherit';
		objtwo.style.display = 'inherit';
		objthree.style.display = 'none';
		objfour.style.display = 'none';
	}
}

displayProfileData();
editFirstnameBtn.addEventListener('click', function(){toggleShow( fieldFirstname, cancelFirstnameBtn, displayFirstname, editFirstnameBtn )});
cancelFirstnameBtn.addEventListener('click', function(){toggleShow( displayFirstname, editFirstnameBtn, fieldFirstname, cancelFirstnameBtn )});
editLastnameBtn.addEventListener('click', function(){toggleShow( fieldLastname, cancelLastnameBtn, displayLastname, editLastnameBtn )});
cancelLastnameBtn.addEventListener('click', function(){toggleShow( displayLastname, editLastnameBtn, fieldLastname, cancelLastnameBtn )});
editPasswordBtn.addEventListener('click', function(){toggleShow( fieldPassword, cancelPasswordBtn, displayPassword, editPasswordBtn )});
cancelPasswordBtn.addEventListener('click', function(){toggleShow( displayPassword, editPasswordBtn, fieldPassword, cancelPasswordBtn )});
formMyProfile.addEventListener('submit',updateUser);





