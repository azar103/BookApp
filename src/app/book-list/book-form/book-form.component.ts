import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookformGroup: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(private bookService: BookService, private bookformBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookformGroup = this.bookformBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    })
  }
  onAddBook() {
    const title = this.bookformGroup.get('title').value;
    const author = this.bookformGroup.get('author').value;
    const synopsis = this.bookformGroup.get('synopsis').value;
    const book = new Book(title, author);
    book.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl != ''){
      book.photo = this.fileUrl;
    }
    this.bookService.addBook(book);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
}

}
