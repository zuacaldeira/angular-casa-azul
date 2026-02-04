import { Routes } from '@angular/router';
import { ChildList } from './components/child-list/child-list';
import { ChildEnrollment } from './components/child-enrollment/child-enrollment';
import { GroupDashboard } from './components/group-dashboard/group-dashboard';
import { AttendanceTracker } from './components/attendance-tracker/attendance-tracker';
import { ScheduleView } from './components/schedule-view/schedule-view';
import { MessageInbox } from './components/message-inbox/message-inbox';
import { ParentPortal } from './components/parent-portal/parent-portal';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: ChildList },
  { path: 'children', component: ChildList },
  { path: 'enroll', component: ChildEnrollment, canActivate: [authGuard] },
  { path: 'groups', component: GroupDashboard },
  { path: 'attendance', component: AttendanceTracker, canActivate: [authGuard] },
  { path: 'schedule/:groupId', component: ScheduleView },
  { path: 'messages', component: MessageInbox, canActivate: [authGuard] },
  { path: 'portal', component: ParentPortal, canActivate: [authGuard] },
];
