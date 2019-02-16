import {Component} from '@angular/core';
import {SyncService} from './../sync.service';
import {HttpApplicationsService} from './../applications.service';
import {HttpUsersService} from './../users.service';

export interface ApplicationType {
  value: string;
  viewValue: string;
}

export interface UserRole {
  value: string;
  viewValue: string;
}

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
  selector: 'buttons-operations-component',
  templateUrl: 'buttons-operations.html',
  styleUrls: ['buttons-operations.css']
})
export class ButtonOperationComponent {
	
	applicationTypes: ApplicationType[] = [
		{value: 'IOS', viewValue: 'IOS'},
		{value: 'ANDROID', viewValue: 'ANDROID'},
		{value: 'WEBSITE', viewValue: 'WEBSITE'}
	];
	
	userRoles: UserRole[] = [
		{value: 'ADMIN', viewValue: 'ADMIN'},
		{value: 'OPERATOR', viewValue: 'OPERATOR'},
		{value: 'PUBLISHER', viewValue: 'PUBLISHER'}
	];

	contentTypeList: string[] = ['VIDEO', 'IMAGE', 'HTML'];
	
	public data: string[];
	
	currentChosenUserRole: string;
	
	userName: string;
	userEmail: string;
	userRole: string;

	applicationName: string;
	applicationType: string;
	applicationContentTypes: string[];
	applicationUserName: string;
	applicationUserEmail: string;
	applicationUserRole: string;
	
	isCreatePublisherDisabled: boolean = true;
	isUpdatePublisherDisabled: boolean = true;
	isDeletePublisherDisabled: boolean = true;
	isCreateOperatorDisabled: boolean = true;
	isUpdateOperatorDisabled: boolean = true;
	isDeleteOperatorDisabled: boolean = true;
	isCreateApplicationDisabled: boolean = true;
	isUpdateApplicationDisabled: boolean = true;
	isDeleteApplicationDisabled: boolean = true;
	
	public constructor(private syncService: SyncService, private applicationsService: HttpApplicationsService, private usersService: HttpUsersService) {
		
		this.syncService.syncPermissions$.subscribe((data: string[]) => {
            this.data = data;
			this.isCreatePublisherDisabled = true;
			this.isUpdatePublisherDisabled = true;
			this.isDeletePublisherDisabled = true;
			this.isCreateOperatorDisabled = true;
			this.isUpdateOperatorDisabled = true;
			this.isDeleteOperatorDisabled = true;
			this.isCreateApplicationDisabled = true;
			this.isUpdateApplicationDisabled = true;
			this.isDeleteApplicationDisabled = true;
			for(let permission of this.data) {
				if (permission == 'CREATE_PUBLISHER') this.isCreatePublisherDisabled = false;
				if (permission == 'UPDATE_PUBLISHER') this.isUpdatePublisherDisabled = false;
				if (permission == 'DELETE_PUBLISHER') this.isDeletePublisherDisabled = false;
				if (permission == 'CREATE_OPERATOR') this.isCreateOperatorDisabled = false;
				if (permission == 'UPDATE_OPERATOR') this.isUpdateOperatorDisabled = false;
				if (permission == 'DELETE_OPERATOR') this.isDeleteOperatorDisabled = false;
				if (permission == 'CREATE_APPLICATION') this.isCreateApplicationDisabled = false;
				if (permission == 'UPDATE_APPLICATION') this.isUpdateApplicationDisabled = false;
				if (permission == 'DELETE_APPLICATION') this.isDeleteApplicationDisabled = false;
			}
		});	
		this.syncService.syncUser$.subscribe((user: any) => {
            this.userName = user.name;
			this.userEmail = user.email;
			this.userRole = user.role;
		});	
		this.syncService.syncRole$.subscribe((role: string) => {
            this.currentChosenUserRole = role;
		});
		this.syncService.syncApplication$.subscribe((application: any) => {
            this.applicationName = application.name;
			this.applicationType = application.applicationType;
			this.applicationContentTypes = application.contentTypes;
			this.applicationUserName = application.user.name;
			this.applicationUserEmail = application.user.email;
			this.applicationUserRole = application.user.role;
		});	
	}
	
