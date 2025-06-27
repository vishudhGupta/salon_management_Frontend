import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/api.constant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/core/api-services/api-service.service';
declare var bootstrap: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];
  serviceForm!: FormGroup;
  isEditMode = false;         // 🔹 Are we editing?
  editingServiceId: string = ''; // 🔹 Which service is being edited?
  constructor(private apiservice: ApiServiceService, private fb: FormBuilder){}

  ngOnInit(): void {
      const salonId = localStorage.getItem('salonId');
      if (!salonId) {
        console.error('Salon ID is missing');
        return;
      }
      const url = ApiConstants.services.replace('{{salon_id}}', salonId);
      this.apiservice.getRequestedResponse(url).subscribe({
        next: (services) => {
          this.services = services;
          console.log('Services:', this.services);
        },
        error: (err) => {
          console.error('Failed to fetch services:', err);
        }
      });
      this.initForm(salonId);
  }

  initForm(salonId: string) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      salon_id: [{value: salonId, disabled: true}, Validators.required],
      
      
    });
  }
  // called when "add service clicked"
  openCreateModal() {
    this.isEditMode = false; // 🔹 Reset to create mode
    this.editingServiceId = ''; // 🔹 Clear the service ID
    this.serviceForm.reset({
      salon_id: localStorage.getItem('salonId') || '', // 🔹 Set the salon ID
    }); // 🔹 Reset the form
    const modal = new bootstrap.Modal(document.getElementById('createServiceModal'));
    modal.show();
  }
  // 🔹 Called when clicking Edit button on a row
  openEditModal(service: any) {
    this.isEditMode = true; // 🔹 Set to edit mode
    this.editingServiceId = service.service_id; // 🔹 Set the service ID being edited
    this.serviceForm.patchValue({
      name: service.name,
      duration: service.duration,
      description: service.description,
      salon_id: service.salon_id,
      service_id: service.service_id,
      cost: service.cost
    });
    const modal = new bootstrap.Modal(document.getElementById('createServiceModal'));
    modal.show();
  }
  submitForm() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched(); // 🔹 Mark all fields as touched to show validation errors
      console.error('Form is invalid');
      return;
    }
    const payload = {
      ...this.serviceForm.getRawValue(),
      salon_id: localStorage.getItem('salonId'), // Ensure salon_id
      service_id: this.editingServiceId // Include service_id if editing
    };
 
    if (this.isEditMode && this.editingServiceId) {
      // Update existing service
      const url = ApiConstants.updateService.replace('{{service_id}}', this.editingServiceId);
      this.apiservice.putRequestedResponse(url, payload).subscribe({
        next: (response) => {
          console.log('Service updated successfully:', response);
         const idx = this.services.findIndex(e => e.service_id === this.editingServiceId);
          if (idx > -1) this.services[idx] = response;
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to update service:', err);
        }
      });
    } else {
      // Create new service
      const url = ApiConstants.createService;
      this.apiservice.postRequestedResponse(url, payload).subscribe({
        next: (response) => {
          console.log('Service created successfully:', response);
          this.services.push(response); // Add to local array
          this.closeModal(); // Close the modal
         
        },
        error: (err) => {
          console.error('Failed to create service:', err);
        }
      });
    }
  }

    closeModal() {
    const modalEl = document.getElementById('createServiceModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
  deleteService(service: any) {
  if (!confirm(`Are you sure you want to delete ${service.name}?`)) {
    return;
  }

  const url = ApiConstants.deleteService.replace('{{service_id}}', service.service_id)
    .replace('{{salon_id}}', localStorage.getItem('salonId') || '');

  this.apiservice.deleteData(url, {}).subscribe({
    next: () => {
      console.log('Service deleted successfully');
      // Remove from list
      this.services = this.services.filter(e => e.service_id !== service.service_id);
    },
    error: (err) => {
      console.error('Error deleting service:', err);
      alert('Failed to delete service. Please try again.');
    }
  });
}
}