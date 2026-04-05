import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// -- PrimeNg
import { ToastModule } from 'primeng/toast';
// -- Components
import { Sidebar } from './shared/sidebar/sidebar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('crm-fe');
}
