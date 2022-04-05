import { User } from "./User";
import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue, DataSnapshot } from "firebase/database";

const usrName = sessionStorage.getItem('usrName');
let myUser: User;
let allUsers: User[] = [];
const dbRef = ref(db, '/Users')
onValue(dbRef, (snapshot) => {
  const profileData = snapshot.val();
  for (const key in profileData) {
    allUsers.push(new User
      (profileData[key].userName,
        profileData[key].password,
        profileData[key].gender,
        profileData[key].img,
        profileData[key].bio));

    if (usrName == key) {
      myUser = new User(
        profileData[key].userName,
        profileData[key].password,
        profileData[key].gender,
        profileData[key].img,
        profileData[key].bio);
      myUser.createProfileDiv('#main-div');
    }
  }
  for (const user of allUsers) {
    let h3: HTMLHeadingElement = document.createElement('h3');
    h3.innerText = user.userName;
    h3.id = user.userName;
    document.querySelector('#profiles-aside').append(h3)
    document.querySelector(`#${user.userName}`).addEventListener('click', () => {
      user.createProfileDiv('#main-div')
    })
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


