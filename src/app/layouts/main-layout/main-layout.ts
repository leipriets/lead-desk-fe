import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from 'src/app/shared/header/header';
import { Sidebar } from 'src/app/shared/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
