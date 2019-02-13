import {Component} from '@angular/core';
import {HttpUsersService} from './../users.service';
import {SyncService} from './../sync.service';

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
    selector: 'user-component',
    templateUrl: './user.component.html',
	styleUrls: ['./user.component.css'],
	providers: [HttpUsersService]
})
export class UserComponent { 
	
	currentUser: User;

    users: User[];
	constructor(private usersService: HttpUsersService, private syncService: SyncService){
		this.syncService.syncRole$.subscribe((role: string) => {
			this.usersService.getUsersByRole(role).subscribe((users: any) => {
				this.users = users;
			});
		});
	}
	
	click(name: string, email: string, role: string): void {
		this.currentUser = new User(name, email, role);
		this.syncService.syncUser(this.currentUser);
	}
}