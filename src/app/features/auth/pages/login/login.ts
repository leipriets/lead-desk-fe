import { Component, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// -- PrimeNG
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// -- Services
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth.service';
import { PersistenceService } from 'src/app/library/services/persistence.service';
// -- Interface
import { AuthData } from '../../types/auth.interface';
import { ApiResponse } from '@interfaces/api-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    MessageModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private persistenceService = inject(PersistenceService);
  private router = inject(Router);

  loading = signal(false);
  errorMessage = '';

  email!: string;
  password!: string;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailInput() {
    return this.loginForm.get('email');
  }

  get passwordInput() {
    return this.loginForm.get('password');
  }

  public formSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage = '';

    this.authService.login(this.loginForm.value as any).subscribe({
      next: (res: ApiResponse<AuthData>) => {
        console.log('Login success', res);
        // TODO: store token + redirect
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
        });

        if (res?.data?.access_token) {
          this.persistenceService.set('lead-desk-token', res.data.access_token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: err?.error?.message,
        });
        this.loading.set(false);

      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
