import { User } from "./Module/User";
import { ref, onValue, update, remove, push, get, child, getDatabase, DataSnapshot } from "firebase/database";
import { db } from "./Module/firebase";
const loginBox: HTMLDivElement = document.querySelector('.login-box')
const threadContainer: HTMLDivElement = document.querySelector('#thread-container')


//signIn
const usrNameLogin: HTMLInputElement = document.querySelector('#user-name-login');
const usrPassLogin: HTMLInputElement = document.querySelector('#user-password-login');
document.getElementById("login-btn").addEventListener("click", (e: Event) => {
  e.preventDefault();
  const usersRef = ref(db, `/Users/`);
  onValue(usersRef, (snapshot) => {
    let userExist: boolean = false;
    for (let usr in snapshot.val()) {
      if (snapshot.val()[usr].userName == usrNameLogin.value) {
        userExist = true;
        if (snapshot.val()[usr].password == usrPassLogin.value) {
          sessionStorage.setItem('usrName', usrNameLogin.value);
          location.replace("thread.html");
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

