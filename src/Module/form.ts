import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue, DataSnapshot } from "firebase/database";
import { Comment } from "./Comment";
let comments:Comment[] = [];

const commentbtn: HTMLButtonElement = document.querySelector('#comment-btn');

commentbtn.addEventListener('click', (event: Event):void =>{
    event.preventDefault();    
    // const usrNameLogin:HTMLInputElement= document.querySelector('#username input') ;
    const cars :HTMLTextAreaElement= document.querySelector('#cars');
    const musik = document.querySelector('#musik');
    const mat = document.querySelector('#mat');
    new Comment('shayan', cars.value).sendToDb('cars')
    fetchCommentData();
})

const fetchCommentData = () => {
    const dbRef = ref(db,'/Comments/cars')
    onValue(dbRef, (snapshot) => {
        const CommentData = snapshot.val();
        console.log(CommentData);
        // for(const comment of comments){
        //     comment.clearDom();
        // }
        comments = [];

        for(const key in CommentData) {
            comments.push(new Comment(
                CommentData[key].name,
                CommentData[key].comment
            ));
        }
        console.log(comments);

       function display():void{
           const cars = document.querySelector('#cars');
           const div = document.querySelector('div');
           div.append(cars);
            div.innerText = '';
       }

    })
}