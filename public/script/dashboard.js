//read event list
auth.onAuthStateChanged((user) => {
  if(user) {
    db.collection('event').where("userId","==", user.uid).onSnapshot(function(snapshot){
      eventList.innerHTML = '';
      snapshot.forEach((doc) =>{
        renderEvent(doc);
        
      })
    })
  } else {
    window.location = 'index.html'
  }
});

//add event
btncreateevent.addEventListener('click', e =>{
  e.preventDefault();
  const eventName = document.getElementById('eventname').value
  const eventVenue = document.getElementById('eventvenue').value
  const eventDate = document.getElementById('eventdate').value
  const eventTime = document.getElementById('eventtime').value
  const eventAttire = document.getElementById('eventattire').value
    var user =auth.currentUser;
  db.collection('event').add({
    userId: user.uid,
    eventname: eventName,
    eventvenue: eventVenue,
    eventdate: eventDate,
    eventtime: eventTime,
    eventattire: eventAttire
  }).then((docRef) => {
//    localStorage.setItem("dbID",docRef.id);
//    window.location.href = "event.html";
    $('#createmodal').modal('hide');
    document.getElementById('create-form').reset();
    
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(errorCode);
  });
});

const eventList = document.getElementById('eventlist');
// render event list
function renderEvent(doc){
  const eventList = document.getElementById('eventlist');
  let div1 = document.createElement('div');
  div1.className = 'col-6 justify-content-center docu';
  let div2 = document.createElement('div');
  div2.className = 'card';
  let div3 = document.createElement('div');
  div3.className = 'card-body';
  let h3 = document.createElement('h3');
  h3.className = 'card-title';
  let p1 = document.createElement('h5');
  p1.className = 'card-text';
  let p2 = document.createElement('h5');
  p2.className = 'card-text';

  let create = document.createElement('BUTTON');
  create.className = 'btn btn-primary rsvp createbtn';
  create.setAttribute ('data-id',doc.id);
  create.setAttribute('style', 'margin-right: 10px;')
  create.onclick = function createweb(elem){
    console.log(elem.dataset.id)
  }

  let rsvp = document.createElement('BUTTON');
  rsvp.className = 'btn btn-info rsvp';
  rsvp.setAttribute ('id','rsvpbtn');
  rsvp.setAttribute ('data-id',doc.id);
  rsvp.setAttribute('style', 'margin-right: 10px;')

  let update = document.createElement('BUTTON');
  update.className = 'btn btn-warning update';
  update.setAttribute ('id','updatebtn');
  update.setAttribute ('data-id',doc.id);
  update.setAttribute('style', 'margin-right: 10px;')

  let del = document.createElement('BUTTON');
  del.className = 'btn btn-danger update';
  del.setAttribute ('id','delbtn');
  del.setAttribute ('data-id',doc.id);



  div1.setAttribute('data-id', doc.id);
  h3.textContent = doc.data().eventname;
  p1.textContent = doc.data().eventvenue;
  p2.textContent = doc.data().eventdate;
  create.textContent = "Create Invitation"
  rsvp.textContent = "Manage RSVP";
  update.textContent = "Update Event";
  del.textContent = "Delete Event"

  div3.appendChild(h3);
  div3.appendChild(p1);
  div3.appendChild(p2);
  div3.appendChild(create)
  div3.appendChild(rsvp);
  div3.appendChild(update);
  div3.appendChild(del);

  div2.appendChild(div3);
  div1.appendChild(div2);
  eventList.appendChild(div1);

  
  
}


//create web



