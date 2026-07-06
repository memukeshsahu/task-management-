import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, BadgeModule, TagModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  tasks = [
    {
      id: 1,
      title: 'Angular',
      status: 'Overdue',
      priority: 'Medium'
    },
    {
      id: 2,
      title: 'Create Dashboard API',
      status: 'Due Today',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Fix Login Bug',
      status: 'In Progress',
      priority: 'Low'
    }
  ];

  get totalPendingTasks(): number {
    return this.tasks.length;
  }
}
