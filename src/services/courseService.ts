import { db } from "../firebase/config";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";

// Define the Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  // Add other fields as needed
}
export interface CourseData {
  semester: string;
  subjectName: string;
  description: string;
  fileUrl: string;
  createdBy: string;
  status: string;
};

export const getCoursesByUser = async (uid: string) => {
  const q = query(collection(db, "courses"), where("createdBy", "==", uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createCourse = async (data: CourseData) => {
  try {
    const docRef = await addDoc(collection(db, "courses"), {
      ...data,
      createdAt: Timestamp.now(),
    });
    console.log("✅ Course created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error adding course:", error);
    throw error;
  }
};

export const updateCourse = async (id: string, updates: Partial<Course>) => {
  await updateDoc(doc(db, "courses", id), updates);
};

export const deleteCourse = async (id: string) => {
  await deleteDoc(doc(db, "courses", id));
};