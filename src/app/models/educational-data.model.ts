export interface EducationalData {
  id: string;
  schoolName: string;
  educationLevel: string;  // elementary, middle, high
  schoolType: string;      // public, private, religious
  gender: string;          // male, female
  numberOfStudents: number;
  numberOfTeachers: number;
  address?: string;
  foundationYear?: number;
}