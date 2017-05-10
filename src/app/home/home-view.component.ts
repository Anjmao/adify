import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home-view',
  template: `
    <h3 (click)="onClick()">{{subs | async}}</h3>
    <div *ngIf="show">Hidden secret :)</div>
  `
})
export class HomeView implements OnInit {
  public subs: Observable<string>;

  show = false

  constructor(private http: TransferHttp) { }

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8000/data').map(data => {
      return `${data.greeting} ${data.name}`;
    });
  }

  onClick() {
    this.show = true
  }
}
