import { CommonModule } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { ToDoService } from '../store/service';
import { TodoListComponent } from './todo-list.component';
import { AppChildComponent } from './app-child/app-child.component';

import {  PipeTransform,Injectable } from '@angular/core';

@Pipe({
  standalone: true,
  name:'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(array:any[],field:string, value:string):any[] {
    if (!array) return [];
    if (!value || value.length === 0) return array;
    return array.filter(item =>
      JSON.stringify(item[field]).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TodoListComponent, AppChildComponent, FormsModule,FilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list-app';
  receivedMessage = '';
  filterText = '';

  employeeDetails = [{ name: 'prakash', age: 30 },
  { name: 'kumar', age: 10 },
  { name: 'sathis', age: 18 },
  { name: 'rajesh', age: 45 }]


  returnMessaege(event: string) {
    this.receivedMessage = event;
  }

}


