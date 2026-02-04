# Test Coverage Analysis - Casa Azul Kindergarten

Casa Azul is a multilingual (German, Portuguese, French) kindergarten management application.

## Executive Summary

The project has **very low test coverage**: **6.71% statement coverage** and **3.71% line coverage** across all source files. Only 5 spec files exist with 6 total test cases, and every existing test is a bare-minimum "should create" smoke test that verifies nothing beyond instantiation.

**19 out of 24 source files have zero test coverage.**

---

## Current Coverage Report

| Category | Stmts | Branch | Funcs | Lines | Uncovered |
|----------|-------|--------|-------|-------|-----------|
| **All files** | **6.71%** | **21.05%** | **2.98%** | **3.71%** | |
| app (root component) | 75% | 91.66% | 100% | 50% | |
| components/language-badge | 100% | 85.71% | 100% | 100% | |
| components/attendance-tracker | **0%** | **0%** | **0%** | **0%** | Lines 13-88 |
| components/child-enrollment | **0%** | **0%** | **0%** | **0%** | Lines 15-81 |
| components/child-list | **0%** | **0%** | **0%** | **0%** | Lines 13-57 |
| components/group-dashboard | **0%** | **0%** | **0%** | **0%** | Lines 13-54 |
| components/header | **0%** | 100% | **0%** | **0%** | Lines 14-39 |
| components/message-inbox | **0%** | **0%** | **0%** | **0%** | Lines 13-58 |
| components/parent-portal | **0%** | **0%** | **0%** | **0%** | Lines 15-49 |
| components/schedule-view | **0%** | **0%** | **0%** | **0%** | Lines 12-58 |
| guards/auth-guard | **0%** | **0%** | **0%** | **0%** | Lines 5-14 |
| interceptors/auth-interceptor | **0%** | **0%** | **0%** | **0%** | Lines 5-18 |
| pipes/age-pipe | 10.52% | 10.71% | **0%** | 5.88% | Lines 8-36 |
| pipes/language-label-pipe | **0%** | **0%** | **0%** | **0%** | Lines 7-18 |
| services/attendance | **0%** | **0%** | **0%** | **0%** | Lines 9-78 |
| services/auth | 31.81% | 45.45% | **0%** | 21.05% | Lines 17-57 |
| services/child | **0%** | **0%** | **0%** | **0%** | Lines 9-93 |
| services/group | **0%** | **0%** | **0%** | **0%** | Lines 9-48 |
| services/message | **0%** | **0%** | **0%** | **0%** | Lines 9-46 |
| services/notification | 25% | 100% | **0%** | 13.33% | Lines 11-36 |
| services/schedule | **0%** | **0%** | **0%** | **0%** | Lines 9-100 |

---

## Inventory of Existing Tests

### Files WITH spec files (5 files, 6 tests)

| Spec File | Tests | Quality Assessment |
|-----------|-------|--------------------|
| `app.spec.ts` | 2 | Smoke test only: checks component creates and renders a title |
| `language-badge.spec.ts` | 1 | Smoke test only: `should create` |
| `auth.spec.ts` | 1 | Smoke test only: `should be created` |
| `notification.spec.ts` | 1 | Smoke test only: `should be created` |
| `age-pipe.spec.ts` | 1 | Smoke test only: `create an instance` |

**Every existing test is just a creation/instantiation check.** None test actual behavior, business logic, edge cases, or error handling.

### Files WITHOUT spec files (19 files)

**Services:**
- `services/child.ts` - ChildService (enrollment validation, age calculation, language filtering)
- `services/attendance.ts` - AttendanceService (rate calculation, absence streaks, check-in/out validation)
- `services/group.ts` - GroupService (capacity checks, age eligibility, group matching)
- `services/schedule.ts` - ScheduleService (language balance, activity validation, time distribution)
- `services/message.ts` - MessageService (unread counts, language filtering)

**Components:**
- `components/child-list/child-list.ts` - ChildList
- `components/child-enrollment/child-enrollment.ts` - ChildEnrollment
- `components/attendance-tracker/attendance-tracker.ts` - AttendanceTracker
- `components/group-dashboard/group-dashboard.ts` - GroupDashboard
- `components/schedule-view/schedule-view.ts` - ScheduleView
- `components/message-inbox/message-inbox.ts` - MessageInbox
- `components/parent-portal/parent-portal.ts` - ParentPortal
- `components/header/header.ts` - Header

