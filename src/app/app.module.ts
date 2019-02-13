import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatRadioModule, MatSelectModule} from '@angular/material';

import { UserComponent }  from './users/user.component';
import { ApplicationComponent }  from './applications/applications.component';
import { UserRolesComponent }  from './roles/roles';
import { ButtonOperationComponent } from './operations/buttons-operations';

import { HttpClientModule }   from '@angular/common/http';

@NgModule({
    imports:      [ 
		BrowserModule, 
		FormsModule, 
		BrowserAnimationsModule,
		MatButtonModule, 
		MatCardModule, 
		MatInputModule, 
		MatListModule, 
		MatToolbarModule, 
		MatRadioModule,
		MatSelectModule,
		HttpClientModule],
    declarations: [UserRolesComponent, UserComponent, ButtonOperationComponent, ApplicationComponent],
    bootstrap:    [UserRolesComponent]
})
export class AppModule { }