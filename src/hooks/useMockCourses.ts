import { useState, useEffect } from 'react';
import { mockAPI, type Course } from '@/data/mockData';

export function useMockCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await mockAPI.getCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    try {
      const newCourse = await mockAPI.createCourse(courseData);
      setCourses(prev => [newCourse, ...prev]);
      return newCourse;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create course');
    }
  };

  const updateCourse = async (id: number, courseData: Partial<Course>) => {
    try {
      const updatedCourse = await mockAPI.updateCourse(id, courseData);
      setCourses(prev => prev.map(course => 
        course.id === id ? updatedCourse : course
      ));
      return updatedCourse;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update course');
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      await mockAPI.deleteCourse(id);
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete course');
    }
  };

  return {
    courses,
    isLoading,
    error,
    createCourse,
    updateCourse,
    deleteCourse,
    refetch: fetchCourses
  };
}