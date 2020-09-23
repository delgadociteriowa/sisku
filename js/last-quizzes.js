const lastQuizzes = document.getElementById('siskuLastQuizzes');
const quizzes = JSON.parse(localStorage.getItem( 'siskuQuizzes' ));
const publishedQuizzes = quizzes.filter((obj) => {return obj.status == 'published';});

const displayQuizzes = (items) => {

  items.forEach((item) => {

    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdCategory = document.createElement('td');
    const tdAuthor = document.createElement('td');
    const tdLastTry = document.createElement('td');
    const tdStartQuiz = document.createElement('td');
    const aStartQuiz = document.createElement('a');
    const lastTry = loggedUserData.quizzesTaken.filter((obj) => {return obj.id == item.id;});

    tr.id = 'quizNumber'+item.id;
    tr.className = 'odd';
    tdStartQuiz.className = 'startButton';
    aStartQuiz.className = 'btn btn-primary';
    aStartQuiz.setAttribute('href','start-quiz.html#'+item.id);

    tdName.appendChild(document.createTextNode(item.name));
    tdCategory.appendChild(document.createTextNode(item.category));
    tdAuthor.appendChild(document.createTextNode(item.author));

    if(lastTry.length > 0){
        tdLastTry.appendChild(document.createTextNode(lastTry[0].lastTry));
    }else{
        tdLastTry.appendChild(document.createTextNode("You haven't taken this quiz yet."));
    }
    
    aStartQuiz.appendChild(document.createTextNode('START QUIZ'));
    tdStartQuiz.appendChild(aStartQuiz);

    tr.appendChild(tdName);
    tr.appendChild(tdCategory);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdLastTry);
    tr.appendChild(tdStartQuiz);

    lastQuizzes.appendChild(tr);
    
  });

}

const hideTableElements = () => {
    if( quizzes.length < 11){
        document.getElementById('dataTable_length').style.display = 'none';
        document.getElementById('dataTable_filter').style.display = 'none';
        document.getElementById('dataTable_info').style.display = 'none';
        document.getElementById('dataTable_paginate').style.display = 'none';
    }
}

displayQuizzes(publishedQuizzes);
setTimeout( hideTableElements, 100 );
