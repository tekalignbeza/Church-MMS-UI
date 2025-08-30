import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member-list/member-list.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';

const routes: Routes = [
  { path: 'new', component: FamilyDetailsComponent },
  { path: 'family-details', component: FamilyDetailsComponent },
  { path: 'list', component: MemberListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }