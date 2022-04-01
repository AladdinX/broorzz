import { User } from "./Module/User";
import { ref, onValue, update, remove, push, get, child, getDatabase, DataSnapshot, } from "firebase/database";
import { db } from "./Module/firebase";

//signIn
const usrNameLogin: HTMLInputElement = document.querySelector('#user-name-login');
const usrPassLogin: HTMLInputElement = document.querySelector('#user-password-login');
document.getElementById("login-btn").addEventListener("click", (e: Event) => {
  e.preventDefault();
  const dbRef = ref(db);
  get(child(dbRef, `/Users/`)).then((snapshot) => {
    for (let usr in snapshot.val()) {
      if (snapshot.val()[usr].userName == usrNameLogin.value) {
        if (snapshot.val()[usr].password == usrPassLogin.value) {
          console.log('yay');
        }
        else if (snapshot.val()[usr].password != usrPassLogin.value) {
          alert('Wrong Password');
        }
      }
      // Alaa: i couldn't find way to make else that work right now when i try it so it always end up with the error massege
      //else alert('user not found!') 
    }
  });
});
