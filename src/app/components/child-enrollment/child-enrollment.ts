import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChildService } from '../../services/child';
import { NotificationService } from '../../services/notification';
import { Language } from '../../models/kindergarten.model';

@Component({
  selector: 'app-child-enrollment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './child-enrollment.html',
  styleUrl: './child-enrollment.scss',
})
export class ChildEnrollment {
  private readonly childService = inject(ChildService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  enrollmentForm: FormGroup = this.fb.group({
    childFirstName: ['', Validators.required],
    childLastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    preferredLanguages: [[] as Language[], Validators.required],
    parentFirstName: ['', Validators.required],
    parentLastName: ['', Validators.required],
    parentEmail: ['', [Validators.required, Validators.email]],
    parentPhone: ['', Validators.required],
    allergies: [''],
    medicalNotes: [''],
  });

  validationErrors: string[] = [];
  submitting = false;

  onLanguageToggle(language: Language): void {
    const current: Language[] = this.enrollmentForm.get('preferredLanguages')?.value ?? [];
    const index = current.indexOf(language);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(language);
    }
    this.enrollmentForm.patchValue({ preferredLanguages: [...current] });
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      return;
    }

    const formValue = this.enrollmentForm.value;
    const request = {
      ...formValue,
      dateOfBirth: new Date(formValue.dateOfBirth),
      allergies: formValue.allergies
        ? formValue.allergies.split(',').map((a: string) => a.trim()).filter(Boolean)
        : [],
    };

    const validation = this.childService.validateEnrollment(request);

    if (!validation.valid) {
      this.validationErrors = validation.errors;
      validation.errors.forEach((error) => this.notificationService.showError(error));
      return;
    }

    this.validationErrors = [];
    this.submitting = true;

    this.childService.enrollChild(request).subscribe({
      next: () => {
        this.notificationService.showSuccess('Enrollment submitted successfully!');
        this.router.navigate(['/children']);
      },
      error: (err) => {
        this.submitting = false;
        this.notificationService.showError('Failed to submit enrollment');
        console.error('Error enrolling child:', err);
      },
    });
  }
}
