import { Component, Input, ViewChild, OnInit,AfterViewInit } from '@angular/core';
import { ITransfer } from '../_models/itransfer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer-table',
  templateUrl: './transfer-table.component.html',
  styleUrls: ['./transfer-table.component.scss']
})
export class TransferTableComponent implements OnInit,AfterViewInit {
  @Input() transfers: ITransfer[];
  displayedColumns: string[] = ['date', 'type', 'devise', 'amount', 'done', 'from', 'to']
  public dataSource: MatTableDataSource<ITransfer>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ITransfer>(this.transfers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.transfers)
  }



ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


}
