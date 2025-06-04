import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/api.constant';
import { ApiServiceService } from 'src/app/core/api-services/api-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: any;

get upcomingAppointments() {
  if (!this.userData?.appointments) return [];
  const now = new Date();
  return this.userData.appointments.filter((app:any) => new Date(app.appointment_date) >= now);
}

get recentAppointments() {
  if (!this.userData?.appointments) return [];
  const now = new Date();
  return this.userData.appointments.filter((app:any) => new Date(app.appointment_date) < now);
}

get completedAppointments() {
  return this.userData?.appointments?.filter((app:any) => app.status === 'completed') || [];
}

get canceledAppointments() {
  return this.userData?.appointments?.filter((app:any) => app.status === 'canceled') || [];
}


   constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID missing');
      return;
    }

    const url = ApiConstants.user_dashboard.replace('{{user_id}}', userId);

    this.apiService.getRequestedResponse(`http://127.0.0.1:8000/api${url}`).subscribe({
      next: (userData) => {
        console.log('User dashboard data:', userData);
        // Handle the user dashboard data here
        this.userData = userData;
        // You can assign userData to a component property to display it in the template 

      },
      error: (error) => {
        console.error('Failed to fetch user dashboard data:', error);
        // Handle the error here
      }
    });
  }

}