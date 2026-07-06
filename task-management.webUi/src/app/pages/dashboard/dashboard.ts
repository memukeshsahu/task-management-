import { Component, inject } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TaskService } from '../../core/services/task-service';
import { Observable } from 'rxjs';
import { TaskListResponse } from '../../core/models/response/task-list-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, BadgeModule, TagModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  private taskService = inject(TaskService);
  private router = inject(Router);

  tasks: TaskListResponse[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  get totalPendingTasks(): number {
    return this.tasks.filter((task) => task.status === 'Pending').length;
  }

  onRowClick(taskId: number): void {
    this.router.navigate(['/tasks', taskId]);
  }

}
