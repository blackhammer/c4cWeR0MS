import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  scanBarCode: boolean = false;
  searchBar: boolean = true;
  results: boolean = false;
  products: Product [];
  stars = [];
  value: Number;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openSearchBar() {
    this.scanBarCode = false;
    this.searchBar = true;
    this.results = false;
  }

  openScanBarcode() {
    this.searchBar = false;
    this.scanBarCode = true;
    this.results = false;
  }

  DisplayResult(search: any) {
    this.searchBar = false;
    this.scanBarCode = false;
    this.results = true;
    this.products = search;
  }

  calculateRating (product: any) {
    this.stars = [];
    this.value = (product.rating_data.efficiency + product.rating_data.energy + product.rating_data.CO2 + product.rating_data.otherGG 
      + product.rating_data.water + product.rating_data.plastic + product.rating_data.lifetime + product.rating_data.recyclability + product.rating_data.repairability);

    if (this.value < 1200) {
      this.stars.push(1,2,3,4,5)
    } else if (this.value > 1200 && this.value <= 1300) {
      this.stars.push(1,2,3,4)
    } else if (this.value > 1300 && this.value <= 1400) {
      this.stars.push(1,2,3)
    } else if (this.value > 1400 && this.value <= 1500) {
      this.stars.push(1,2)
    } else  {
      this.stars.push(1)
    }
  }

  openProfile() {
    this.router.navigate(['./profile'])
  }
}
