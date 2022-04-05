import { db } from "./firebase";

import { update, push, ref, onValue, remove } from "firebase/database";
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


function fetchCommentData(type: string) {
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
            comment.displayComment('#cars-comments');
        }

        //Hämta alla html-element som har klassen comment.name
        //loopa igenom html-elementen INTE comments som är en array med objekt
        let deletableComment = document.querySelectorAll(`#cars-comments h3`);
        for (let i = 0; i < deletableComment.length; i++) {
            if (userName === deletableComment[i].className) {

                deletableComment[i].addEventListener('click', (e) => {

                    const deleteRef = ref(db, '/Comments/' + deletableComment[i].className);
                    remove(deleteRef);
                    console.log('ei')
                })
            }
        }
    })
}

const musicdiv = document.getElementById('music-div')
const musik = document.getElementById('Musik')
musik.addEventListener('click', (): void => {


    musicdiv.style.display = 'block'
    carsdiv.style.display = 'none'
    fooddiv.style.display = 'none'
})

const carsdiv = document.getElementById('cars-div')
const car = document.getElementById('Car')
car.addEventListener('click', (): void => {
    carsdiv.style.display = 'block'
    musicdiv.style.display = 'none'
    fooddiv.style.display = 'none'
})

const fooddiv = document.getElementById('food-div')
const Food = document.getElementById('Food')
Food.addEventListener('click', (): void => {
    carsdiv.style.display = 'none'
    musicdiv.style.display = 'none'
    fooddiv.style.display = 'block'
})