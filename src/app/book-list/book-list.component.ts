import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  bookSubscription: Subscription;
  constructor(private bookService: BookService,private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    )
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  onViewBook(id: number){
    this.router.navigate(['/books','view',id]);
  }
  onNewBook(){
    this.router.navigate(['/books', 'new']);
  }
  removeBook(book: Book){
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimé')
        },
        (error)=> {
          console.log('could not remove photo !'+ error)
        }
      )
    }
     this.bookService.deleteBook(book);
  }
 
  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

}
