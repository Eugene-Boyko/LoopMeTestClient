import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class HttpUserPermissionService{
  
    constructor(private http: HttpClient){ }
      
    getUserPermissionsByRole(role: string){
		if (role == 'Admin') {
             return this.http.get('http://localhost:8080/getAdminPermissions');
		}
		if (role == 'Operator') {
             return this.http.get('http://localhost:8080/getOperatorPermissions');
		}
		if (role == 'Publisher') {
             return this.http.get('http://localhost:8080/getPublisherPermissions');
		}
    }
}