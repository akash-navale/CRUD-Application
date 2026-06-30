import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Admin } from './Component/admin/admin';
import { User } from './Component/user/user';
import { DataBinding } from './Component/data-binding/data-binding';
import { Signal } from './Component/signal/signal';
import { ControlFlow } from './Component/control-flow/control-flow';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,Admin,User,DataBinding, Signal, ControlFlow],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('To-Dolist');
}
