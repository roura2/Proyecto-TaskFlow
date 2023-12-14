import { User } from "src/app/users/interfaces/User.interface";

export interface Column {
  id:    number;
  title: string;
  color: string;
  tasks:  Task[];
}

export interface Task {
  id:   number;
  text: string;
  desc: string; // TODO: implementar descripcio quan es crei una taska
  manager: User;
}


