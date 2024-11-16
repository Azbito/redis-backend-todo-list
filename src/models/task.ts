export interface Task {
  uuid?: string;
  title: string;
  description: string;
  authorId: string;
  created_at?: string;
  updated_at?: string;
  status?: number;
}
