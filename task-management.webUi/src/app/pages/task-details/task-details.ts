import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task-service';
import { TaskComment } from "../task-comment/task-comment";
@Component({
  selector: 'app-task-details',
  imports: [CommonModule,
    FormsModule,
    ButtonModule,
    DatePickerModule, TaskComment],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);
  taskId?:number

  ngOnInit() {
   this.taskId= Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskById(this.taskId).subscribe({
      next: (response) => {
        this.task = response;
      }
    });
  }
  onEdit() {
    this.router.navigate(['/tasks/edit-task',this.taskId])
  }
  goBack() {
    this.router.navigate(['/tasks']);
  }
  task: any;
}
