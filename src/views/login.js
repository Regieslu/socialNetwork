// boton de google
import { loginWithGoogle, loginUser } from '../firebase/auth.js';
import logo from './logo.png';

function login(navigateTo) {
  const section = document.createElement('section');
  section.classList.add('sectionLogin');
  const title = document.createElement('h2');
  title.id = 'titleLogin';
  const buttonReturn = document.createElement('button');
  buttonReturn.classList.add('buttonReturnLogin');
  const form = document.createElement('form');
  form.id = 'loginForm';
  form.classList.add('formLogin');
  const inputEmail = document.createElement('input');
  inputEmail.classList.add('inputEmailLogin');
  const inputPass = document.createElement('input');
  inputPass.classList.add('inputPasswordLogin');
  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('type', 'submit');
  const buttonGoogle = document.createElement('button');
  const divButtonsLogin = document.createElement('div');
  divButtonsLogin.classList.add('divs-buttons');

  inputEmail.placeholder = 'Write email';
  inputEmail.type = 'email';
  inputPass.placeholder = 'Password';
  inputPass.type = 'password';

  const divLogoLogin = document.createElement('div');
  divLogoLogin.classList.add('divLogoLogin');
  const logoLogin = document.createElement('img');
  logoLogin.classList.add('img1');
  logoLogin.src = logo;
  logoLogin.alt = 'logoLogin';
  logoLogin.classList.add('logoLogin');

  title.textContent = 'Login';
  buttonLogin.textContent = 'Login';
  buttonLogin.classList.add('button-login');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.value;
    const passwordValue = inputPass.value;
    loginUser(emailValue, passwordValue).then((firebaseUser) => {
      if (firebaseUser) {
        navigateTo('/feed');
      } else {
        navigateTo('/register');
      }
    })
      .catch(() => {
        navigateTo('/');
      });
  });
  buttonReturn.textContent = 'Return to home';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  buttonGoogle.textContent = '';
  buttonGoogle.classList.add('button-google');
  buttonGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const user = await loginWithGoogle();
    if (user !== undefined) {
      navigateTo('/feed');
    }
  });

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(logoLogin, title, form, buttonReturn, buttonGoogle);

  return section;
}

export default login;
