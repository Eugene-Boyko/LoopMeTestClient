import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HttpUsersService{
  
    constructor(private http: HttpClient){ }
	
    getUsersByRole(role: string) {
		if (role == 'Admin') {
             return this.http.get('http://localhost:8080/admin/getAllUsers');
		}
		if (role == 'Operator') {
             return this.http.get('http://localhost:8080/operator/getAllPublishers');
		}
		if (role == 'Publisher') {
             return Observable.of(null);
		}
    }
	
	createPublisher(user: any, role: string) {
		if (role == 'Admin') {
			return this.http.get('http://localhost:8080/admin/createPublisher?name=' + user.name + '&email=' + user.email);
		}
		if (role == 'Operator') {
			return this.http.get('http://localhost:8080/operator/createPublisher?name=' + user.name + '&email=' + user.email);
		}
	}
	updatePublisher(user: any, currentUserRole: string) {
		const body = {name: user.name, email: user.email, role: user.role};
		if (currentUserRole == 'Admin') {
			return this.http.post('http://localhost:8080/admin/updatePublisher',  body);
		}
		if (currentUserRole == 'Operator') {
			return this.http.post('http://localhost:8080/operator/updatePublisher', body);
		}
	}
	deletePublisher(userName: string, role: string) {
		if (role == 'Admin') {
			return this.http.delete('http://localhost:8080/admin/deletePublisher?businessKey=' + userName);
		}
		if (role == 'Operator') {
			return this.http.delete('http://localhost:8080/operator/deletePublisher?businessKey=' + userName);
		}
	}
	createOperator(user: any, role: string) {
		if (role == 'Admin') {
			return this.http.get('http://localhost:8080/admin/createOperator?name=' + user.name + '&email=' + user.email);
		}
	}
	updateOperator(user: any, role: string) {
		const body = {name: user.name, email: user.email, role: user.role};
		if (role == 'Admin') {
			return this.http.post('http://localhost:8080/admin/updateOperator', body);
		}
	}
	deleteOperator(userName: string, role: string) {
		if (role == 'Admin') {
			return this.http.delete('http://localhost:8080/admin/deleteOperator?businessKey=' + userName);
		}
	}
}