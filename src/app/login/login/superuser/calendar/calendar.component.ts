import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/core/api-services/api-service.service';
import { ApiConstants } from 'src/app/api.constant';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  appointmentsData: any[] = [];
experts: any[] = [];
hours: string[] = [];

  constructor(private apiservice: ApiServiceService) {}

  ngOnInit(): void {
    const salonId = localStorage.getItem('salonId');
    if (!salonId) {
      console.error('Salon ID is missing');
      return;
    }

    const url = ApiConstants.calendar.replace('{{salon_id}}', salonId);
    this.apiservice.getRequestedResponse(url).subscribe({
      next: (appointments) => {
        this.appointmentsData = appointments;
        this.experts = this.getUniqueExperts();
         this.hours = this.generateHours();
        console.log('Appointments:', this.appointmentsData);
        this.experts = this.extractUniqueExperts();
      },
      error: (err) => {
        console.error('Failed to fetch appointments:', err);
      }
    });
  }
getUniqueExperts(): any[] {
  const expertMap = new Map();
  this.appointmentsData.forEach(appt => {
    const expert = appt.expert;
    if (!expertMap.has(expert.expert_id)) {
      expertMap.set(expert.expert_id, {
        ...expert,
        avatar: `https://ui-avatars.com/api/?name=${expert.name}`
      });
    }
  });
  return Array.from(expertMap.values());
}

 generateHours(): string[] {
  if (!this.appointmentsData.length) return [];

  const times = this.appointmentsData.map(appt => this.convertTimeToMinutes(appt.appointment_time));
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  const startHour = Math.floor(minTime / 60);
  const endHour = Math.ceil((maxTime + 75) / 60); // Include buffer

  const hours = [];
  for (let h = startHour; h <= endHour; h++) {
    const hour = h % 12 || 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    hours.push(`${hour}:00 ${ampm}`);
  }

  return hours;
}

convertTimeToMinutes(time: string): number {
  const [rawHour, minPart] = time.split(':');
  const [min, meridian] = minPart.split(' ');
  let hour = parseInt(rawHour, 10);
  if (meridian.toLowerCase() === 'pm' && hour !== 12) hour += 12;
  if (meridian.toLowerCase() === 'am' && hour === 12) hour = 0;
  return hour * 60 + parseInt(min);
}

  extractUniqueExperts(): any[] {
    const expertMap = new Map<string, any>();
    for (const appt of this.appointmentsData) {
      const expert = appt.expert;
      if (!expertMap.has(expert.expert_id)) {
        expertMap.set(expert.expert_id, {
          ...expert,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}`
        });
      }
    }
    return Array.from(expertMap.values());
  }

  getAppointments(expertId: string): any[] {
    return this.appointmentsData.filter(appt => appt.expert.expert_id === expertId);
  }

  getTop(time: string): string {
    const [rawHour, rawMinPart] = time.split(':');
    const [min, meridian] = rawMinPart.split(' ');
    let hour = parseInt(rawHour, 10);
    const minute = parseInt(min, 10);

    if (meridian.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (meridian.toLowerCase() === 'am' && hour === 12) hour = 0;

    const totalMin = hour * 60 + minute;
    return `${totalMin}px`; // 1 minute = 1px
  }

  getHeight(duration: number): string {
    return `${duration}px`; // 1 min = 1px
  }

  addDuration(startTime: string, duration: number): string {
    const [rawHour, rawMinPart] = startTime.split(':');
    const [min, meridian] = rawMinPart.split(' ');
    let hour = parseInt(rawHour, 10);
    let minute = parseInt(min, 10);

    if (meridian.toLowerCase() === 'pm' && hour !== 12) hour += 12;
    if (meridian.toLowerCase() === 'am' && hour === 12) hour = 0;

    let totalMinutes = hour * 60 + minute + duration;
    const endHour = Math.floor(totalMinutes / 60);
    const endMin = totalMinutes % 60;

    const endMeridian = endHour >= 12 ? 'PM' : 'AM';
    const displayHour = endHour % 12 || 12;
    const displayMin = endMin.toString().padStart(2, '0');

    return `${displayHour}:${displayMin} ${endMeridian}`;
  }
}
