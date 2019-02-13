import {Component} from '@angular/core';
import {HttpApplicationsService} from './../applications.service';
import {SyncService} from './../sync.service';

class Application{
    name: string;
    applicationType: string;
    contentTypes: string[];
    user: User;
     
    constructor(name: string, applicationType: string, contentTypes: string[], user: User) {
        this.name = name;
        this.applicationType = applicationType;
        this.contentTypes = contentTypes;
        this.user = user;
    }
}

class User{
    name: string;
    email: string;
    role: string;
     
    constructor(name: string, email: string, role: string) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
}
 
@Component({
    selector: 'application-component',
    templateUrl: './applications.component.html',
	styleUrls: ['./applications.component.css'],
	providers: [HttpApplicationsService]
})
export class ApplicationComponent { 

	currentApplication: Application;

	selectedPublisherName: string;
    applications: Application[];
	constructor(private applicationsService: HttpApplicationsService, private syncService: SyncService){
		this.syncService.syncRole$.subscribe((role: string) => {
			if (role != 'Publisher') {
				this.applicationsService.getApplicationsByRole(role).subscribe((applications: any) => {
					this.applications = applications;
				});
			} else {
				this.applicationsService.getApplicationsByPublisherName(this.selectedPublisherName).subscribe((applications: any) => {
					this.applications = applications;
				});
			}
		});
	}
	
	click(name: string, applicationType: string, contentTypes: string[], userName: string, email: string, role: string): void {
		this.currentApplication = new Application(name, applicationType, contentTypes, new User(userName, email, role));
		this.syncService.syncApplication(this.currentApplication);
	}
}