import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
export interface Comment {
  id: number;
  userId: number;
  userName: string;
  message: string;
  createdOn: Date;
}

@Component({
  selector: 'app-task-comment',
  imports: [ButtonModule, NgClass, DatePipe, ɵInternalFormsSharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-comment.html',
  styleUrl: './task-comment.css',
})
export class TaskComment {

  private fb = inject(FormBuilder);

  commentForm: FormGroup = this.fb.group(
    {
      message: ['', [Validators.required, Validators.pattern(/^(?!\s*$).+/), Validators.maxLength(500)]]
    }
  )

  currentUserId = 1;

  comments: Comment[] = [
    {
      id: 1,
      userId: 2,
      userName: 'John Smith',
      message: 'Hi Mukesh, can you please check the API response?',
      createdOn: new Date('2026-06-30T09:10:00')
    },
    {
      id: 2,
      userId: 1,
      userName: 'Mukesh',
      message: 'Sure, I am looking into it.',
      createdOn: new Date('2026-06-30T09:12:00')
    },
    {
      id: 3,
      userId: 3,
      userName: 'Rahul',
      message: 'I have already tested it on the QA environment.',
      createdOn: new Date('2026-06-30T09:15:00')
    },
    {
      id: 4,
      userId: 1,
      userName: 'Mukesh',
      message: 'Looks like the issue is caused by a null reference in the backend.',
      createdOn: new Date('2026-06-30T09:18:00')
    },
    {
      id: 5,
      userId: 2,
      userName: 'John Smith',
      message: 'Great catch. ',
      createdOn: new Date('2026-06-30T09:20:00')
    },
    {
      id: 6,
      userId: 4,
      userName: 'Sneha',
      message: "Please update the task status once it's fixed.",
      createdOn: new Date('2026-06-30T09:25:00')
    },
    {
      id: 7,
      userId: 1,
      userName: 'Mukesh',
      message: 'The fix has been pushed to the development environment.',
      createdOn: new Date('2026-06-30T09:30:00')
    },
    {
      id: 8,
      userId: 2,
      userName: 'John Smith',
      message: 'Tested successfully. Everything looks good now.',
      createdOn: new Date('2026-06-30T09:35:00')
    }
  ];


  onComment() {
    console.log(this.commentForm.value);

    const newcomments: Comment[] = [
      {
        id: 8,
        userId: 1,
        userName: 'John Smith',
        message: this.commentForm.value.message,
        createdOn: new Date()

      }
    ]
    console.log(newcomments)
    this.comments.push(...newcomments);
    this.commentForm.reset()
  }
}
