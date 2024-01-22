import { Task } from "./Task.interface";

export interface ColumnDB {
  id?: string;
  color?: string;
  title?: string;
}

export interface Column {
  id?: number;
  title?: string;
  color?: string;
  tasks?: Task[];
}




