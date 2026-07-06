import { Component, signal, computed, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export interface DummyNotification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  private elementRef = inject(ElementRef);

  isOpen = signal(false);

  notifications = signal<DummyNotification[]>([
    {
      id: 1,
      title: 'New Task Assigned',
      message: 'You have been assigned the task "Fix Authentication Bug".',
      time: '5 mins ago',
      read: false
    },
    {
      id: 2,
      title: 'Task Overdue',
      message: 'The task "Database Migration Preparation" is overdue.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Profile Updated',
      message: 'Your role has been updated to Administrator.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on Sunday at 2 AM UTC.',
      time: '2 days ago',
      read: true
    }
  ]);

  unreadCount = computed(() => {
    return this.notifications().filter(n => !n.read).length;
  });

  toggleNotifications() {
    this.isOpen.update(val => !val);
  }

  closeNotifications() {
    this.isOpen.set(false);
  }

  markAsRead(notification: DummyNotification) {
    if (!notification.read) {
      this.notifications.update(list =>
        list.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    }
  }

  markAllAsRead() {
    this.notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeNotifications();
    }
  }
}
