import { db } from "../firebase/config";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

// Define the Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  // Add other fields as needed
}

export const getCourses = async (userId: string) => {
  const q = query(
    collection(db, "courses"),
    where("createdBy", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createCourse = async (course: Omit<Course, 'id'>) => {
  return await addDoc(collection(db, "courses"), course);
};

export const updateCourse = async (id: string, updates: Partial<Course>) => {
  await updateDoc(doc(db, "courses", id), updates);
};

export const deleteCourse = async (id: string) => {
  await deleteDoc(doc(db, "courses", id));
};