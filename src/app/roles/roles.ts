import {Component, Input, Injectable} from '@angular/core';
import {HttpUserPermissionService} from './../user.permissions.service';
import {SyncService} from './../sync.service';
import {HttpApplicationsService} from './../applications.service';
import {HttpUsersService} from './../users.service';

@Component({
  selector: 'roles-component',
  templateUrl: 'roles.html',
  styleUrls: ['roles.css'],
  providers: [HttpUserPermissionService, SyncService, HttpApplicationsService, HttpUsersService]
})
export class UserRolesComponent {
 
  selectedRole: string;
  userRoles: string[] = ['Admin', 'Operator', 'Publisher'];
  
  constructor(private userPermissionService: HttpUserPermissionService, private syncService: SyncService){}
  
  press(role: any): void {
	this.userPermissionService.getUserPermissionsByRole(role).subscribe((data: any) => {
		this.syncService.syncPermissions(data);
	});
	this.syncService.syncRole(role);
  }
}