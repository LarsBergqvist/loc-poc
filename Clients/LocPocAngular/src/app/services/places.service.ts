import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private readonly http: HttpClient) { }

  getPlaces(): Promise<Place[]> {
    return this.http.get<Place[]>('https://localhost:5001/api/places').toPromise();
  }
}
