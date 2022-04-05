import { db } from "./firebase";
import { ref, onValue, remove, DatabaseReference, push } from "firebase/database";
import { Comment } from "./Comment";

let userName: string = sessionStorage.getItem('usrName');
let comments: Comment[] = [];

const carsBtn: HTMLButtonElement = document.querySelector('#comment-btn-cars');
const cars: HTMLTextAreaElement = document.querySelector('#cars');

carsBtn.addEventListener('click', (): void => {
    const carRef: DatabaseReference = ref(db, `/Comments/cars`);
    const newKey: string = push(carRef).key;
    new Comment(userName, cars.value, newKey).sendToDb('cars', newKey, carRef)
    fetchCommentData('cars');
})

const musicBtn: HTMLButtonElement = document.querySelector('#comment-btn-music');
const music: HTMLTextAreaElement = document.querySelector('#music');

musicBtn.addEventListener('click', (): void => {
    const musicRef: DatabaseReference = ref(db, `/Comments/music`);
    const newKey: string = push(musicRef).key;
    new Comment(userName, music.value, newKey).sendToDb('cars', newKey, musicRef);
    fetchCommentData('music');
})

const foodBtn: HTMLButtonElement = document.querySelector('#comment-btn-food');
const food: HTMLTextAreaElement = document.querySelector('#food');

foodBtn.addEventListener('click', (): void => {
    const foodRef: DatabaseReference = ref(db, `/Comments/food`);
    const newKey: string = push(foodRef).key;
    new Comment(userName, food.value, newKey).sendToDb('cars', newKey, foodRef);
    fetchCommentData('food');
})


function fetchCommentData(type: string) {
    const dbRef = ref(db, `/Comments/${type}`);
    onValue(dbRef, (snapshot) => {
        const CommentData = snapshot.val();
        for (const comment of comments) {
            comment.clearDom();
        }
        comments = [];
        for (const key in CommentData) {
            comments.push(new Comment(
                CommentData[key].usrName,
                CommentData[key].comment,
                key
            ));
        }
        for (const comment of comments) {
            comment.displayComment(`#${type}-comments`);
            if (comment.name == userName) { deleteComment(type, comment.id); }
        }
    })
}

const musicdiv = document.getElementById('music-div')
const musik = document.getElementById('Musik')
musik.addEventListener('click', (): void => {
    fetchCommentData('music');
    musicdiv.style.display = 'block'
    carsdiv.style.display = 'none'
    fooddiv.style.display = 'none'
})

const carsdiv = document.getElementById('cars-div')
const car = document.getElementById('Car')
car.addEventListener('click', (): void => {
    fetchCommentData('cars');
    carsdiv.style.display = 'block'
    musicdiv.style.display = 'none'
    fooddiv.style.display = 'none'
})

const fooddiv = document.getElementById('food-div')
const Food = document.getElementById('Food')
Food.addEventListener('click', (): void => {
    fetchCommentData('food');
    carsdiv.style.display = 'none'
    musicdiv.style.display = 'none'
    fooddiv.style.display = 'block'
})



function deleteComment(subject: string, id: string) {
    const commentH3: HTMLHeadingElement = document.querySelector(`#${id}`);
    commentH3.style.color = 'white';
    commentH3.addEventListener('click', () => {
        const deleteRef: DatabaseReference = ref(db, '/Comments/' + '/' + subject + '/' + id);
        remove(deleteRef);
    })
}