**Infrastructure:**
- `guards/auth-guard.ts` - authGuard
- `interceptors/auth-interceptor.ts` - authInterceptor
- `pipes/language-label-pipe.ts` - LanguageLabelPipe

---

## Priority Areas for Test Improvement

### Priority 1 (Critical) - Core Business Logic Services

These services contain the kindergarten's most important logic and should be tested first.

#### 1. ChildService (`services/child.ts`) - No tests exist

Contains the enrollment validation logic that directly affects admissions:

- **`validateEnrollment()`** - 7 distinct validation branches:
  - Missing child first/last name
  - Missing date of birth
  - Age below 2 years (too young)
  - Age above 6 years (too old)
  - No preferred languages selected
  - Invalid language codes
  - Missing/invalid parent email
  - Missing parent phone
  - **Combined errors** - multiple validation failures at once
- **`calculateAge()`** - date arithmetic with birthday boundary:
  - Child born today (age 0)
  - Birthday not yet passed this year (age - 1)
  - Birthday already passed (full years)
- **`filterByLanguage()`** - filters children by language program:
  - Filter for `de`, `pt`, or `fr`
  - Child with multiple languages matched
  - No matches returns empty array
- **HTTP methods** (`getChildren`, `getChildById`, `getChildrenByGroup`, `enrollChild`, `updateChild`) - verify correct URLs and request bodies with `HttpTestingController`

```
Recommended tests: ~18-22 test cases
```

#### 2. AttendanceService (`services/attendance.ts`) - No tests exist

Attendance tracking is legally required for kindergartens:

- **`calculateAttendanceRate()`**:
  - Empty records returns 0
  - All present returns 100
  - Mix of present/absent/sick/vacation
  - Rounding behavior (returns integer percentage)
- **`getAbsenceStreak()`**:
  - No absences returns 0
  - Consecutive absences counted from most recent date
  - Streak broken by a "present" day
  - Records in unsorted order (tests internal sorting)
- **`validateCheckInOut()`**:
  - Check-out before check-in (invalid)
  - Stay longer than 10 hours (invalid)
  - Valid check-in/check-out
  - Missing check-in or check-out (both undefined)
- **HTTP methods** - verify correct endpoint URLs and query parameters

```
Recommended tests: ~14-16 test cases
```

#### 3. ScheduleService (`services/schedule.ts`) - No tests exist

Language balance is a core feature of the multilingual kindergarten:

- **`calculateTotalMinutes()`**:
  - Empty activities returns 0
  - Sum of multiple activity durations
- **`getLanguageDistribution()`**:
  - All three languages represented
  - Only one language used
  - Empty activities returns all zeros
- **`isLanguageBalanced()`** - critical for ensuring fair multilingual exposure:
  - Balanced 3-language schedule (33%/33%/33%)
  - Unbalanced schedule (70%/20%/10%)
  - Custom tolerance threshold
  - Single-language schedule (considered balanced)
  - Empty schedule (considered balanced)
  - Two languages active (50%/50% expected)
- **`validateActivity()`**:
  - Missing description
  - Zero/negative duration
  - Duration exceeding 3 hours
  - Invalid time format (not HH:mm)
  - Invalid language
  - Valid activity passes all checks

```
Recommended tests: ~16-20 test cases
```

#### 4. AuthService (`services/auth.ts`) - Only a smoke test exists

All methods are untested despite being security-relevant:

- **`login()`** - should POST credentials, update currentUser BehaviorSubject
- **`logout()`** - should clear currentUser, remove localStorage token
- **`getCurrentUser()`** - should return observable of current user state
- **`isAuthenticated()`** - true when user set, false otherwise
- **`isTeacher()` / `isParent()`** - role-based access checks
- **`getUserLanguage()`** - returns parent's preferred language or teacher's first language, defaults to `'de'`
- **`getToken()`** - reads from localStorage

```
Recommended tests: ~12-14 test cases
```

#### 5. GroupService (`services/group.ts`) - No tests exist

Group placement affects child safety (capacity limits, age ranges):

- **`hasCapacity()`** - full group vs. group with space
- **`getRemainingCapacity()`** - correct count, never negative
- **`isAgeEligible()`** - within range, below min, above max, boundary ages
- **`findEligibleGroups()`** - combines capacity + age + language filters:
  - Matching group found
  - No groups match (wrong language, full, wrong age)
  - Multiple matches returned

```
Recommended tests: ~10-12 test cases
```

#### 6. MessageService (`services/message.ts`) - No tests exist

