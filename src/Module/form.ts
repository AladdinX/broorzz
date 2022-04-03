import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue, DataSnapshot } from "firebase/database";
import { Comment } from "./Comment";

let userName: string = sessionStorage.getItem('usrName');
let comments: Comment[] = [];

const carsCmnt: HTMLDivElement = document.querySelector('#cars-comments');
const commentBtn: HTMLButtonElement = document.querySelector('#comment-btn');
const cars: HTMLTextAreaElement = document.querySelector('#cars');

commentBtn.addEventListener('click', (): void => {
    new Comment(userName, cars.value).sendToDb('cars')
    fetchCommentData();
})

const fetchCommentData = () => {
    const dbRef = ref(db, '/Comments/cars')
    onValue(dbRef, (snapshot) => {
        const CommentData = snapshot.val();
        for (const comment of comments) {
            comment.clearDom();
        }
        comments = [];
        for (const key in CommentData) {
            comments.push(new Comment(
                CommentData[key].usrName,
                CommentData[key].comment
            ));
        }
        for (const comment of comments) {
            comment.displayComment('#cars-comments');
        }
    })
}