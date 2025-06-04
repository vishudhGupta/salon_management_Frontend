import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-superuser',
  templateUrl: './superuser.component.html',
  styleUrls: ['./superuser.component.scss']
})
export class SuperuserComponent {
    stats = [
    { title: 'Total Income', value: '$220,000', note: '\u2191 3.46%' },
    { title: 'Total Expenses', value: '$108,500', note: '\u2193 2.84%' },
    { title: 'Visits', value: '5,256', note: '\u2191 1.50%' },
    { title: 'Customers', value: '1,568', note: '\u2191 3.42%' }
  ];

  totalCustomers = 186;
  newCustomers = 130;
  oldCustomers = 56;

  services = [
    { id: 'SVHAIE921', name: 'Haircut', revenue: 4120 },
    { id: 'SVNAINL1NI', name: 'Hair Coloring', revenue: 3584 },
    { id: 'SVMASG2PI', name: 'Shellac', revenue: 3246 },
    { id: 'SVLAM105', name: 'Eyelash Lamination', revenue: 2878 },
    { id: 'SVREST112', name: 'Hair Restoration', revenue: 2325 }
  ];

  users = [
    { id: 'JOHH0BB1', name: 'John Hobby', phone: '9876543210' },
    { id: 'USR002', name: 'Priya Verma', phone: '9988776655' }
  ];

  appointments = [
    {
      appointment_id: 'APSLJOMCQ',
      user_id: 'JOHH0BB1',
      service_id: 'SVHAIE921',
      expert_id: 'EXOMXLNG65',
      status: 'Pending',
      appointment_time: '11:11 AM',
      appointment_date: '2025-05-16'
    },
    {
      appointment_id: 'APSLJOYFD',
      user_id: 'USR002',
      service_id: 'SVNAINL1NI',
      expert_id: 'EXABCBCJ34',
      status: 'Confirmed',
      appointment_time: '02:00 PM',
      appointment_date: '2025-05-15'
    }
  ];

  revenueChartData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Income',
        data: [42000, 48000, 51000, 60000, 58000, 55000, 61000],
        backgroundColor: '#0d6efd'
      },
      {
        label: 'Expenses',
        data: [28000, 30000, 29000, 32000, 33000, 31000, 34000],
        backgroundColor: '#dc3545'
      }
    ]
  };

  revenueChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  visitsChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [400, 500, 600, 700, 650, 720],
        borderColor: '#20c997',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Returning Customers',
        data: [300, 450, 520, 600, 590, 640],
        borderColor: '#0d6efd',
        tension: 0.4,
        fill: false
      }
    ]
  };

  visitsChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  getServiceName(service_id: string): string {
    const service = this.services.find(s => s.id === service_id);
    return service ? service.name : 'Unknown';
  }

  getUserName(user_id: string): string {
    const user = this.users.find(u => u.id === user_id);
    return user ? user.name : 'Guest';
  }

  getUserPhone(user_id: string): string {
    const user = this.users.find(u => u.id === user_id);
    return user ? user.phone : '-';
  }
  customerPieChartData: ChartData<'doughnut'> = {
  labels: ['New Customers', 'Old Customers'],
  datasets: [
    {
      data: [130, 56],
      backgroundColor: ['#198754', '#6f42c1'],
    }
  ]
};

customerPieChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#333'
      }
    }
  }
};

}
