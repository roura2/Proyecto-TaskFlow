import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$(): Observable<any | undefined> {
    return new Observable<any | undefined>(subscriber => {
      const unsubscribe = this.auth.onAuthStateChanged({
        next: user => subscriber.next(user),
        error: error => subscriber.error(error),
        complete: () => subscriber.complete()
      });

      // Devolvemos una función para cancelar la suscripción cuando sea necesario
      return () => unsubscribe();
    });
  }

  constructor(
    private auth: Auth
  ) { }

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string): Promise<UserCredential>  {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }
}
