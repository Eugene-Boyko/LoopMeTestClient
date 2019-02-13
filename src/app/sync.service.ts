import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
  
@Injectable()
export class SyncService{
	
    syncPermissions$: Observable<any>;
	syncRole$: Observable<string>;
	syncUser$: Observable<any>;
	syncApplication$: Observable<any>;
	
    private syncPermissionsSource = new Subject<any>();
    private syncRoleSource = new Subject<string>();
    private syncUserSource = new Subject<any>();
    private syncApplicationSource = new Subject<any>();

    constructor() {
        this.syncPermissions$ = this.syncPermissionsSource.asObservable();
        this.syncRole$ = this.syncRoleSource.asObservable();
        this.syncUser$ = this.syncUserSource.asObservable();
        this.syncApplication$ = this.syncApplicationSource.asObservable();
    }

    syncPermissions(data: string[]) {
        this.syncPermissionsSource.next(data);
    }
    syncRole(role: string) {
        this.syncRoleSource.next(role);
    }
    syncUser(user: any) {
        this.syncUserSource.next(user);
    }
    syncApplication(application: any) {
        this.syncApplicationSource.next(application);
    }
}