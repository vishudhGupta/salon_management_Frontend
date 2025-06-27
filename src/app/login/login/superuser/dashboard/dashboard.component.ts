import { Component, Input } from '@angular/core';
import { SharedDataService } from 'src/app/core/api-services/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
salonDashboardData: any;
  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.salonDashboardData$.subscribe(data => {
      this.salonDashboardData = data;
      console.log('Salon dashboard data in dashboard component:', data);
    });
  }
}
