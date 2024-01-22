import { User } from "./User.interface";

export interface TaskDB {
  id:        string;
  text:      string;
  desc:      string;
  user_id:   string;
  column_id: string;
}

export interface Task {
  id?:   number;
  text?: string;
  desc?: string;
  manager?: User;
}
