import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue, remove, DataSnapshot } from "firebase/database";
import { Comment } from "./Comment";

let userName: string = sessionStorage.getItem('usrName');
let comments: Comment[] = [];

const carsCmnt: HTMLDivElement = document.querySelector('#cars-comments');
const commentBtn: HTMLButtonElement = document.querySelector('#comment-btn-cars');
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

        //Hämta alla html-element som har klassen comment.name
        //loopa igenom html-elementen INTE comments som är en array med objekt
        let deletableComment =document.querySelectorAll(`#cars-comments h3` );
        for(let i=0;i<deletableComment.length;i++){ 
            if (userName === deletableComment[i].className){
               
            deletableComment[i].addEventListener('click',(e)=>{
                
                const deleteRef: DatabaseReference = ref(db, '/Comments/' + deletableComment[i].className );
                 remove(deleteRef);
                 
                      
                console.log('ei')
             })
        }}
    })
}