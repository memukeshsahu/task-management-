import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TaskService } from '../../core/services/task-service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DatePickerModule,
    ButtonModule,
    InputTextModule,

  ],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css',
})
export class TaskCreate implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  taskId: number | null = null;

  task = {
    title: '',
    assignTo: '',
    description: '',
    priority: '',
    status: '',
    dueDate: null as Date | null
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    ;
    console.log(id);
    if (id) {
      this.taskId = id;
      this.loadTask();
    }
  }

  loadTask() {
    this.taskService.getTaskById(this.taskId!).subscribe({
      next: (data) => {
        this.task = {
          title: data?.tittle || '',
          assignTo: data?.assignedteammember || '',
          description: data?.description || '',
          priority: data?.priority || '',
          status: data?.status || '',
          dueDate: data?.dueDate ? new Date(data.dueDate) : null
        };
      },
      error: (err) => {
        console.error('Error fetching task details', err);
      }
    });
  }

  onSubmit() {
    if (this.taskId) {
      console.log('Update Task', this.task);
      // this.taskService.update(this.taskId, this.task)
    } else {
      console.log('Create Task', this.task);
      // this.taskService.create(this.task)
    }
    this.router.navigate(['/tasks']);
  }

  onClose() {
    this.router.navigate(['/tasks']);
  }
}