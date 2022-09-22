import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersPopupComponent } from './users-popup/users-popup.component';
import { IdentityUserView, IUserCreateFromBack, TypeUser } from '../../../models/user';
import { ConfigurationService } from '../../../services/configuration.service';
import { IdentityUserService } from '../../../services/identity-user.service';
import { ErrorService } from '../../../services/error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { EnterpriseService } from 'app/services/enterprise.service';
import { EnterpriseView } from 'app/models/business';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: egretAnimations
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  dataSource: any;
  userView: IdentityUserView;
  listUserNormal: IdentityUserView[];
  companiesList: EnterpriseView[] = [];
  content: boolean;
  enterpriseID: Guid;
  selection: SelectionModel<IdentityUserView>;

  constructor(private dialog: MatDialog,
    private loader: AppLoaderService,
    private _identityService: IdentityUserService,
    private _errorService: ErrorService,
    private _enterpriseService: EnterpriseService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private _configService: ConfigurationService) {
    this.selection = new SelectionModel<IdentityUserView>(false, [])
    this.userView = _configService.GetCurrentUser();
    this.activatedRoute.params.subscribe(parametros => {
      this.enterpriseID = parametros['id'];
      this.setInitialList();
    });
  }

  public get hasSelectedChecked() {
    return this.selection.selected.length == 1;
  }

  setInitialList() {
    if (this.enterpriseID) {
      this.GetUserByID(this.enterpriseID);
      return;
    }
    if (this.userView.typeUser == TypeUser.ClientAdminEnterprise) {
      this.GetUserByID(this.userView.enterpriseId);
      return;
    }
    this.GetUserAllNormal();
  }

  ngOnInit() {
    if (this.userView.typeUser == TypeUser.Admin) {
      this.loader.open();
      this._enterpriseService.EnterpriseAll().subscribe((result: EnterpriseView[]) => {
        this.loader.close();
        this.companiesList = result
      }, error => {
        this.loader.close();
        var message = this._errorService.HadlingError(error);
        this._errorService.SwalAlert(message.message, '', message.type);
        this.loader.close();
      })
    }
  }

  GetUserAllNormal() {
    this._identityService.IdentityUserAll()
      .subscribe((response: IdentityUserView[]) => {
        this.listUserNormal = response;
        console.log('GetUserNormal', this.listUserNormal);
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          this.setTable();
        });
  }

  GetUserByID(idEnterprise: Guid) {
    this._identityService.IdentityUserByEnterpriseId(idEnterprise)
      .subscribe((response: IdentityUserView[]) => {
        this.listUserNormal = response;
        console.log('GetUserByEmpresa', this.listUserNormal);
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          this.setTable();
        });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public doFilterSelect = (value: string) => {
    let temporalArray = value == '' ? this.listUserNormal : this.listUserNormal.filter((obj: IdentityUserView) => obj.enterpriseId?.toString()?.includes(value));
    this.dataSource = new MatTableDataSource(temporalArray);
  }

  setTable() {
    this.content = true;
    this.displayedColumns = ['action', 'name', 'email', 'isActive'];
    this.dataSource = new MatTableDataSource(this.listUserNormal);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 600);
  }

  getUser(IdentityUser: IdentityUserView) {
    let scope = this;
    return new Promise(function (resolve, recject) {
      scope._identityService.getUserById(IdentityUser.identityUserId).subscribe(
        (result: IdentityUserView) => resolve(result),
        (error: any) => recject(error)
      )
    })
  }

  async openPopUp(data: IdentityUserView | null, isNew?) {
    let dataPayload: any = data == null ? null : await this.getUser(this.selection.selected[0] ?? null);
    console.log(dataPayload)
    let title = isNew ? 'Agregar nuevo usuario' : 'Actualizar usuario';
    let dialogRef: MatDialogRef<any> = this.dialog.open(UsersPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: dataPayload, enterprises: this.companiesList, currentUser: this.userView }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res);
        if (!res) {
          // If user press cancel
          return;
        }
        if (isNew) {
          this.loader.open();
          let objectToSave: IUserCreateFromBack = {
            name: res.name,
            email: res.email,
            identificationNumber: res.identification,
            city: res.city,
            phone: res.phone,
            address: res.address,
            enterpriseId: res.enterprise,
            contactSellerLink: this.userView.contactSellerLink,
            typeUser: 4
          };
          this._identityService.CreateUserFromBack(objectToSave).subscribe((result: IUserCreateFromBack) => {
            console.log(result);
            this.loader.close();
            this._errorService.SwalAlert('Mensaje del sistema', 'El usuario fue guardado', 'success');
            this.setInitialList();
          }, error => {
            this.loader.close();
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
          });
        }
        /* else {
          this.crudService.updateItem(data._id, res)
            .subscribe(data => {
              this.items = data;
              this.loader.close();
              this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            })
        } */
      })
  }

  individualSelection(marca: any, event: MatSlideToggleChange) {
    this.selection.clear()
    if (event.checked) {
      this.selection.select(marca)
      return;
    }
    this.selection.deselect(marca)
  }
}