import { db } from "./firebase";
import { update, push, ref, DatabaseReference, onValue,remove, DataSnapshot } from "firebase/database";
import { Comment } from "./Comment";

let userName: string = sessionStorage.getItem('usrName');
let comments: Comment[] = [];

const carsCmnt: HTMLDivElement = document.querySelector('#cars-comments');
const commentBtn: HTMLButtonElement = document.querySelector('#comment-btn-cars');
const cars: HTMLTextAreaElement = document.querySelector('#cars');

commentBtn.addEventListener('click', (): void => {
    new Comment(userName, cars.value).sendToDb('cars')
    fetchCommentData('cars');
})

const fetchCommentData = (type: string) => {
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
        //Hämta alla html-element som har klassen comment.name
        //loopa igenom html-elementen INTE comments som är en array med objekt
        for (const comment of comments) {
            comment.displayComment('#cars-comments');
            if (userName === comment.name) {
                console.log(comment.name)
                let deletableComment =document.querySelectorAll(`.${comment.name}`);
                for(let i=0;i<deletableComment.length;i++){
                    document.querySelector(`.${comment.name}`).addEventListener('click',()=>{
                        console.log('ghj')
                    })
                                }
                //addEventListener("click", () => {
                    const deleteRef: DatabaseReference = ref(db, '/Comments/' + comment.id);
          remove(deleteRef);
               // })
                
            }
        }
    })
}

