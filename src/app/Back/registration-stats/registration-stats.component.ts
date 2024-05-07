import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registration-stats',
  templateUrl: './registration-stats.component.html',
  styleUrls: ['./registration-stats.component.css']
})
export class RegistrationStatsComponent implements OnInit {
  registrationData: any;
  weeklyChartOption: any;
  monthlyChartOption: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchRegistrationData();
  }

  fetchRegistrationData() {
    this.userService.getRegistrationStats('weekly')
      .subscribe(weeklyData => {
        this.registrationData = weeklyData['data']; // Extract data object from response
        this.renderWeeklyChart();
      });

    this.userService.getRegistrationStats('monthly')
      .subscribe(monthlyData => {
        this.registrationData = monthlyData['data']; // Extract data object from response
        this.renderMonthlyChart();
      });
  }
  renderWeeklyChart() {
    const xAxisData = [];
    const yAxisData = [];

    // Extract day-wise registration data from registrationData object
    for (let i = 1; i <= Object.keys(this.registrationData).length; i++) {
      const registrations = this.registrationData[i] || 0;
      xAxisData.push(i);
      yAxisData.push(registrations);
    }

    this.weeklyChartOption = {
      xAxis: {
        type: 'category',
        data: xAxisData,
        name: 'Day', // Label for the x-axis
        nameLocation: 'middle', // Location of the x-axis label
        nameTextStyle: {
          fontWeight: 'bold' // Style of the x-axis label
        }
      },
      yAxis: {
        type: 'value',
        name: 'Registrations', // Label for the y-axis
        nameLocation: 'middle', // Location of the y-axis label
        nameTextStyle: {
          fontWeight: 'bold' // Style of the y-axis label
        },
        interval: 1 // Set the interval to 1 to display integer values only
      },
      legend: {
        data: ['Weekly Registrations'] // Legend data for the weekly chart
      },
      series: [{
        name: 'Weekly Registrations', // Series name for the weekly chart
        data: yAxisData,
        type: 'bar'
      }]
    };
  }

  renderMonthlyChart() {
    const xAxisData = [];
    const yAxisData = [];

    // Extract day-wise registration data from registrationData object
    for (let i = 1; i <= Object.keys(this.registrationData).length; i++) {
      const registrations = this.registrationData[i] || 0;
      xAxisData.push(i);
      yAxisData.push(registrations);
    }

    this.monthlyChartOption = {
      xAxis: {
        type: 'category',
        data: xAxisData,
        name: 'Day', // Label for the x-axis
        nameLocation: 'middle', // Location of the x-axis label
        nameTextStyle: {
          fontWeight: 'bold' // Style of the x-axis label
        }
      },
      yAxis: {
        type: 'value',
        name: 'Registrations', // Label for the y-axis
        nameLocation: 'middle', // Location of the y-axis label
        nameTextStyle: {
          fontWeight: 'bold' // Style of the y-axis label
        },
        interval: 1 // Set the interval to 1 to display integer values only
      },
      legend: {
        data: ['Monthly Registrations'] // Legend data for the monthly chart
      },
      series: [{
        name: 'Monthly Registrations', // Series name for the monthly chart
        data: yAxisData,
        type: 'bar'
      }]
    };
  }


}
