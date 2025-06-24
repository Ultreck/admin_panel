// Mock data for the pharmacy course management system
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
}

export interface Course {
  id: number;
  semester: string;
  subjectName: string;
  description: string;
  fileUrl: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export const mockUser: User = {
  id: '1',
  email: 'admin@pharmacy.edu',
  firstName: 'Dr. Sarah',
  lastName: 'Johnson',
  profileImageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face'
};

export const mockCourses: Course[] = [
  {
    id: 1,
    semester: '1',
    subjectName: 'Pharmaceutical Chemistry I',
    description: 'Introduction to pharmaceutical chemistry, covering basic organic chemistry principles and drug design fundamentals.',
    fileUrl: 'https://example.com/pharm-chem-1.pdf',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    createdBy: '1'
  },
  {
    id: 2,
    semester: '2',
    subjectName: 'Pharmacology I',
    description: 'Basic principles of pharmacology, drug-receptor interactions, and pharmacokinetics.',
    fileUrl: 'https://example.com/pharmacology-1.pdf',
    status: 'active',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-25T16:45:00Z',
    createdBy: '1'
  },
  {
    id: 3,
    semester: '3',
    subjectName: 'Clinical Pharmacy I',
    description: 'Introduction to clinical pharmacy practice, patient care, and pharmaceutical care concepts.',
    fileUrl: 'https://example.com/clinical-pharmacy-1.pdf',
    status: 'active',
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-30T13:10:00Z',
    createdBy: '1'
  },
  {
    id: 4,
    semester: '4',
    subjectName: 'Pharmaceutical Microbiology',
    description: 'Study of microorganisms relevant to pharmacy, including antimicrobial agents and sterile pharmaceutical products.',
    fileUrl: 'https://example.com/microbiology.pdf',
    status: 'active',
    createdAt: '2024-01-08T08:30:00Z',
    updatedAt: '2024-01-28T15:20:00Z',
    createdBy: '1'
  },
  {
    id: 5,
    semester: '5',
    subjectName: 'Pharmaceutical Technology',
    description: 'Advanced pharmaceutical formulation and manufacturing processes, quality control, and regulatory affairs.',
    fileUrl: 'https://example.com/pharm-tech.pdf',
    status: 'draft',
    createdAt: '2024-02-01T12:00:00Z',
    updatedAt: '2024-02-05T10:30:00Z',
    createdBy: '1'
  },
  {
    id: 6,
    semester: '6',
    subjectName: 'Pharmacoeconomics',
    description: 'Economic evaluation of pharmaceutical products and healthcare interventions.',
    fileUrl: 'https://example.com/pharmacoeconomics.pdf',
    status: 'active',
    createdAt: '2024-01-12T14:45:00Z',
    updatedAt: '2024-02-02T09:15:00Z',
    createdBy: '1'
  },
  {
    id: 7,
    semester: '7',
    subjectName: 'Advanced Clinical Pharmacy',
    description: 'Advanced clinical pharmacy practice, therapeutic drug monitoring, and specialized patient populations.',
    fileUrl: 'https://example.com/advanced-clinical.pdf',
    status: 'active',
    createdAt: '2024-01-18T13:30:00Z',
    updatedAt: '2024-02-08T11:45:00Z',
    createdBy: '1'
  },
  {
    id: 8,
    semester: '8',
    subjectName: 'Pharmacy Management',
    description: 'Pharmacy administration, business management, and healthcare leadership principles.',
    fileUrl: 'https://example.com/pharmacy-management.pdf',
    status: 'active',
    createdAt: '2024-01-22T10:15:00Z',
    updatedAt: '2024-02-10T14:20:00Z',
    createdBy: '1'
  }
];

// Mock API delay simulation
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
  async getUser(): Promise<User> {
    await delay(500);
    return mockUser;
  },

  async getCourses(): Promise<Course[]> {
    await delay(800);
    return [...mockCourses];
  },

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<Course> {
    await delay(1000);
    const newCourse: Course = {
      ...courseData,
      id: Math.max(...mockCourses.map(c => c.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: mockUser.id
    };
    mockCourses.push(newCourse);
    return newCourse;
  },

  async updateCourse(id: number, courseData: Partial<Course>): Promise<Course> {
    await delay(800);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Course not found');
    
    mockCourses[index] = {
      ...mockCourses[index],
      ...courseData,
      updatedAt: new Date().toISOString()
    };
    return mockCourses[index];
  },

  async deleteCourse(id: number): Promise<void> {
    await delay(600);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Course not found');
    mockCourses.splice(index, 1);
  }
};