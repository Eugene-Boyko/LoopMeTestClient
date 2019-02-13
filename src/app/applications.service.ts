import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HttpApplicationsService{
  
    constructor(private http: HttpClient){ }

    getApplicationsByRole(role: string) {
		if (role == 'Admin') {
             return Observable.of(null);
		}
		if (role == 'Operator') {
             return this.http.get('http://localhost:8080/operator/getAllApplications');
		}
		if (role == 'Publisher') {
			return Observable.of(null);
		}
    }
	
	getApplicationsByPublisherName(publisherName: string) {
        return this.http.get('http://localhost:8080/publisher/getApplicationsByPublisherName?publisherName=' + publisherName);
	}
	
	createApplication(application: any, role: string) {
		const body = {name: application.name, applicationType: application.applicationType, contentTypes: application.contentTypes, user: application.user};
		if (role == 'Operator') {
			return this.http.post('http://localhost:8080/operator/createApplication', body);
		}
		if (role == 'Publisher') {
			return this.http.post('http://localhost:8080/publisher/createApplication', body);
		}
	}
	updateApplication(application: any, role: string) {
		const body = {name: application.name, applicationType: application.applicationType, contentTypes: application.contentTypes, user: application.user};
		if (role == 'Operator') {
			return this.http.post('http://localhost:8080/operator/updateApplication', body);
		}
		if (role == 'Publisher') {
			return this.http.post('http://localhost:8080/publisher/updateApplication', body);
		}
	}
	deleteApplication(applicationName: string, role: string) {
		if (role == 'Operator') {
			return this.http.delete('http://localhost:8080/operator/deleteApplication?businessKey=' + applicationName);
		}
		if (role == 'Publisher') {
			return this.http.delete('http://localhost:8080/publisher/deleteApplication?businessKey='+ applicationName);
		}
	}
}