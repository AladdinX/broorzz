import { db } from "./firebase";
import { ref, onValue, remove, DatabaseReference, push } from "firebase/database";
import { Comment } from "./Comment";

let userName: string = sessionStorage.getItem('usrName');
let comments: Comment[] = [];

const carsBtn: HTMLButtonElement = document.querySelector('#comment-btn-cars');
const cars: HTMLTextAreaElement = document.querySelector('#cars');
const musicBtn: HTMLButtonElement = document.querySelector('#comment-btn-music');
const music: HTMLTextAreaElement = document.querySelector('#music');
const foodBtn: HTMLButtonElement = document.querySelector('#comment-btn-food');
const food: HTMLTextAreaElement = document.querySelector('#food');
const musicDiv = document.getElementById('music-div') as HTMLDivElement;
const musik = document.getElementById('Musik') as HTMLButtonElement;
const carsDiv = document.getElementById('cars-div') as HTMLDivElement;
const car = document.getElementById('Car') as HTMLButtonElement;
const foodDiv = document.getElementById('food-div') as HTMLDivElement;
const Food = document.getElementById('Food') as HTMLButtonElement;

//Different comment button
carsBtn.addEventListener('click', (): void => {
    const carRef: DatabaseReference = ref(db, `/Comments/cars`);
    const newKey: string = push(carRef).key;
    new Comment(userName, cars.value, newKey).sendToDb('cars', newKey, carRef)
    fetchCommentData('cars');
})
musicBtn.addEventListener('click', (): void => {
    const musicRef: DatabaseReference = ref(db, `/Comments/music`);
    const newKey: string = push(musicRef).key;
    new Comment(userName, music.value, newKey).sendToDb('cars', newKey, musicRef);
    fetchCommentData('music');
})
foodBtn.addEventListener('click', (): void => {
    const foodRef: DatabaseReference = ref(db, `/Comments/food`);
    const newKey: string = push(foodRef).key;
    new Comment(userName, food.value, newKey).sendToDb('cars', newKey, foodRef);
    fetchCommentData('food');
})

//Styling
musik.addEventListener('click', (): void => {
    fetchCommentData('music');
    musicDiv.style.display = 'block'
    carsDiv.style.display = 'none'
    foodDiv.style.display = 'none'
})
car.addEventListener('click', (): void => {
    fetchCommentData('cars');
    carsDiv.style.display = 'block'
    musicDiv.style.display = 'none'
    foodDiv.style.display = 'none'
})
Food.addEventListener('click', (): void => {
    fetchCommentData('food');
    carsDiv.style.display = 'none'
    musicDiv.style.display = 'none'
    foodDiv.style.display = 'block'
})

//Users can delete there old comments  
function deleteComment(subject: string, id: string) {
    const commentH3: HTMLHeadingElement = document.querySelector(`#${id}`);
    commentH3.style.color = 'wheat';
    commentH3.addEventListener('click', () => {
        const deleteRef: DatabaseReference = ref(db, '/Comments/' + '/' + subject + '/' + id);
        remove(deleteRef);
    })
}
//Fetch data to diffreint subject 'Music-Food-Cars'
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