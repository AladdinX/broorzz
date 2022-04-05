import { User } from "./User";
import { db } from "./firebase";
import { remove, update, push, ref, DatabaseReference, onValue, DataSnapshot } from "firebase/database";

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
      myUser.getStatus('#old-status');
      const divDeleter: HTMLButtonElement = document.querySelector('#divDeleter')
      divDeleter.addEventListener('click', function (e) {
        const userDeletor: DatabaseReference = ref(db, '/Users/' + myUser.userName);
        remove(userDeletor)
        sessionStorage.clear();
        location.replace("index.html");
      })
    }
  }
  for (const user of allUsers) {
    let h3: HTMLHeadingElement = document.createElement('h3');
    h3.innerText = user.userName;
    h3.id = user.userName;
    document.querySelector('#profiles-aside').append(h3)
    document.querySelector(`#${user.userName}`).addEventListener('click', () => {

      user.createProfileDiv('#main-div')
      user.getStatus('#old-status');
      if (usrName != user.userName) {
        (document.querySelector('#divDeleter') as HTMLButtonElement).style.display = 'none';
        (document.querySelector('#sign-out') as HTMLButtonElement).style.display = 'none';
        (document.querySelector('#new-status') as HTMLButtonElement).style.display = 'none';
      }
    })
  }
})

document.querySelector('#new-status').addEventListener('click', () => {
  document.querySelector('#old-status').innerHTML = ''
  myUser.setStatus();
  myUser.getStatus('#old-status');
})
document.querySelector('#sign-out').addEventListener('click', () => {
  sessionStorage.clear();
  location.replace("index.html");
})


