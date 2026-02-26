import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { DetailsModule } from '../pages/details/details.module';
import { DetailsComponent } from '../pages/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [
    DashboardModule,
    DetailsModule,
    RouterModule.forChild(routes),
  ],
})
export class RemoteModule {}
