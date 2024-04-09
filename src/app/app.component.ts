import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, Pipe, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { ToDoService } from '../store/service';
import { TodoListComponent } from './todo-list.component';
import { AppChildComponent } from './app-child/app-child.component';

import { PipeTransform, Injectable } from '@angular/core';
import { SimpleServiceService } from './simple.service.service';

@Pipe({
  standalone: true,
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], field: string, value: string): any[] {
    if (!array) return [];
    if (!value || value.length === 0) return array;
    return array.filter(item =>
      JSON.stringify(item[field]).toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TodoListComponent, AppChildComponent, FormsModule, FilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SimpleServiceService]
})
export class AppComponent implements AfterViewInit, AfterContentInit {
  title = 'todo-list-app';
  receivedMessage = '';
  filterText = '';

  @ViewChild('childRef') appChildComponent: AppChildComponent | undefined;
  @ContentChild('projectedContent') projectedContent: ElementRef | undefined;

  employeeDetails = [{ name: 'prakash', age: 30 },
  { name: 'kumar', age: 10 },
  { name: 'sathis', age: 18 },
  { name: 'rajesh', age: 45 }]

  data: number | undefined;

  returnMessaege(event: string) {
    this.receivedMessage = event;
  }

  constructor(private myservice: SimpleServiceService) {

  }

  ngOnInit() {
    this.myservice.getSimpleObservable().subscribe({
      next: (value: number) => {
        this.data = value;
      },
      complete: () => {
        console.log('Observable completed');
      }
    });
  }

  ngAfterViewInit() {
    // Accessing the child component after the view has been initialized
    this.appChildComponent?.doSomething();
  }

  ngAfterContentInit() {
    // Accessing the projected content after content has been initialized
    console.log(this.projectedContent?.nativeElement.textContent);
  }
}




