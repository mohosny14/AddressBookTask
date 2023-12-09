import { Component } from '@angular/core';
import { Job } from 'src/app/Core/Models/job';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  jobTitles : Job [] = [];
}
