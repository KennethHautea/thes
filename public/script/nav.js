const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    //account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `<div><h5>${doc.data().name}</h5></div> <div><h5>Logged in as ${user.email}</h5></div> <div><h5>Email Address Verified : ${user.emailVerified}</h5></div> `;
      accountDetails.innerHTML = html;
    })
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');    
  } else {
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};