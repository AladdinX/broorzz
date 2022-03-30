import { User } from "./User";
// SignUp
const newUsrBtn: HTMLButtonElement = document.querySelector('#new-user-button');
const newUsrName: HTMLInputElement = document.querySelector('#user-name');
const newPass: HTMLInputElement = document.querySelector('#new-password')
newUsrBtn.addEventListener('click', (e: Event) => {
  e.preventDefault();
  new User(newUsrName.value, newPass.value, (document.querySelector('#gender') as HTMLSelectElement).value, (document.querySelector('#bio') as HTMLTextAreaElement).value).sendToDb();
})