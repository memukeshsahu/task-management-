import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface NotificationItem {
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
}
)
export class Notification {
  // State Management via Signals
  isOpen = signal<boolean>(false);

  notifications = signal<NotificationItem[]>([
    { id: 1, title: 'New Comment', message: 'John left a comment on your post.', time: '2m ago', read: false },
    { id: 2, title: 'System Update', message: 'Server maintenance completed successfully.', time: '1h ago', read: false },
    { id: 3, title: 'Meeting Reminder', message: 'Sync up with marketing team at 3 PM.', time: '5h ago', read: true }
  ]);

  // Derived State (Computed Signal)
  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  toggleNotifications(): void {
    this.isOpen.update(prev => !prev);
  }

  markAsRead(notification: NotificationItem): void {
    this.notifications.update(list =>
      list.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }

  // Close the dropdown when clicking anywhere else on the screen
  @HostListener('document:click')
  closeDropdown(): void {
    this.isOpen.set(false);
  }
}
