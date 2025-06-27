import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private salonDashboardData= new BehaviorSubject<any>(null);
  salonDashboardData$ = this.salonDashboardData.asObservable();

  setSalonDashboardData(data: any) {
    this.salonDashboardData.next(data);
  }
  getSalonDashboardData() {
    return this.salonDashboardData.value;
  }
  
}
