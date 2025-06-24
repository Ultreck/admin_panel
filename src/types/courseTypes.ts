export interface Course {
  id?: string;
  title: string;
  description: string;
  semester: number;
  subjects: Subject[];
  createdAt: Date;
  createdBy: string;
}

export interface Subject {
  name: string;
//   content: Block[];
}