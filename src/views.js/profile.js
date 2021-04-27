import { navBar } from '../components/nav-bar.js';
import { userData } from '../components/user-data.js';
import { postProfile } from '../components/post-profile.js';

export const profile = () => {
  const profileEl = document.createElement('div');
  profileEl.id = 'pro';
  profileEl.appendChild(navBar());
  const myPostTitleEl = document.createElement('h1');
  myPostTitleEl.id = 'myPost-El';
  myPostTitleEl.textContent = 'Mis Posts';
  profileEl.appendChild(myPostTitleEl);
  profileEl.appendChild(userData());
  // profileEl.appendChild(editOptions());
  profileEl.appendChild(postProfile());

  return profileEl;
};
