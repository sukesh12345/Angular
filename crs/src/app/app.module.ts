import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { LoginRegisterComponent } from './login-register/login-register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateComponent } from './update/update.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ApplicationsComponent } from './applications/applications.component';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import { AppliedjobsComponent } from './appliedjobs/appliedjobs.component';
import {MatDividerModule, MatDivider} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AddSkillsComponent } from './add-skills/add-skills.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    DashboardComponent,
    UpdateComponent,
    ApplicationsComponent,
    AppliedjobsComponent,
    AddSkillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule,
    // MaterialModue,
    RouterModule.forRoot([
      { path: '', component: LoginRegisterComponent },
      { path: 'profile', component: DashboardComponent ,resolve:[AuthGuard]},
      { path: 'update', component: UpdateComponent ,resolve:[AuthGuard]},
      { path: 'applications' ,  component: ApplicationsComponent ,resolve:[AuthGuard]},
      { path: 'appliedjobs' ,  component: AppliedjobsComponent ,resolve:[AuthGuard]},
      { path: 'addskills' ,  component: AddSkillsComponent ,resolve:[AuthGuard]}
    ]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
