import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { AttedanceLiveComponent } from './attedance-live/attedance-live.component';

const routes: Routes = [
  { path: 'list', component: MeetingListComponent },
  { path: 'new', component: MeetingDetailsComponent },
  { path: 'attedance', component: AttedanceLiveComponent },
  { path: ':id', component: MeetingDetailsComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }