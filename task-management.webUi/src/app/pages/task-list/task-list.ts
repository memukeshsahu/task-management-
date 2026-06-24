import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


@Component({
  selector: 'app-task-list',
  imports: [PaginatorModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {


  first: number = 0;
  rows: number = 10;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
