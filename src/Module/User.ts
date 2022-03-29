import { db } from "./firebase";
import { update, push, ref } from "firebase/database";

export class User {
  public status: string;
  constructor(
    public readonly userName: string,
    public readonly password: string,
    private readonly gender: string,
    private readonly bio: string,
    public readonly id: string
  ) { }
  public createProfileDiv(): void {
    const div = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.innerText = this.userName;
    let h5 = document.createElement('h5');
    h5.innerText = this.gender;
    let p = document.createElement('p');
    p.innerText = this.bio;
  }
  public sendToDb(): void {
    const userToAdd = {
      userName: this.userName,
      password: this.password,
      gender: this.gender,
      bio: this.bio
    }
    const dbRef = ref(db, '/Users');
    const newKey: string = push(dbRef).key;
    const newUser = {};
    newUser[newKey] = userToAdd;
    update(dbRef, newUser);
  }
}