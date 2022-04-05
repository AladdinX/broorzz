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


const musicdiv = document.getElementById('music-div')
const musik = document.getElementById('Musik')
musik.addEventListener('click', (): void => {
    console.log('kas')

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
            comment.displayComment(`#${type}-comments`);
            if (userName === comment.name) {
                console.log(comment.name)
                let deletableComment = document.querySelectorAll(`.${comment.name}`);
                for (let i = 0; i < deletableComment.length; i++) {
                    document.querySelector(`.${comment.name}`).addEventListener('click', () => {
                        console.log('ghj')
                    })
                }
            }
        }
    })
}