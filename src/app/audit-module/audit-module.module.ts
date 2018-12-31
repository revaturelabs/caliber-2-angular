import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from '../Audit/Components/audit/audit.component';
import { ToolbarComponent } from '../Audit/Components/toolbar/toolbar.component';
import { AssociateComponent } from '../Audit/Components/associate/associate.component';
import { OverallComponent } from '../Audit/Components/overall/overall.component';

@NgModule({
  imports: [
    CommonModule,
    AuditRoutingModule,
    FormsModule
  ],
  declarations: [
    AuditComponent, 
    ToolbarComponent, 
    AssociateComponent, 
    OverallComponent
  ]
})
export class AuditModule { }
