export type Language = 'de' | 'pt' | 'fr';

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  languages: Language[];
  primaryLanguage: Language;
  groupId: string;
  parentIds: string[];
  allergies: string[];
  medicalNotes?: string;
  enrollmentDate: Date;
  active: boolean;
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredLanguage: Language;
  childIds: string[];
  address: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  languages: Language[];
  groupIds: string[];
  role: 'lead' | 'assistant' | 'substitute';
}

export interface Group {
  id: string;
  name: string;
  language: Language;
  ageRange: { min: number; max: number };
  capacity: number;
  teacherIds: string[];
  childIds: string[];
}

export interface AttendanceRecord {
  id: string;
  childId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'sick' | 'vacation';
  notes?: string;
}

export interface DailySchedule {
  id: string;
  groupId: string;
  date: Date;
  activities: ScheduleActivity[];
}

export interface ScheduleActivity {
  time: string;
  language: Language;
  description: string;
  durationMinutes: number;
}

export interface Message {
  id: string;
  senderId: string;
  recipientIds: string[];
  subject: string;
  body: string;
  language: Language;
  createdAt: Date;
  read: boolean;
}

export interface EnrollmentRequest {
  childFirstName: string;
  childLastName: string;
  dateOfBirth: Date;
  preferredLanguages: Language[];
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  allergies: string[];
  medicalNotes?: string;
}
