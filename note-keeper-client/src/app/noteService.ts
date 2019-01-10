import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
//import { Router } from "@angular/router";
import {Note} from "./note";
import { environment } from "../environments/environment";
import { stringify } from "@angular/compiler/src/util";


const BACKEND_URL = environment.apiUrl + "/notes/";

@Injectable({ providedIn: "root" })
export class NotesService {
  private notes: Note[] = [];
  private notesUpdated = new Subject<Note[]>();

  constructor(private http: HttpClient) {}

//   getPosts(postsPerPage: number, currentPage: number) {
//     const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
//     this.http
//       .get<{ message: string; posts: any; maxPosts: number }>(
//         BACKEND_URL + queryParams
//       )
//       .pipe(
//         map(postData => {
//           return {
//             posts: postData.posts.map(post => {
//               return {
//                 title: post.title,
//                 content: post.content,
//                 id: post._id,
//                 imagePath: post.imagePath,
//                 creator: post.creator
//               };
//             }),
//             maxPosts: postData.maxPosts
//           };
//         })
//       )
//       .subscribe(transformedPostData => {
//         this.posts = transformedPostData.posts;
//         this.postsUpdated.next({
//           posts: [...this.posts],
//           postCount: transformedPostData.maxPosts
//         });
//       });
//   }

//   getPostUpdateListener() {
//     return this.postsUpdated.asObservable();
//   }

  getAllNotes() 
  {
   


    // return this.http.get<{
    //   _id: string;
    //   title: string;
    //   content: string;
    //   imagePath: string;
    //   creator: string;
    // }>(BACKEND_URL + id);
  }

  getNotes() {
    
    this.http
      .get<{ message: string; notes: any; maxPosts: number }>(
        BACKEND_URL
      )
      .pipe(
        map(noteData => {
          return {
            notes: noteData.notes.map(note => {
              return {
                Balance: note.Balance,
                MP: note.MP,
                Id: note._id,
                Interest: note.Interest,

              };
            }),
           // maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedNoteData => {
        
        this.notes = transformedNoteData.notes;
        this.notesUpdated.next([...this.notes]);
      
        });
      
  }

  getNotesFirstPage() {
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    this.http
      .get<{ message: string; notes: any; maxPosts: number }>(
        environment.apiUrl + "/allnotes/"
      )
      .pipe(
        map(noteData => {
          return {
            notes: noteData.notes.map(note => {
              return {
                Balance: note.Balance,
                MP: note.MP,
                Id: note._id,
                Interest: note.Interest,

              };
            }),
           // maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedNoteData => {
        
        this.notes = transformedNoteData.notes;
        this.notesUpdated.next([...this.notes]);
      
        });
      
  }



  addNote(note:Note) {

   
    console.log(note.Balance);
    
    this.http
      .post<{ message: string; note : Note}>(
        BACKEND_URL,
        note
      )
      .subscribe(responseData => {
        console.log(responseData.message);
        this.notesUpdated.next([...this.notes]);
      
      });

      
  }


  getNotesUpdateListener()
  {
    return this.notesUpdated.asObservable();
  }

  updateNote(note:Note)
  {
    const noteToUpdate: Note ={Id:note.Id,Balance:note.Balance,MP:note.MP,Interest:note.Interest}

    this.http.put(
      BACKEND_URL + noteToUpdate.Id,
      noteToUpdate)
      .subscribe(response => console.log(response));

    // this.http.put(
    //   BACKEND_URL+note.Id,{}
      
    // );

    console.log("YYYYYY:" + BACKEND_URL + noteToUpdate.Id);
    console.log("XXXXXX:" + note.Balance);
    


  }
  //

//   updatePost(id: string, title: string, content: string, image: File | string) {
//     let postData: Note | FormData;
//     if (typeof image === "object") {
//       postData = new FormData();
//       postData.append("id", id);
//       postData.append("title", title);
//       postData.append("content", content);
//       postData.append("image", image, title);
//     } else {
//       postData = {
//         id: id,
//         title: title,
//         content: content,
//         imagePath: image,
//         creator: null
//       };
//     }
//     this.http
//       .put(BACKEND_URL + id, postData)
//       .subscribe(response => {
//         this.router.navigate(["/"]);
//       });
//   }

  deletePost(note:Note) {
    console.log("*******..BACKEND_URL + note.Id:" + BACKEND_URL + note.Id);
    this.http.delete(BACKEND_URL + note.Id).subscribe(()=>{console.log("deleted***")});
  }
}
