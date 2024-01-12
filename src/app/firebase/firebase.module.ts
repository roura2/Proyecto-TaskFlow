import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FirebaseModule {

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAA8UKDh7dxy384fZZvPaxhhDT_7VAlyzs",
      authDomain: "taskflow-93f56.firebaseapp.com",
      projectId: "taskflow-93f56",
      storageBucket: "taskflow-93f56.appspot.com",
      messagingSenderId: "246703639957",
      appId: "1:246703639957:web:76272678de822f7b3b3a9c",
      measurementId: "G-LFF6S4PCW8"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
