import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.buildForm();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      ApplianceType: new FormControl(''),
      Model: new FormControl(''),
      Brand: new FormControl('')

    })
  }

}
