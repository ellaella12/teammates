import { NgModule } from '@angular/core';
import { InstructorSessionViewPageComponent } from './instructor-session-view-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadingRetryModule } from '../../components/loading-retry/loading-retry.module';
import { SessionEditFormModule } from '../../components/session-edit-form/session-edit-form.module';
import { PreviewSessionPanelModule } from '../../components/preview-session-panel/preview-session-panel.module';
import { QuestionEditFormModule } from '../../components/question-edit-form/question-edit-form.module';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerModule } from '../../components/loading-spinner/loading-spinner.module';

const routes: Routes = [
  {
    path: '',
    component: InstructorSessionViewPageComponent,
  },
];

/**
 * Module for instructor session edit page.
 */
@NgModule({
  imports: [
    CommonModule,
    QuestionEditFormModule,
    SessionEditFormModule,
    RouterModule.forChild(routes),
    LoadingRetryModule,
    LoadingSpinnerModule,
    PreviewSessionPanelModule,
  ],
  declarations: [
    InstructorSessionViewPageComponent,
  ],
  exports: [
    InstructorSessionViewPageComponent,
  ],
})
export class InstructorSessionViewPageModule { }
