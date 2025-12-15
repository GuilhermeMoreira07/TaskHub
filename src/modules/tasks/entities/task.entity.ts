export type Task = {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  createdAt: Date;
};