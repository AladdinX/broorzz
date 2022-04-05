import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue, DataSnapshot } from "firebase/database";
import { Comment } from "./Comment";

let userName: string = sessionStorage.getItem('usrName');
let comments: Comment[] = [];

const carsCmnt: HTMLDivElement = document.querySelector('#cars-comments');
const carsBtn: HTMLButtonElement = document.querySelector('#comment-btn-cars');
const cars: HTMLTextAreaElement = document.querySelector('#cars');

carsBtn.addEventListener('click', (): void => {
    new Comment(userName, cars.value).sendToDb('cars')
    fetchCommentData('cars');
})



const musicCmnt: HTMLDivElement = document.querySelector('#music-comments');
const musicBtn: HTMLButtonElement = document.querySelector('#comment-btn-music');
const music: HTMLTextAreaElement = document.querySelector('#music');

musicBtn.addEventListener('click', (): void => {
    new Comment(userName, music.value).sendToDb('music')
    fetchCommentData('music');
})

 const foodCmnt: HTMLDivElement = document.querySelector('#food-comments');
 const foodBtn: HTMLButtonElement = document.querySelector('#comment-btn-food');
 const food: HTMLTextAreaElement = document.querySelector('#food');

 foodBtn.addEventListener('click', (): void => {
         new Comment(userName, food.value).sendToDb('food')
  fetchCommentData('food');
})










function fetchCommentData (type: string){
    const dbRef = ref(db, `/Comments/${type}`)
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
            comment.displayComment(`#${type}-comments`);
            if (userName === comment.name) {
                console.log(comment)
                document.querySelector(`.${comment.name}`).addEventListener("click", () => {
                    console.log('jjjj');
                })
            }
        }

    })
}