	Status: boolean = true; 
    createPublisher(event:any) {
		this.usersService.createPublisher(new User(this.userName, this.userEmail, this.userRole), this.currentChosenUserRole)
		.subscribe((data: User) => {this.userName=data.name, this.userEmail=data.email, this.userRole = data.role;});
    } 
    updatePublisher(event:any) { 
		this.usersService.updatePublisher(new User(this.userName, this.userEmail, this.userRole), this.currentChosenUserRole)
		.subscribe((data: User) => {this.userName = data.name, this.userEmail = data.email, this.userRole = data.role;});
    } 
    deletePublisher(event:any) { 
		this.usersService.deletePublisher(this.userName, this.currentChosenUserRole).subscribe();
    } 
    createOperator(event:any) { 
		this.usersService.createOperator(new User(this.userName, this.userEmail, this.userRole), this.currentChosenUserRole)
		.subscribe((data: User) => {this.userName=data.name, this.userEmail=data.email, this.userRole = data.role;});
    } 
    updateOperator(event:any) { 
		 this.usersService.updateOperator(new User(this.userName, this.userEmail, this.userRole), this.currentChosenUserRole)
		 .subscribe((data: User) => {this.userName = data.name, this.userEmail = data.email, this.userRole = data.role;});
    } 
    deleteOperator(event:any) { 
		this.usersService.deleteOperator(this.userName, this.currentChosenUserRole).subscribe()
    } 
    createApplication(event:any) {
		if (!(this.applicationContentTypes instanceof Array)){
			this.applicationContentTypes = [this.applicationContentTypes]
			this.applicationsService.createApplication(new Application(this.applicationName, this.applicationType, this.applicationContentTypes, new User(this.applicationUserName, this.applicationUserEmail, this.applicationUserRole)), this.currentChosenUserRole)
			.subscribe((data: Application) => {this.applicationName=data.name, this.applicationType=data.applicationType, this.applicationContentTypes = data.contentTypes, this.applicationUserName = data.user.name, this.applicationUserEmail = data.user.email, this.applicationUserRole = data.user.role;});
		} else {
			this.applicationsService.createApplication(new Application(this.applicationName, this.applicationType, this.applicationContentTypes, new User(this.applicationUserName, this.applicationUserEmail, this.applicationUserRole)), this.currentChosenUserRole)
			.subscribe((data: Application) => {this.applicationName=data.name, this.applicationType=data.applicationType, this.applicationContentTypes = data.contentTypes, this.applicationUserName = data.user.name, this.applicationUserEmail = data.user.email, this.applicationUserRole = data.user.role;});
		}
	} 
    updateApplication(event:any) {
		if (!(this.applicationContentTypes instanceof Array)){
			this.applicationContentTypes = [this.applicationContentTypes]
			this.applicationsService.createApplication(new Application(this.applicationName, this.applicationType, this.applicationContentTypes, new User(this.applicationUserName, this.applicationUserEmail, this.applicationUserRole)), this.currentChosenUserRole)
			.subscribe((data: Application) => {this.applicationName=data.name, this.applicationType=data.applicationType, this.applicationContentTypes = data.contentTypes, this.applicationUserName = data.user.name, this.applicationUserEmail = data.user.email, this.applicationUserRole = data.user.role;});
		} else {
			this.applicationsService.updateApplication(new Application(this.applicationName, this.applicationType, this.applicationContentTypes, new User(this.applicationUserName, this.applicationUserEmail, this.applicationUserRole)), this.currentChosenUserRole)
			.subscribe((data: Application) => {this.applicationName=data.name, this.applicationType=data.applicationType, this.applicationContentTypes = data.contentTypes, this.applicationUserName = data.user.name, this.applicationUserEmail = data.user.email, this.applicationUserRole = data.user.role;});
		}
   } 
    deleteApplication(event:any) { 
		this.applicationsService.deleteApplication(this.applicationName, this.currentChosenUserRole).subscribe();
    }
}