import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth
  ) { }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string): Promise<UserCredential>  {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
