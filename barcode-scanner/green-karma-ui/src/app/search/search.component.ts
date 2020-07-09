import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  scanBarCode: boolean = false;
  searchBar: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openSearchBar() {
    this.scanBarCode = false;
    this.searchBar = true;
  }

  openScanBarcode() {
    this.searchBar = false;
    this.scanBarCode = true;
  }

}