- **`countUnread()`** - empty list, all read, mix of read/unread
- **`filterByLanguage()`** - filter messages by `de`/`pt`/`fr`
- **`updateUnreadCount()`** - positive value, zero, negative clamps to 0
- **`markAsRead()`** - decrements unread count, doesn't go below 0

```
Recommended tests: ~8-10 test cases
```

### Priority 2 (High) - Security Infrastructure

#### 7. authGuard (`guards/auth-guard.ts`) - No tests exist

Route guards protect enrollment forms, attendance, messages, and parent portal:

- **Authenticated user** - should return true, allow navigation
- **Unauthenticated user** - should return false, redirect to `/login`
- **Integration with Router.navigate** - verify redirect URL

```
Recommended tests: ~3-4 test cases
```

#### 8. authInterceptor (`interceptors/auth-interceptor.ts`) - No tests exist

Affects every API call to the kindergarten backend:

- **With token present** - should clone request and add `Authorization: Bearer` header
- **Without token** - should pass request through unchanged
- **Original request not mutated** - verify clone behavior

```
Recommended tests: ~3-4 test cases
```

### Priority 3 (High) - Complex Components

#### 9. ChildEnrollment (`components/child-enrollment/child-enrollment.ts`) - No tests exist

The most complex component, directly handles parent-facing enrollment:

- **Form initialization** - default values, validators
- **`onLanguageToggle()`** - toggling DE/PT/FR on/off
- **`onSubmit()` with invalid form** - should return early
- **`onSubmit()` with validation errors** - should show errors via NotificationService
- **`onSubmit()` success** - should call `enrollChild()`, show success notification, navigate
- **`onSubmit()` API error** - should show error notification, reset submitting state
- **Allergies parsing** - comma-separated string to array

```
Recommended tests: ~10-12 test cases
```

#### 10. AttendanceTracker (`components/attendance-tracker/attendance-tracker.ts`) - No tests exist

- **`ngOnInit` with groupId** - should load children and attendance records
- **`ngOnInit` without groupId** - should not load data
- **`markPresent()`** - should record attendance and update rate
- **`markAbsent()`** with different statuses (`absent`, `sick`, `vacation`)
- **`getChildRecord()`** - find or return undefined
- **Error handling** for failed API calls

```
Recommended tests: ~8-10 test cases
```

#### 11. ChildList (`components/child-list/child-list.ts`) - No tests exist

- **`ngOnInit`** - should load children
- **`loadChildren()` success** - should populate both `children` and `filteredChildren`
- **`loadChildren()` error** - should set error message
- **`onFilterByLanguage()`** - filter by `de`/`pt`/`fr` or reset with `null`
- **`getAge()`** - delegates to ChildService.calculateAge
- **`trackByChildId()`** - returns child.id

```
Recommended tests: ~7-9 test cases
```

#### 12. ScheduleView (`components/schedule-view/schedule-view.ts`) - No tests exist

- **`ngOnInit` with groupId** - loads schedule
- **`loadSchedule()` success** - populates schedule, computes distribution & balance
- **`onDateChange()`** - updates selectedDate and reloads
- **`formatMinutes()`** - "45m", "1h", "2h 30m" formatting

```
Recommended tests: ~6-8 test cases
```

#### 13. GroupDashboard, MessageInbox, ParentPortal, Header - No tests exist

Each has 3-5 methods that need coverage:

- GroupDashboard: load groups, capacity display, language labels
- MessageInbox: load messages, mark as read, unread count sync
- ParentPortal: load user, load children via switchMap, logout
- Header: role-based navigation (teacher vs parent vs logged out), unread badge, logout

```
Recommended tests: ~5-7 test cases each (~20-28 total)
```

### Priority 4 (Medium) - Pipes

#### 14. AgePipe (`pipes/age-pipe.ts`) - Only smoke test exists

The transform logic is completely untested:

- **Child aged 3 years, 6 months** - "3 years, 6 months"
- **Child aged exactly 5 years** - "5 years"
- **Infant under 1 year** - "8 months"
- **Singular forms** - "1 year", "1 month"
- **null/undefined input** - returns empty string
- **Future date** - returns empty string (negative age)

```
Recommended tests: ~6-8 test cases
```

#### 15. LanguageLabelPipe (`pipes/language-label-pipe.ts`) - No tests exist

- **`'de'`** → "Deutsch"
- **`'pt'`** → "Português"
- **`'fr'`** → "Français"
- **null/undefined** → empty string
- **Unknown language code** → returns the code itself

```
Recommended tests: ~5-6 test cases
```

### Priority 5 (Lower) - Existing Smoke Tests That Need Enhancement

