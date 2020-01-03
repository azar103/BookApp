import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyBcOR3nm_ADPE0-8IkGOfG8C3PvCRctXYY",
      authDomain: "bookshelves-f8e19.firebaseapp.com",
      databaseURL: "https://bookshelves-f8e19.firebaseio.com",
      projectId: "bookshelves-f8e19",
      storageBucket: "bookshelves-f8e19.appspot.com",
      messagingSenderId: "242917953530",
      appId: "1:242917953530:web:b3fa427956418d29305e43"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
