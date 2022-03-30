import { db } from "./firebase";
import { update, push, ref, DatabaseReference } from "firebase/database";

export class User {
  public status: string;
  public readonly id: string;
  constructor(
    public readonly userName: string,
    public readonly password: string,
    private readonly gender: string,
    private readonly bio: string,
  ) {


  }
  public createProfileDiv(container: HTMLDivElement): void {
    const div: HTMLDivElement = document.createElement('div');
    let h3: HTMLHeadingElement = document.createElement('h3');
    let h5: HTMLHeadElement = document.createElement('h5');
    let p: HTMLParagraphElement = document.createElement('p');

    h3.innerText = this.userName;
    h5.innerText = this.gender;
    p.innerText = this.bio;
    div.append(h3, h5, p);
    document.querySelector(`${container}`).append(div)
  }

  public sendToDb(): void {
    const userToAdd = {
      userName: this.userName,
      password: this.password,
      gender: this.gender,
      bio: this.bio
    }
    const dbRef: DatabaseReference = ref(db, '/Users');
    const newKey: string = this.userName;
    const newUser = {};
    newUser[newKey] = userToAdd;
    update(dbRef, newUser);
  }
}