import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TaskListResponse } from '../../core/models/response/task-list-response';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task-service';
export const mock_tasks: TaskListResponse[] = [
  {
    id: 1,
    tittle: "Fix Authentication Bug",
    description: "Users are experiencing intermittent 401 errors during token refresh on the dashboard.",
    assignedTeamMember: "Sarah Jenkins",
    priority: "High",
    status: "Pending",
    dueDate: "2026-06-28"
  },
  {
    id: 2,
    tittle: "Update Privacy Policy",
    description: "Revise the user data retention section to comply with the latest 2026 privacy regulations.",
    assignedTeamMember: "Alex Rivera",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-07-05"
  },
  {
    id: 3,
    tittle: "Database Migration Preparation",
    description: "Run the staging migration scripts and verify indexing performance on the new cluster.",
    assignedTeamMember: "David Chen",
    priority: "Critical",
    dueDate: "2026-06-26"
  },
  {
    tittle: "Design Landing Page Hero Section",
    description: "Create high-fidelity mockups for the Q3 product launch hero section.",
    assignedTeamMember: "Emily Taylor",
    priority: "Low",
    dueDate: "2026-07-12",
    status: "Completed",
    id: 4
  },
  {
    tittle: "Optimize Image Upload Pipeline",
    description: "Implement client-side compression before sending profile pictures to S3 storage.",
    assignedTeamMember: "Marcus Vance",
    priority: "Medium",
    dueDate: "2026-07-02",
    id: 5
  },
  {
    tittle: "Refactor Notification Context",
    description: "Clean up duplicate re-renders by splitting the global toast notification context provider.",
    assignedTeamMember: "Sarah Jenkins",
    priority: "Low",
    dueDate: "2026-07-19",
    id: 6
  },
  {
    tittle: "Configure Stripe Webhooks",
    description: "Set up listeners for failed subscription renewals and grace-period triggering.",
    assignedTeamMember: "David Chen",
    priority: "High",
    dueDate: "2026-06-30",
    id: 7
  },
  {
    tittle: "Audit Accessibility (WCAG 2.1)",
    description: "Run contrast checkers on the main dashboard components and add missing aria-labels.",
    assignedTeamMember: "Alex Rivera",
    priority: "Medium",
    dueDate: "2026-07-08",
    id: 8
  },
  {
    tittle: "Draft Q3 Release Notes",
    description: "Gather changelogs from engineering and compile customer-facing documentation for the July update.",
    assignedTeamMember: "Chloe Zhang",
    priority: "Low",
    dueDate: "2026-07-15",
    id: 9
  },
  {
    tittle: "Resolve Analytics Memory Leak",
    description: "Investigate and patch the memory leak caused by uncleaned event listeners in the dashboard charts.",
    assignedTeamMember: "Marcus Vance",
    priority: "Critical",
    dueDate: "2026-06-27",
    id: 10
  }
];
@Component({
  selector: 'app-task-list',
  imports: [
    PaginatorModule,
    SkeletonModule,
    TableModule,
    ButtonModule,
    MenuModule,
    FormsModule,
    RouterModule,


  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  standalone: true
})
export class TaskList {


  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  // private confirmationService = inject(ConfirmationService);
  private currentEvent: Event | null = null;
  // // private messageService = inject(MessageService);

  cols = [
    { field: 'tittle', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'assignedTeamMember', header: 'Assigned team member' },
    { field: 'priority', header: 'Priority' },
    { field: 'dueDate', header: 'Due date' },
  ];

  first: number = 0;
  rows: number = 10;
  actionMenuItems!: MenuItem[];
  tasks = mock_tasks;
  loading: boolean = false;
  selectedTask: any;
  searchQuery: any;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }


  ngOnInit() {
    this.loadTasks();

    this.actionMenuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.openEditModal(this.selectedTask)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.openDeleteModal(this.selectedTask)
      }
    ];
  }
  loadTasks() {
    this.loading = true;

    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
    if (!this.tasks || this.tasks.length === 0) {
      this.loading = false
    }
  }

  saveCurrentEvent(event: Event) {
    this.currentEvent = event;
    console.log("Current event is:", event)
  }

  onMenuClick(event: MouseEvent, menu: Menu, task: any) {
    event.stopPropagation();
    this.selectedTask = task;
    menu.toggle(event);
  }
  openEditModal(selectedTask: any): void {

    if (!selectedTask) {
      return;
    }

    this.router.navigate(['/tasks/edit-task', selectedTask.id]);
  }

  openDeleteModal(selectedTask: any): void {

    if (!selectedTask) {
      return;
    }

    console.log('Delete Task', selectedTask);

  }

  onRowClick(task: TaskListResponse): void {
    this.router.navigate(['/tasks', task.id]);
  }

  // showConfirmation(action: 'edit' | 'delete') {
  //   this.confirmationService.confirm({
  //     target: this.currentEvent?.target as EventTarget,
  //     message: `Are you sure that you want to proceed with ${action}?`,
  //     header: 'Confirmation',
  //     closable: true,
  //     closeOnEscape: true,
  //     icon: 'pi pi-exclamation-triangle',
  //     rejectButtonProps: {
  //       label: 'Cancel',
  //       severity: 'secondary',
  //       outlined: true
  //     },
  //     acceptButtonProps: {
  //       label: action === 'delete' ? 'Delete' : 'Save',
  //       severity: action === 'delete' ? 'danger' : 'primary'
  //     },
  //     accept: () => {
  //       if (action === 'edit') {
  //         this.openEditModal(this.selectedTask);
  //       } else {
  //          this.openDeleteModal(this.selectedTask);
  //       }
  //       this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Action executed successfully' });
  //     },
  //     reject: () => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Rejected',
  //         detail: 'You have cancelled the action',
  //         life: 3000
  //       });
  //     }
  //   });
  // }

}
