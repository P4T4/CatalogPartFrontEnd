import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { IdentityUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { ErrorService } from 'app/services/error.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
    public currentAccount: IdentityUserView

    constructor(
        public dialog: MatDialog,
        private _errorService: ErrorService,
        private _sanitizer: DomSanitizer,
        private _configService: ConfigurationService,
    ) {
        this.currentAccount = _configService.GetCurrentUser()
    }

    ngOnInit() { }

}
