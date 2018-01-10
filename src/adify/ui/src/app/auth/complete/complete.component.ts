import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UserService, JwtService } from "app/shared";

@Component({
    selector: 'app-complete',
    template: 'Waiting...',
})
export class CompleteComponent implements OnInit {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        let token = this.route.snapshot.params['token'];
        this.jwtService.saveToken(token);
        this.userService.populate();
        this.router.navigateByUrl('/');
    }

}
