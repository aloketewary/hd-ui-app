import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, MatButtonToggleModule
} from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    ScrollingModule,
    MatSlideToggleModule,
    DragDropModule,
    MatChipsModule,
  ],
  exports: [
    MatBadgeModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatRadioModule,
    MatTabsModule,
    ScrollingModule,
    MatSlideToggleModule,
    DragDropModule,
    MatChipsModule,
  ]
})
export class MaterailImportModule { }
