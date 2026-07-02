import { Component, inject } from '@angular/core';
import { Paginator, PaginatorState } from "primeng/paginator";
import { Button, ButtonModule } from "primeng/button";
import { Menu, MenuModule } from "primeng/menu";
import { TableModule } from "primeng/table";
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Skeleton } from "primeng/skeleton";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { Member } from "../member/member";
import { MemberList, MEMBERS } from '../../core/services/members-service';
@Component({
  selector: 'app-members-list',
  imports: [Paginator, ButtonModule, MenuModule, TableModule, FormsModule, Skeleton, RouterModule, DialogModule, Member],
  templateUrl: './members-list.html',
  styleUrl: './members-list.css',
})
export class MembersList {


  displayMemberDialog: boolean = false;



  first: number = 0;
  rows: number = 10;
  actionMenuItems!: MenuItem[];
  loading: boolean = false;
  selectedMember: any;
  searchQuery: any;
  members = MEMBERS;
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' }
  ];
  private router = inject(Router);
  memberId?: number | null;

  ngOnInit() {
    this.loadMenu()
    
  }
  loadMenu() {
    this.actionMenuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.openEditModal(this.selectedMember)
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.openDeleteModal(this.selectedMember)
      }
    ];
  }
  openDeleteModal(selectedMember: any): void {
    throw new Error('Method not implemented.');
  }
  openEditModal(selectedMember: any): void {
    this.memberId=selectedMember.id;
    console.log('Selected member:', selectedMember, 'and member id is ',this.memberId );
    this.displayMemberDialog = true;
  }


  onRowClick(member: any) {
    this.router.navigate(['/members/', member.id])
  }

  onMenuClick(event: PointerEvent, menu: Menu, member: any) {
    event.stopPropagation();
    this.selectedMember = member;
    menu.toggle(event);
  }

  onPageChange($event: PaginatorState) {
    throw new Error('Method not implemented.');
  }

  showAddMemberDialog() {
    this.memberId = null;
    this.displayMemberDialog = true;
  }

  onDialogClose() {
    this.displayMemberDialog = false;
    this.memberId = null;
  }
}



