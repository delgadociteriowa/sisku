const setUsers = (users) => {
  if( !(localStorage.getItem( 'siskuUsers' ))){
    localStorage.setItem('siskuUsers', JSON.stringify(users));
  }
}

const setQuizzes = (quizzes) => {
  if( !(localStorage.getItem( 'siskuQuizzes' ))){
    localStorage.setItem('siskuQuizzes', JSON.stringify(quizzes));
  }
}

const setTakeQuiz = () => {
  if( !(localStorage.getItem( 'siskuTakeQuiz' )) || !(window.location.href.includes("take-quiz.html"))){
    localStorage.setItem('siskuTakeQuiz', undefined);
  }
}

const setUserAnswers = () => {
  if( 
    !(localStorage.getItem( 'siskuUserAnswers' )) ||
  	!(window.location.href.includes("end-quiz.html"))
    ){
      localStorage.setItem('siskuUserAnswers', undefined);
    }
}

setUsers(firstSiskuUsers);
setQuizzes(firstSiskuQuizzes);
setTakeQuiz();
setUserAnswers();