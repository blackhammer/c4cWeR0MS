import { Component } from '@angular/core';

interface TabConfig {
  title: string;
  link: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'green-karma-ui';

  public tabs: Array<TabConfig> = [
    { title: 'Search', link: 'search'}, 
    { title: 'Recycle', link: 'recycle'},
    { title: 'About', link: 'about'}
  ];
}
