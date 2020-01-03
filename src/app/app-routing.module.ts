import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SingleBookComponent } from './book-list/single-book/single-book.component';

const routes: Routes = [
  {path: 'auth/sign-up', component: SignupComponent},
  {path: 'auth/sign-in', component: SigninComponent},
  {path: 'books',canActivate: [AuthGuardService] , component: BookListComponent},
  {path: 'books/view/:id',canActivate: [AuthGuardService] , component: SingleBookComponent},
  {path: 'books/new',canActivate: [AuthGuardService] ,component: BookFormComponent},
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: '**', redirectTo: 'books'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }