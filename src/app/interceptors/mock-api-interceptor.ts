import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { Child, Group, AttendanceRecord, DailySchedule, Message, Teacher } from '../models/kindergarten.model';

const MOCK_CHILDREN: Child[] = [
  {
    id: '1', firstName: 'Lena', lastName: 'Schneider', dateOfBirth: new Date('2021-03-15'),
    languages: ['de', 'pt'], primaryLanguage: 'de', groupId: '1', parentIds: ['p1'],
    allergies: [], enrollmentDate: new Date('2024-09-01'), active: true,
  },
  {
    id: '2', firstName: 'Miguel', lastName: 'Santos', dateOfBirth: new Date('2020-07-22'),
    languages: ['pt', 'fr'], primaryLanguage: 'pt', groupId: '1', parentIds: ['p2'],
    allergies: ['peanuts'], enrollmentDate: new Date('2024-09-01'), active: true,
  },
  {
    id: '3', firstName: 'Sophie', lastName: 'Dupont', dateOfBirth: new Date('2021-11-05'),
    languages: ['fr', 'de'], primaryLanguage: 'fr', groupId: '2', parentIds: ['p3'],
    allergies: [], enrollmentDate: new Date('2025-01-15'), active: true,
  },
  {
    id: '4', firstName: 'Jonas', lastName: 'M\u00fcller', dateOfBirth: new Date('2020-01-30'),
    languages: ['de'], primaryLanguage: 'de', groupId: '2', parentIds: ['p4'],
    allergies: ['dairy'], medicalNotes: 'Lactose intolerant', enrollmentDate: new Date('2023-09-01'), active: true,
  },
  {
    id: '5', firstName: 'Clara', lastName: 'Ferreira', dateOfBirth: new Date('2022-06-10'),
    languages: ['pt', 'de'], primaryLanguage: 'pt', groupId: '3', parentIds: ['p5'],
    allergies: [], enrollmentDate: new Date('2025-09-01'), active: true,
  },
  {
    id: '6', firstName: '\u00c9milie', lastName: 'Martin', dateOfBirth: new Date('2021-09-20'),
    languages: ['fr'], primaryLanguage: 'fr', groupId: '3', parentIds: ['p6'],
    allergies: ['gluten'], enrollmentDate: new Date('2024-09-01'), active: true,
  },
  {
    id: '7', firstName: 'Lucas', lastName: 'Weber', dateOfBirth: new Date('2022-02-14'),
    languages: ['de', 'fr'], primaryLanguage: 'de', groupId: '1', parentIds: ['p7'],
    allergies: [], enrollmentDate: new Date('2025-09-01'), active: true,
  },
  {
    id: '8', firstName: 'Matilda', lastName: 'Costa', dateOfBirth: new Date('2020-12-01'),
    languages: ['pt', 'fr', 'de'], primaryLanguage: 'pt', groupId: '2', parentIds: ['p8'],
    allergies: [], enrollmentDate: new Date('2023-09-01'), active: true,
  },
];

const MOCK_GROUPS: Group[] = [
  {
    id: '1', name: 'Sonnenblumen', language: 'de',
    ageRange: { min: 2, max: 4 }, capacity: 12,
    teacherIds: ['t1', 't2'], childIds: ['1', '2', '7'],
  },
  {
    id: '2', name: 'Estrelas', language: 'pt',
    ageRange: { min: 3, max: 5 }, capacity: 10,
    teacherIds: ['t3', 't4'], childIds: ['3', '4', '8'],
  },
  {
    id: '3', name: 'Papillons', language: 'fr',
    ageRange: { min: 2, max: 4 }, capacity: 10,
    teacherIds: ['t5', 't6'], childIds: ['5', '6'],
  },
];

const today = new Date();
const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', childId: '1', date: today, checkIn: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 15), status: 'present' },
  { id: 'a2', childId: '2', date: today, checkIn: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 30), status: 'present' },
  { id: 'a3', childId: '3', date: today, status: 'sick' },
  { id: 'a4', childId: '4', date: today, checkIn: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0), status: 'present' },
  { id: 'a5', childId: '7', date: today, status: 'absent' },
  { id: 'a6', childId: '8', date: today, checkIn: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0), status: 'present' },
];

const MOCK_SCHEDULE: DailySchedule = {
  id: 's1', groupId: '1', date: today,
  activities: [
    { time: '08:30', language: 'de', description: 'Morgenkreis (Morning circle)', durationMinutes: 30 },
    { time: '09:00', language: 'pt', description: 'Hist\u00f3rias e cantigas (Stories & songs)', durationMinutes: 45 },
    { time: '09:45', language: 'de', description: 'Freispiel (Free play)', durationMinutes: 45 },
    { time: '10:30', language: 'fr', description: 'Arts plastiques (Arts & crafts)', durationMinutes: 40 },
    { time: '11:10', language: 'de', description: 'Mittagessen (Lunch)', durationMinutes: 30 },
    { time: '11:40', language: 'pt', description: 'Hora da sesta (Nap time)', durationMinutes: 60 },
    { time: '12:40', language: 'fr', description: 'Jeux en plein air (Outdoor play)', durationMinutes: 45 },
    { time: '13:25', language: 'de', description: 'Basteln (Crafting)', durationMinutes: 35 },
    { time: '14:00', language: 'fr', description: 'Chantons ensemble (Singing together)', durationMinutes: 30 },
    { time: '14:30', language: 'pt', description: 'Despedida (Goodbye circle)', durationMinutes: 20 },
  ],
};

const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1', senderId: 't1', recipientIds: ['p1', 'p2', 'p7'], subject: 'Elternabend n\u00e4chste Woche',
    body: 'Liebe Eltern, wir laden Sie herzlich zum Elternabend am Donnerstag um 19:00 Uhr ein. Wir freuen uns auf Ihr Kommen!',
    language: 'de', createdAt: new Date(Date.now() - 86400000), read: false,
  },
  {
    id: 'm2', senderId: 't3', recipientIds: ['p2', 'p5', 'p8'], subject: 'Festa de S\u00e3o Jo\u00e3o',
    body: 'Caros pais, a nossa festa de S\u00e3o Jo\u00e3o ser\u00e1 no dia 24 de junho. As crian\u00e7as est\u00e3o a preparar uma surpresa especial!',
    language: 'pt', createdAt: new Date(Date.now() - 172800000), read: true,
  },
  {
    id: 'm3', senderId: 't5', recipientIds: ['p3', 'p6'], subject: 'Sortie au parc',
    body: 'Chers parents, nous organisons une sortie au parc vendredi prochain. Merci de pr\u00e9voir des v\u00eatements confortables pour les enfants.',
    language: 'fr', createdAt: new Date(Date.now() - 3600000), read: false,
  },
  {
    id: 'm4', senderId: 't1', recipientIds: ['p1'], subject: 'Lenas Fortschritt',
    body: 'Lena macht tolle Fortschritte beim Portugiesisch lernen. Sie spricht bereits einfache S\u00e4tze mit ihren Freunden!',
    language: 'de', createdAt: new Date(Date.now() - 259200000), read: true,
  },
];

function matchUrl(url: string, pattern: string): boolean {
  const regex = new RegExp(`^${pattern.replace(/:[^/]+/g, '[^/]+')}(\\?.*)?$`);
  return regex.test(url);
}

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;

  // Children
  if (url === '/api/children' && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_CHILDREN })).pipe(delay(300));
  }

  if (matchUrl(url, '/api/children/group/:groupId') && req.method === 'GET') {
    const groupId = url.split('/').pop()!;
    const children = MOCK_CHILDREN.filter((c) => c.groupId === groupId);
    return of(new HttpResponse({ status: 200, body: children })).pipe(delay(200));
  }

  if (matchUrl(url, '/api/children/:id') && req.method === 'GET') {
    const id = url.split('/').pop()!;
    const child = MOCK_CHILDREN.find((c) => c.id === id);
    if (child) {
      return of(new HttpResponse({ status: 200, body: child })).pipe(delay(200));
    }
    return of(new HttpResponse({ status: 404, body: { error: 'Child not found' } }));
  }

  if (url === '/api/children/enroll' && req.method === 'POST') {
    const newChild: Child = {
      id: String(MOCK_CHILDREN.length + 1),
      ...(req.body as Partial<Child>),
      groupId: '',
      parentIds: [],
      enrollmentDate: new Date(),
      active: true,
    } as Child;
    MOCK_CHILDREN.push(newChild);
    return of(new HttpResponse({ status: 201, body: newChild })).pipe(delay(500));
  }

  // Groups
  if (url === '/api/groups' && req.method === 'GET') {
    const language = req.params.get('language');
    const groups = language ? MOCK_GROUPS.filter((g) => g.language === language) : MOCK_GROUPS;
    return of(new HttpResponse({ status: 200, body: groups })).pipe(delay(300));
  }

  if (matchUrl(url, '/api/groups/:id') && req.method === 'GET') {
    const id = url.split('/').pop()!;
    const group = MOCK_GROUPS.find((g) => g.id === id);
    if (group) {
      return of(new HttpResponse({ status: 200, body: group })).pipe(delay(200));
    }
    return of(new HttpResponse({ status: 404, body: { error: 'Group not found' } }));
  }

  // Attendance
  if (matchUrl(url, '/api/attendance/group/:groupId') && req.method === 'GET') {
    const parts = url.split('/');
    const groupId = parts[parts.length - 1].split('?')[0];
    const groupChildIds = MOCK_GROUPS.find((g) => g.id === groupId)?.childIds ?? [];
    const records = MOCK_ATTENDANCE.filter((r) => groupChildIds.includes(r.childId));
    return of(new HttpResponse({ status: 200, body: records })).pipe(delay(300));
  }

  if (url === '/api/attendance' && req.method === 'POST') {
    const record: AttendanceRecord = {
      id: `a${MOCK_ATTENDANCE.length + 1}`,
      ...(req.body as Partial<AttendanceRecord>),
    } as AttendanceRecord;
    MOCK_ATTENDANCE.push(record);
    return of(new HttpResponse({ status: 201, body: record })).pipe(delay(200));
  }

  // Schedule
  if (matchUrl(url, '/api/schedules/group/:groupId') && !url.includes('/week') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: { ...MOCK_SCHEDULE, groupId: url.split('/')[4] } })).pipe(delay(300));
  }

  // Messages
  if (matchUrl(url, '/api/messages/user/:userId') && req.method === 'GET') {
    return of(new HttpResponse({ status: 200, body: MOCK_MESSAGES })).pipe(delay(300));
  }

  if (matchUrl(url, '/api/messages/:id/read') && req.method === 'PUT') {
    const id = url.split('/')[3];
    const msg = MOCK_MESSAGES.find((m) => m.id === id);
    if (msg) {
      msg.read = true;
      return of(new HttpResponse({ status: 200, body: msg })).pipe(delay(200));
    }
  }

  // Auth - demo login
  if (url === '/api/auth/login' && req.method === 'POST') {
    const teacher: Teacher & { type: string } = {
      type: 'teacher',
      id: 't1', firstName: 'Anna', lastName: 'Bauer',
      email: 'anna@casaazul.de', languages: ['de', 'pt', 'fr'],
      groupIds: ['1'], role: 'lead',
    };
    return of(new HttpResponse({ status: 200, body: teacher })).pipe(delay(500));
  }

  return next(req);
};
