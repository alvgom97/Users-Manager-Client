import { Component, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {name:"Users List", route:"users", icon:"format_list_bulleted"}, 
    {name:"New User", route:"users/new", icon:"add_circle_outline"}
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DrawerDialogComponent);
    
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation.html',
})
export class DrawerDialogComponent {}