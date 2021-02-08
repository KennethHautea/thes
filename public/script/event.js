
function lnk(doc){
  const url = document.getElementById('url');
  let URLinput = document.createElement('input')
  URLinput.setAttribute ('type','text', 'id','selectedURL','placeholder', doc.data().eventname);
  url.appendChild(URLinput);
};
auth.onAuthStateChanged((user) => {
  if(user) {
   
  } else {
    window.location = 'index.html'
  }
});