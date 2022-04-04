import { User } from "./User";
import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue, DataSnapshot } from "firebase/database";

const usrName = sessionStorage.getItem('usrName');
let myUser: User;
const dbRef = ref(db, '/Users')
onValue(dbRef, (snapshot) => {
  const profileData = snapshot.val();
  for (const key in profileData) {
    if (usrName == key) {
      myUser = new User(
        profileData[key].userName,
        profileData[key].password,
        profileData[key].gender,
        profileData[key].emogi,
        profileData[key].bio);
      myUser.createProfileDiv('#profile-container');
    }
  }
})

document.querySelector('#new-status').addEventListener('click', () => {
  myUser.setStatus();
  myUser.getStatus('#old-status');
})
document.querySelector('#sign-up').addEventListener('click', () => {
  sessionStorage.clear();
  location.replace("index.html");
})
