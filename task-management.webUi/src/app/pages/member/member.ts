import { Component, EventEmitter, inject, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from "primeng/dialog";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { MembersService } from '../../core/services/members-service';

@Component({
  selector: 'app-member',
  imports: [InputTextModule, CardModule, ButtonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './member.html',
  styleUrl: './member.css',
})
export class Member implements OnChanges {

  @Input() memberId?: number | null = null;

  @Output() close = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private memberService = inject(MembersService);

  ngOnInit() {
    console.log('This is init method of member component');
    console.log('Member ID:', this.memberId);

    if (this.memberId) {
      this.getMemberById(this.memberId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['memberId']) {
      const id = changes['memberId'].currentValue;
      if (id) {
        this.getMemberById(id);
      } else {
        this.memberForm?.reset();
      }
    }
  }
  memberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
  });

  onCancel() {
    this.close.emit();
    // this.router.navigate(['/members'])
  }

  getMemberById(id: number) {
    this.memberService.getById(id).subscribe((member: any) => {
      console.log('Fetched member:', member);
      this.memberForm.patchValue(member);
    });
  }

  onSubmit() {
    if (this.memberForm.valid) {
      console.log(this.memberForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
