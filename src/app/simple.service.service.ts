import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleServiceService {

  getSimpleObservable(): Observable<number> {
    return new Observable<number>(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });
  } 
  constructor() { }
}
