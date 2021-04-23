import { aboutUs } from '../components/about-us.js';
import { navBar } from '../components/nav-bar.js';

export const aboutUsContainer = () => {
  const divAboutUS = document.createElement('div');
  divAboutUS.appendChild(navBar());
  divAboutUS.appendChild(aboutUs());

  return divAboutUS;
};
