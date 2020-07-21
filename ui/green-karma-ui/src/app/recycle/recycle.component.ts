import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { ɵangular_packages_platform_browser_platform_browser_c } from '@angular/platform-browser';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;

  constructor(private mapsApiLoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.zoom = 11;
    this.latitude = 45.516;
    this.latitude = -73.656;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.mapsApiLoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: {'country': 'CA'}
        
      });
      autocomplete.addListener('place_changed', ()=> {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null)
          {
            return;
          }
          const latlong = {
            latitude: place.geometry.location.lat(),
            longitude : place.geometry.location.lng()
          };

          this.latlongs.push(latlong);
          this.searchControl.reset();
        });
      });
    });
  }

  private setCurrentPosition()
  {
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=> {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 11;
      })
    }
  }

}
