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
import { SelectedStudentsComponent } from './selected-students/selected-students.component';
import { SelectedJobsComponent } from './selected-jobs/selected-jobs.component';
import { AboutComponent } from './about/about.component';
import { SkilsModalComponent } from './skils-modal/skils-modal.component';
import { JobDeleteConfirmationComponent } from './job-delete-confirmation/job-delete-confirmation.component';
import { LandingComponent } from './landing/landing.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UploaadResumeBottomSheetComponent } from './uploaad-resume-bottom-sheet/uploaad-resume-bottom-sheet.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { RejectedStudentsComponent } from './rejected-students/rejected-students.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    DashboardComponent,
    UpdateComponent,
    ApplicationsComponent,
    AppliedjobsComponent,
    AddSkillsComponent,
    SelectedStudentsComponent,
    SelectedJobsComponent,
    AboutComponent,
    SkilsModalComponent,
    JobDeleteConfirmationComponent,
    LandingComponent,
    UploaadResumeBottomSheetComponent,
    RejectedStudentsComponent
  ],
  entryComponents: [
    SkilsModalComponent,
    JobDeleteConfirmationComponent,
    UploaadResumeBottomSheetComponent
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
    AlertModule.forRoot(),
    CarouselModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatListModule,
    // MaterialModue,
    RouterModule.forRoot([
      { path: 'landing', component: LandingComponent},
      { path: '', component: LoginRegisterComponent },
      { path: 'profile', component: DashboardComponent ,resolve:[AuthGuard]},
      { path: 'update', component: UpdateComponent ,resolve:[AuthGuard]},
      { path: 'applications' ,  component: ApplicationsComponent ,resolve:[AuthGuard]},
      { path: 'appliedjobs' ,  component: AppliedjobsComponent ,resolve:[AuthGuard]},
      { path: 'addskills' ,  component: AddSkillsComponent ,resolve:[AuthGuard]},
      { path: 'selectedstudents' , component: SelectedStudentsComponent ,resolve:[AuthGuard]},
      { path: 'selectedjobs' , component: SelectedJobsComponent ,resolve:[AuthGuard]},
      { path: 'about' , component: AboutComponent },
      { path: 'rejectedstudents' , component: RejectedStudentsComponent}
    ]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
