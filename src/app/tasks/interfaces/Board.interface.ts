import { User } from "src/app/users/interfaces/User.interface";

export interface Board {
  id:    number;
  title: string;
  color: string;
  tasks:  Task[];
}

export interface Task {
  id:   number;
  text: string;
  desc: string;
  manager: User;
}
