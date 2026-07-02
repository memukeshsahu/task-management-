import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface MemberList {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const MEMBERS: MemberList[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Super Admin'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Main Association'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Service Provider'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Verifier'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'NR User'
  },
  {
    id: 6,
    name: 'Sophia Miller',
    email: 'sophia.miller@example.com',
    role: 'Service Provider'
  },
  {
    id: 7,
    name: 'James Anderson',
    email: 'james.anderson@example.com',
    role: 'Verifier'
  },
  {
    id: 8,
    name: 'Olivia Thomas',
    email: 'olivia.thomas@example.com',
    role: 'Main Association'
  },
  {
    id: 9,
    name: 'Daniel Martinez',
    email: 'daniel.martinez@example.com',
    role: 'NR User'
  },
  {
    id: 10,
    name: 'Emma Taylor',
    email: 'emma.taylor@example.com',
    role: 'Service Provider'
  }
];

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  getById(id: number) {
    const member = MEMBERS.find((m) => m.id === id);
    return of(member);
  }
}
