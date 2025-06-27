import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/api.constant';
import { ApiServiceService } from 'src/app/core/api-services/api-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  experts: any[] = [];
  expertForm!: FormGroup;
    isEditMode = false;         // 🔹 Are we editing?
  editingExpertId: string = ''; // 🔹 Which expert is being edited?

  constructor(private apiservice: ApiServiceService, private fb: FormBuilder) {}
  ngOnInit(): void {
    const salonId = localStorage.getItem('salonId');
    if (!salonId) {
      console.error('Salon ID is missing');
      return;
    }

    const url = ApiConstants.experts.replace('{{salon_id}}', salonId);
    this.apiservice.getRequestedResponse(url).subscribe({
      next: (experts) => {
        this.experts = experts;
        console.log('Experts:', this.experts);
      },
      error: (err) => {
        console.error('Failed to fetch experts:', err);
      },
    });
    this.initForm(salonId);
  }
  initForm(salonId: string) {
    this.expertForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      salon_id: [{ value: salonId, disabled:true}, Validators.required],
    });
  }
  // called when "add expert clicked"
  openCreateModal() {
    this.isEditMode = false; // 🔹 Reset to create mode
    this.editingExpertId = ''; // 🔹 Clear the expert ID
    this.expertForm.reset({
      salon_id: localStorage.getItem('salonId') || '', // 🔹 Set the salon ID
    }); // 🔹 Reset the form
    const modal = new bootstrap.Modal(document.getElementById('createExpertModal'));
    modal.show();
  }
   // 🔹 Called when clicking Edit button on a row
  openEditModal(expert: any) {
    this.isEditMode = true;
    this.editingExpertId = expert.expert_id;
    this.expertForm.patchValue({
      name: expert.name,
      phone: expert.phone,
      address: expert.address,
      salon_id: expert.salon_id
    });
    const modal = new bootstrap.Modal(document.getElementById('createExpertModal'));
    modal.show();
  }

  submitForm() {
    if (this.expertForm.invalid) {
      this.expertForm.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.expertForm.getRawValue(),
      salon_id: localStorage.getItem('salonId')
    };

    if (this.isEditMode && this.editingExpertId) {
      // 🔹 Update expert
      const url = ApiConstants.updateExpert.replace('{{expert_id}}', this.editingExpertId);
      this.apiservice.putRequestedResponse(url, payload).subscribe({
        next: (res) => {
          console.log('Expert updated:', res);
          // Update the local array
          const idx = this.experts.findIndex(e => e.expert_id === this.editingExpertId);
          if (idx > -1) this.experts[idx] = res;
          this.closeModal();
        },
        error: (err) => console.error('Error updating expert:', err)
      });
    } else {
      // 🔹 Create expert
      this.apiservice.postRequestedResponse(ApiConstants.createExpert, payload).subscribe({
        next: (res) => {
          console.log('Expert created:', res);
          this.experts.push(res);
          this.closeModal();
        },
        error: (err) => console.error('Error creating expert:', err)
      });
    }
  }

  closeModal() {
    const modalEl = document.getElementById('createExpertModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
  deleteExpert(expert: any) {
  if (!confirm(`Are you sure you want to delete ${expert.name}?`)) {
    return;
  }

  const url = ApiConstants.updateExpert.replace('{{expert_id}}', expert.expert_id);

  this.apiservice.deleteData(url, {}).subscribe({
    next: () => {
      console.log('Expert deleted successfully');
      // Remove from list
      this.experts = this.experts.filter(e => e.expert_id !== expert.expert_id);
    },
    error: (err) => {
      console.error('Error deleting expert:', err);
      alert('Failed to delete expert. Please try again.');
    }
  });
}

}
