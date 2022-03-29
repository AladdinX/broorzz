import { db } from "./firebase";
import { update, push, ref } from "firebase/database";

export class Comment {
  constructor(
    public readonly name: string,
    public readonly comment: string,
    public readonly id: void
  ) {

  }
  public clearDom(): void {
    (document.querySelector(`#${this.id}`) as HTMLHeadingElement).remove();
  }

  public display(): void {

  }
  public sendToDb(subject: string): void {
    const commentToAdd = {
      name: this.name,
      comment: this.comment,
    }
    const dbRef = ref(db, `/Comments/${subject}`);
    const newKey: string = push(dbRef).key;
    const newUser = {};
    newUser[newKey] = commentToAdd;
    update(dbRef, newUser);
  }
}