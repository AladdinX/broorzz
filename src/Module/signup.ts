import { User } from "./User";
import { db } from "./firebase";
import { ref, onValue, update, remove, push, get, child, getDatabase, DataSnapshot, } from "firebase/database";


// SignUp
const newUsrBtn: HTMLButtonElement = document.querySelector('#new-user-button');
const newUsrName: HTMLInputElement = document.querySelector('#user-name');
const newPass: HTMLInputElement = document.querySelector('#new-password')
const userEmoji: HTMLImageElement = document.createElement('img');
const EmojiSelector: HTMLSelectElement = document.querySelector('#EmojiSelector');
userEmoji.src = EmojiSelector.value;
const hantoosh: string = (userEmoji.src)
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
      new User(newUsrName.value, newPass.value, (document.querySelector('#gender') as HTMLSelectElement).value,(document.querySelector('#EmojiSelector') as HTMLSelectElement).value , (document.querySelector('#bio') as HTMLTextAreaElement).value).sendToDb();
      alert('User successfully signed up')
      setInterval(() => location.replace('index.html'), 2000)
    }
    else {
      alert('user exist')
    }
  })
})



