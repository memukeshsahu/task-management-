import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-task-comment',
  imports: [ButtonModule],
  templateUrl: './task-comment.html',
  styleUrl: './task-comment.css',
})
export class TaskComment {
onComment() {
throw new Error('Method not implemented.');
}
}
