const myQuizzes = document.getElementById('siskuMyQuizzes');
let allQUizzes =  JSON.parse(localStorage.getItem( 'siskuQuizzes' ));
let loggedUserQuizzes = allQUizzes.filter((obj) => {return obj.authorUsername == loggedUserData.userName;});

const displayMyQuizzes = (items) => {
  items.forEach((item) => {
    
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdCategory = document.createElement('td');
    const tdCreatedOn = document.createElement('td');
    const tdLastModification = document.createElement('td');
    const tdStatus = document.createElement('td');
    const tdEditDelete = document.createElement('td');
    const aEditQuiz = document.createElement('a');
    const iEditQuiz = document.createElement('i');
    const iDeleteQuiz = document.createElement('i');

    tr.id = 'quizNumber'+item.id;
    tr.className = 'odd';
    tdEditDelete.className = 'editDelete';
    iEditQuiz.className = 'fas fa-edit';
    iDeleteQuiz.className = 'fas fa-trash-alt deleteQuiz';
    iDeleteQuiz.id = item.id;
    aEditQuiz.setAttribute('href','edit-quiz.html#'+item.id);
    iEditQuiz.setAttribute('title','Edit Quiz');
    iDeleteQuiz.setAttribute('title','Delete Quiz');

    aEditQuiz.appendChild(iEditQuiz);

    tdName.appendChild(document.createTextNode(item.name));
    tdCategory.appendChild(document.createTextNode(item.category));
    tdStatus.appendChild(document.createTextNode(item.status));
    tdCreatedOn.appendChild(document.createTextNode(item.createdOn));
    tdLastModification.appendChild(document.createTextNode(item.lastModification));
    tdEditDelete.appendChild(aEditQuiz);
    tdEditDelete.appendChild(iDeleteQuiz);

    tr.appendChild(tdName);
    tr.appendChild(tdCategory);
    tr.appendChild(tdCreatedOn);
    tr.appendChild(tdLastModification);
    tr.appendChild(tdStatus);
    tr.appendChild(tdEditDelete);

    myQuizzes.appendChild(tr);
    
  });
}

const deleteQuiz = e => {
  if(e.target.classList.contains('deleteQuiz')){
    let indexQuiz;
    if(confirm('Are You Sure?')){ //cambiar confirm por modal
        for( indexQuiz = 0; indexQuiz < allQUizzes.length; indexQuiz++){
            if( allQUizzes[indexQuiz].id == e.target.id){
                break;
            }
        }
        allQUizzes.splice(indexQuiz, 1);
        localStorage.setItem('siskuQuizzes', JSON.stringify(allQUizzes));
        loggedUserQuizzes = allQUizzes.filter((obj) => {return obj.authorUsername == loggedUserData.userName;});
        myQuizzes.innerHTML = '';
        displayMyQuizzes(loggedUserQuizzes);
    }
  }
}

const hideTableElements = () => {
    if( loggedUserQuizzes.length < 11){
        document.getElementById('dataTable_length').style.display = 'none';
        document.getElementById('dataTable_filter').style.display = 'none';
        document.getElementById('dataTable_info').style.display = 'none';
        document.getElementById('dataTable_paginate').style.display = 'none';
    }
}

displayMyQuizzes(loggedUserQuizzes);
myQuizzes.addEventListener('click', deleteQuiz);
setTimeout( hideTableElements, 100 );