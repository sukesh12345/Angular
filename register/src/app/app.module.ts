import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TestComponent } from './login/test.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {freeApiService} from './services/freeapi.service';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TestComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: DashboardComponent ,resolve:[AuthGuard]}
    ])
    
  ],
  providers: [freeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
