import { Injectable } from '@angular/core';
import { Book } from '../models/book.models';
import { Subject } from 'rxjs';
import Datasnapshot = firebase.database.DataSnapshot;
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];
  bookSubject = new Subject<Book[]>();
  constructor() {
    this.getBooks();
   }
  emitBooks() {
    this.bookSubject.next(this.books.slice());
  }
  saveBooks(){
      firebase.database().ref('books/').set(this.books);
  }
  getBooks() {
    firebase.database().ref('/books').on('value', 
    (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    }
    
    )
  }

  getSingleBook(id: number) {
      return new Promise(
        (resolve, reject) =>
        {
          firebase.database().ref('/books/'+id).once('value').then(
            (data: Datasnapshot)=> {
              return resolve(data.val())
            },
            (error) => {
              reject(error)
            }
          )
        }
        );
  }
  addBook(book: Book){
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
    
  }

  deleteBook(book: Book){
    const indexBook = this.books.findIndex((bookObject) => bookObject === book);
    this.books.splice(indexBook, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
                                .child('images/'+almostUniqueFileName+file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                   () => {
                     console.log('Chargement...')
                   },
                   (error) => {
                     console.log('Erreur de chargement '+ error)
                   },
                   () => {
                     resolve(upload.snapshot.ref.getDownloadURL())
                   }
                   )                        
      }
    );
  }
}
