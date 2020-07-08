import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { RecycleComponent } from './recycle/recycle.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent }, 
  { path: 'recycle', component: RecycleComponent },
  { path: '**', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
