import { User } from "./User";
import { db } from "./firebase";
import { ref, onValue, update, remove, push, get, child, getDatabase, DataSnapshot, } from "firebase/database";


// SignUp
const newUsrBtn: HTMLButtonElement = document.querySelector('#new-user-button');
const newUsrName: HTMLInputElement = document.querySelector('#user-name');
const newPass: HTMLInputElement = document.querySelector('#new-password')
const userEmogi:HTMLImageElement=document.createElement('img')
const emogiSelector:HTMLSelectElement=document.querySelector('#emogiSelector')
userEmogi.src=emogiSelector.value;
const hantoosh:string=(userEmogi.src)
newUsrBtn.addEventListener('click', (e: Event) => {
  e.preventDefault();
  const dbRef = ref(db);
  get(child(dbRef, `/Users/`)).then((snapshot) => {
    let userExist: boolean = false;
    for (let usr in snapshot.val()) {
      if (snapshot.val()[usr].userName == newUsrName.value) {
        userExist = true;
      }
    }
    if (!userExist) {
      new User(newUsrName.value, newPass.value, (document.querySelector('#gender') as HTMLSelectElement).value, (hantoosh),(document.querySelector('#bio') as HTMLTextAreaElement).value).sendToDb();
      alert('User successfully signed up')
      setInterval(()=>location.replace('thread.html'), 2000)
    }
    else {
      alert('user exist')
    }
  })
})



