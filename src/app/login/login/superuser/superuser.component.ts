import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/api.constant';
import { ApiServiceService } from 'src/app/core/api-services/api-service.service';
import {SharedDataService} from 'src/app/core/api-services/shared-data.service';
import { ConfigService } from 'src/app/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.scss']
})
export class SuperuserComponent implements OnInit {
  salonData: any;

  constructor(private apiService: ApiServiceService, private configService: ConfigService, private router: Router, private sharedDataService: SharedDataService) {}
  
  navItems=[
    { name: 'Dashboard', icon: 'bi bi-house-door-fill', route:'dashboard' },
    { name: 'Calendar', icon: 'bi bi-calendar-check', route:'calendar' },
    { name: 'Experts', icon: 'bi bi-person-fill', route:'experts' },
    { name: 'Services', icon: 'bi bi-gear-fill', route:'services' },
  ]  

  logout(): void {
     this.configService.logout();
     this.router.navigate(['/']);
   }

    ngOnInit(): void {

      const salonId = localStorage.getItem('salonId');
      if(!salonId) {
        console.error('Salon ID missing');
        return;
      }
      const url = ApiConstants.admin_dashboard.replace('{{salon_id}}', salonId);
      this.apiService.getRequestedResponse(`${url}`).subscribe({
        next: (salonData) => {
          this.sharedDataService.setSalonDashboardData(salonData);
         
          // Handle the salon dashboard data here
          this.salonData = salonData;
        },
        error: (error) => {
          console.error('Failed To Fetch Salon Dashboard Data:', error);
        }
      })

    }
  }
