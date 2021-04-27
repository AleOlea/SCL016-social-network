// DOM
import { addPost } from './views.js/addPost.js';
import { home } from './views.js/home.js';
import { loginForm } from './views.js/login.js';
import { profile } from './views.js/profile.js';
import { initForm } from './data/auth.js';
import { setCurrentUser } from './data/currentUser.js';
import { aboutUsContainer } from './views.js/view-about-us.js';

// import { aboutUs } from './views/aboutUs.js';

const content = document.getElementById('root');
// If the user is trying to enter to route login
if (window.location.pathname === '/login') {
/* To clean fields */

  content.innerHTML = '';
  content.appendChild(loginForm());
  initForm();
// If the user is not trying to enter to route login
} else {
  // We need to know if the user did login
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
      // User is signed in.
      // Creating app routes
      switch (window.location.pathname) {
        case '/home':
          content.appendChild(home());
          break;
        case '/profile':
          content.appendChild(profile());
          break;
        case '/addPost':
          content.appendChild(addPost());
          break;
        case '/aboutUs':
          content.appendChild(aboutUsContainer());
          break;
        default:
          content.appendChild(profile());
      }
    } else {
      // No user is signed in or user loged out.
      window.location.replace('/login');
    }
  });
}
