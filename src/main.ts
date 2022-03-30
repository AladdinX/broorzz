import { User } from "./Module/User";
import { ref, onValue, update, remove, push, get, child, getDatabase, DataSnapshot, } from "firebase/database";
import { db } from "./Module/firebase";

//signIn
const usrNameLogin: HTMLInputElement = document.querySelector('#user-name-login');
const usrPassLogin: HTMLInputElement = document.querySelector('#user-password-login');
document.getElementById("login-btn").addEventListener("click", (e: Event) => {
  // console.log(usrNameLogin);
  e.preventDefault();
  const dbRef = ref(db);
  get(child(dbRef, `/Users/`)).then((snapshot) => {
    for (let usr in snapshot.val()) {
      if (snapshot.val()[usr].userName == usrNameLogin.value) {
        if (snapshot.val()[usr].password == usrPassLogin.value) {
          console.log('yay')
        }
      }
    }
    // if (usrNameLogin.value == "" || usrPassLogin.value == "")
    //   console.log("fill in everything");
    // else if (usrPassLogin.value == snapshot.val().password) {
    //   console.log('same')
    // } else if (usrPassLogin.value != snapshot.val().password) {
    //   console.log("wrong password");
    // } else if (snapshot.exists()) {
    //   console.log(snapshot.val(), "is a user");
    // } else {
    //   console.log("This user does not exist");
    // }
  });
});
