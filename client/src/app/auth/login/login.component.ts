import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    authBaseUrl = environment.api_url;
    constructor() { }

    ngOnInit() {
    }

}
