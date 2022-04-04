import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue } from "firebase/database";

export class User {
  public status: string = 'Hello im using Broorz'
  public readonly id: string;
  constructor(
    public readonly userName: string,
    public readonly password: string,
    private readonly gender: string,
    private readonly emogi:string,
    private readonly bio: string,
  ) {


  }
  //change this somehow or have clean function
  public createProfileDiv(divId: string) {
    const div: HTMLDivElement = document.createElement('div');
    let h3: HTMLHeadingElement = document.createElement('h3');
    let h5: HTMLHeadElement = document.createElement('h5');
    let p: HTMLParagraphElement = document.createElement('p');
    let img:HTMLImageElement=document.createElement('img')

    h3.innerText = this.userName;
    h5.innerText = this.gender;
    p.innerText = this.bio;
    img.src=this.emogi;
    console.log(this.emogi)
    div.append(h3, h5, p,img);
    document.querySelector(`${divId}`).append(div)
  }

  public sendToDb(): void {
    const userToAdd = {
      userName: this.userName,
      password: this.password,
      gender: this.gender,
      bio: this.bio,
      img:this.emogi
    }
    const dbRef: DatabaseReference = ref(db, '/Users');
    const newKey: string = this.userName;
    const newUser = {};
    newUser[newKey] = userToAdd;
    update(dbRef, newUser);
  }
  public setStatus(): void {
    let statusPrompt = prompt("How do you feel today?");
    const statusRef = ref(db, `/Users/${this.userName}/status`)
    const newKey: string = push(statusRef).key
    const statusToAdd = { status: statusPrompt.valueOf() }
    const newStatus = {};
    newStatus[newKey] = statusToAdd;
    update(statusRef, newStatus);
  }
  public getStatus(divId: string): void {
    const statusRef = ref(db, `/Users/${this.userName}/status`);
    onValue(statusRef, (snapshot) => {
      const statusData = snapshot.val();
      for (const key in statusData) {
        console.log(statusData[key].status)
        let h5 = document.createElement('h5');
        h5.innerText = statusData[key].status;
        document.querySelector(`${divId}`).append(h5);
      }
    })
  }
}