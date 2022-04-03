import { db } from "./firebase";
import { update, push, ref, DatabaseReference } from "firebase/database";

export class Comment {
  public readonly id: string
  constructor(
    public readonly name: string,
    public readonly comment: string,
  ) {
  }
  public clearDom(): void {
    (document.querySelector(`#${this.id}`) as HTMLHeadingElement).remove();
  }
  public displayComment(divId: string): void {
    const h3: HTMLHeadingElement = document.createElement('h3');
    h3.id = this.id;
    h3.innerText = `${this.name}-::: ${this.comment}`;
    document.querySelector(`${divId}`).append(h3);
  }
  public sendToDb(subject: string): void {
    const commentToAdd = {
      usrName: this.name,
      comment: this.comment,
    }
    const dbRef: DatabaseReference = ref(db, `/Comments/${subject}`);
    const newKey: string = push(dbRef).key;
    const newUser = {};
    newUser[newKey] = commentToAdd;
    update(dbRef, newUser);
  }
}
