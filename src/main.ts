import { User } from "./Module/User";
import { ref, onValue, update, remove, push, get, child, getDatabase, DataSnapshot } from "firebase/database";
import { db } from "./Module/firebase";
const loginbox: HTMLDivElement = document.querySelector('.login-box')
const threadcontainer: HTMLDivElement = document.querySelector('#thread-container')


//signIn
const usrNameLogin: HTMLInputElement = document.querySelector('#user-name-login');
const usrPassLogin: HTMLInputElement = document.querySelector('#user-password-login');
document.getElementById("login-btn").addEventListener("click", (e: Event) => {
  e.preventDefault();
  const dbRef = ref(db);
  get(child(dbRef, `/Users/`)).then((snapshot) => {
    let userExist: boolean = false;
    for (let usr in snapshot.val()) {
      if (snapshot.val()[usr].userName == usrNameLogin.value) {
        userExist = true;
        if (snapshot.val()[usr].password == usrPassLogin.value) {
          console.log('yay');
          loginbox.style.display = 'none'
          threadcontainer.style.display = 'block'
        }
        else if (snapshot.val()[usr].password != usrPassLogin.value) {
          alert('Wrong Password');
        }
      }
    }
    if (!userExist) {
      alert('user is not found')
    }
  });
});
