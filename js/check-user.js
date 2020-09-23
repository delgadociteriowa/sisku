const users = JSON.parse(localStorage.getItem( 'siskuUsers' ));
const siskuProfileName = document.getElementById('siskuProfileName');
const siskuProfileImage = document.getElementById('siskuProfileImage');
let loggedUserData = undefined;
const logOutBtn = document.getElementById('logOutSisku');

const checklogged = obj => {
	const loggedUserName = obj == undefined ? undefined : obj[0].loggedUser;
	if(loggedUserName != undefined){
		loggedUserData = obj.filter(function(user){return user.userName == loggedUserName;})[0];
	}else{
		window.location.replace("index.html");
	}
}

const logOut = (e,obj = users) => {
	e.preventDefault();
	let logOutObj = obj;
	logOutObj[0].loggedUser = undefined;
	localStorage.setItem('siskuUsers', JSON.stringify(logOutObj));
}

checklogged(users);
siskuProfileName.appendChild(document.createTextNode(loggedUserData.firstName+" "+loggedUserData.lastName));
siskuProfileImage.setAttribute('src','./img/'+loggedUserData.userName+'-thumb.jpg');
logOutBtn.addEventListener('click', logOut);
