import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.models';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  book: Book;
  constructor(private bookService: BookService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    )
  }

  onBack(){
    this.router.navigate(['/books']);
  }

}
