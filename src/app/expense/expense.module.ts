import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExpenseDetailsComponent} from './expenset-details/expense-details.component';
import {ExpensetListComponent} from './expenset-list/expenset-list.component';
import {ExpenseDataTableComponent} from './expense-data-table/expense-data-table.component';
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [ExpenseDetailsComponent, ExpensetListComponent, ExpenseDataTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ExpenseDetailsComponent, ExpensetListComponent,ExpenseDataTableComponent]
})
export class ExpenseModule { }
