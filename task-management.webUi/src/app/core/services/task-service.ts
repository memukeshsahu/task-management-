import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskListResponse } from '../models/response/task-list-response';
import { mock_tasks } from '../../pages/task-list/task-list';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  getTasks(): Observable<TaskListResponse[]> {
    return of(mock_tasks);
  }

  getTaskById(id: number): Observable<TaskListResponse | undefined> {
    const task = mock_tasks.find(x => x.id === id);
    return of(task);
  }

  createTask(task: TaskListResponse): Observable<TaskListResponse> {
    mock_tasks.push(task);
    return of(task);
  }

  updateTask(task: TaskListResponse): Observable<TaskListResponse> {
    const index = mock_tasks.findIndex(x => x.id === task.id);

    if (index !== -1) {
      mock_tasks[index] = task;
    }

    return of(task);
  }

  deleteTask(id: number): Observable<boolean> {
    const index = mock_tasks.findIndex(x => x.id === id);

    if (index !== -1) {
      mock_tasks.splice(index, 1);
    }

    return of(true);
  }
}
