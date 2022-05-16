import { update, push, ref, DatabaseReference } from "firebase/database";

// Comment Class
export class Comment {
  constructor(
    public readonly name: string,
    public readonly comment: string,
    public readonly id: string
  ) { }
  public clearDom(): void {
    (document.querySelector(`#${this.id}`) as HTMLHeadingElement).remove();
  }
  //display comment method , it take one parameter which is the div that we will append things till
  public displayComment(divId: string): void {
    const h3: HTMLHeadingElement = document.createElement('h3');
    h3.className = this.name;
    h3.id = this.id;
    h3.innerText = `${this.name}: ${this.comment}`;
    h3.style.color='black'
    document.querySelector(`${divId}`).append(h3);
  }
  //Send the comment to DB, parameters are many so it will work when we send the comment to different subjects
  public sendToDb(subject: string, newKey: string, dbRef: DatabaseReference): void {
    const commentToAdd = {
      usrName: this.name,
      comment: this.comment,
    }
    const newUser = {};
    newUser[newKey] = commentToAdd;
    update(dbRef, newUser);
  }
}