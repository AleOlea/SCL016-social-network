import { navBar } from '../components/nav-bar.js';
import { userData } from '../components/user-data.js';
// import { editOptions } from '../components/edit-delete.js';
import { postProfile } from '../components/post-profile.js';


export const profile = () => {
  const profileEl = document.createElement('div');
  profileEl.id = 'pro';
  profileEl.appendChild(navBar());
  profileEl.appendChild(userData());
  // profileEl.appendChild(editOptions());
  profileEl.appendChild(postProfile());

  return profileEl;
};
