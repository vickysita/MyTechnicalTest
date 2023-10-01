import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  img: string;
  name: string;
}


@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.css']
})
export class PokemonDialogComponent implements OnInit {
  img: string = ''; 
  name: string = '';

  constructor(public dialogRef: MatDialogRef<PokemonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.img = this.data.img;
    this.name = this.data.name;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