#### 16. NotificationService - Existing spec is smoke-only

The `showSuccess`, `showError`, `getNotifications`, and `clearAll` methods plus the 5-second auto-removal timeout are all untested. These should be tested with `fakeAsync`/`tick`.

```
Recommended additional tests: ~6-8 test cases
```

#### 17. LanguageBadge - Existing spec is smoke-only

The `label` and `flag` getters for each language (`de`, `pt`, `fr`) are untested.

```
Recommended additional tests: ~4-5 test cases
```

---

## Recommended Test Implementation Order

| Phase | Scope | Est. Tests | Rationale |
|-------|-------|-----------|-----------|
| **Phase 1** | ChildService, AttendanceService, ScheduleService, AuthService | ~60-72 | Core kindergarten business logic: enrollment validation, attendance tracking, language balance, authentication |
| **Phase 2** | GroupService, MessageService, authGuard, authInterceptor | ~24-30 | Group placement safety (capacity/age), messaging, and security infrastructure |
| **Phase 3** | ChildEnrollment, AttendanceTracker, ChildList | ~25-31 | Parent-facing enrollment form, daily teacher workflow, primary listing view |
| **Phase 4** | AgePipe, LanguageLabelPipe, NotificationService, LanguageBadge | ~21-27 | Pure logic pipes and utilities; easy wins for coverage |
| **Phase 5** | ScheduleView, GroupDashboard, MessageInbox, ParentPortal, Header | ~25-35 | Remaining components with moderate complexity |

**Total estimated new tests needed: ~155-195 test cases** to achieve 70-80% meaningful coverage.

---

## Testing Patterns to Adopt

### 1. Use `HttpTestingController` for all HTTP services

Six services make HTTP calls. Every one needs `HttpTestingController`:

```typescript
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

let httpTesting: HttpTestingController;
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });
  httpTesting = TestBed.inject(HttpTestingController);
});

afterEach(() => httpTesting.verify()); // Ensure no unexpected requests
```

### 2. Use `fakeAsync`/`tick` for timer-based logic

NotificationService auto-dismiss (5-second setTimeout) requires:

```typescript
it('should auto-remove success notification after 5 seconds', fakeAsync(() => {
  service.showSuccess('Test');
  expect(service.getNotifications()).toContain('Test');
  tick(5000);
  expect(service.getNotifications()).not.toContain('Test');
}));
```

### 3. Mock services in component tests

Components like ChildEnrollment inject 3 services. Use `vi.fn()` (Vitest) mocks to isolate:

```typescript
const mockChildService = {
  validateEnrollment: vi.fn(),
  enrollChild: vi.fn(),
};

TestBed.configureTestingModule({
  imports: [ChildEnrollment],
  providers: [
    { provide: ChildService, useValue: mockChildService },
  ],
});
```

### 4. Test the multilingual aspects specifically

The kindergarten's trilingual nature means language-related logic appears across many services and components. Dedicated tests should verify:

- Language filtering works for all three languages (`de`, `pt`, `fr`)
- Schedule balance calculations handle 2-language and 3-language distributions
- LanguageLabelPipe maps codes to correct native-language labels
- Parent's preferred language flows through to the UI correctly

### 5. Test error paths, not just happy paths

Multiple components have `.subscribe({ error: ... })` handlers. Use `HttpTestingController` to flush error responses:

```typescript
const req = httpTesting.expectOne('/api/children');
req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
```

### 6. Test guard integration with routes

Test `authGuard` by configuring TestBed with the guard on a route and verifying navigation:

```typescript
TestBed.configureTestingModule({
  providers: [
    provideRouter([{ path: 'enroll', component: ChildEnrollment, canActivate: [authGuard] }]),
  ],
});
```

---

## Summary

The Casa Azul kindergarten app has critical testing gaps across all layers:

1. **Enrollment validation** (ChildService) - zero coverage on the logic that determines whether children can be admitted, including age range checks and required field validation
2. **Attendance tracking** (AttendanceService) - zero coverage on rate calculations, absence streak detection, and check-in/out time validation
3. **Language balance** (ScheduleService) - zero coverage on the algorithm that ensures fair distribution of German, Portuguese, and French instruction time
4. **Security** (authGuard, authInterceptor) - zero coverage on route protection and API authentication
5. **All components** (7 of 8) - zero coverage on every user-facing view

Reaching 70-80% meaningful coverage requires approximately **155-195 new test cases** focused on actual behavior, with highest priority on the services containing kindergarten-specific business rules.
