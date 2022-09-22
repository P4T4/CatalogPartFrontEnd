import { Component, OnInit, ViewChild } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { EnterprisesPopupComponent } from './enterprises-popup/enterprises-popup.component';
import { EnterpriseService } from '../../../services/enterprise.service';
import { EnterpriseView, IEnterpriseEditInfo } from 'app/models/enterprises';
import { ErrorService } from '../../../services/error.service';
import { Guid } from 'guid-typescript';
import Swal from 'sweetalert2';
import { IdentityUserService } from 'app/services/identity-user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styleUrls: ['./enterprises.component.scss'],
  animations: egretAnimations
})
export class EnterprisesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [];
  dataSource: any;
  listEnterprises: EnterpriseView[] = [];
  content: boolean;
  selection: SelectionModel<EnterpriseView>;

  constructor(private dialog: MatDialog,
    private _enterpriseService: EnterpriseService,
    private _identityUserService: IdentityUserService,
    private _errorService: ErrorService,
    private loader: AppLoaderService) {
    this.selection = new SelectionModel<EnterpriseView>(false, [])
    /*this.listEnterprises.push({
      enterpriseId: Guid.create(),
      identificationNumber: "string",
      businessName: "string",
      businessCity: "string",
      businessAdress: "string",
      businessPhone: "string",
      isRegister: true
    });
    this.listEnterprises.push({
      enterpriseId: Guid.create(),
      identificationNumber: "string",
      businessName: "string",
      businessCity: "string",
      businessAdress: "string",
      businessPhone: "string",
      isRegister: false
    });*/
  }

  public get hasSelectedChecked() {
    return this.selection.selected.length == 1;
  }

  ngOnInit() {
    this.GetEnterprises();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  GetEnterprises() {
    this._enterpriseService.EnterpriseAll()
      .subscribe((response: EnterpriseView[]) => {
        this.listEnterprises = response;
        // console.log('GetEnterprises', this.listEnterprises);
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          this.content = true;
          this.displayedColumns = ['action', 'identificationNumber', 'businessName', 'businessCity', 'businessPhone', 'isRegister'];
          this.dataSource = new MatTableDataSource(this.listEnterprises);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
  }

  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? 'Nueva Empresa' : 'Editar Empresa';
    let dialogRef: MatDialogRef<any> = this.dialog.open(EnterprisesPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: this.selection.selected[0] ?? {} }
    })
    dialogRef.afterClosed()
      .subscribe((res: IEnterpriseEditInfo) => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          Swal.fire('Mensaje del sistema', 'funcionalidad aún no disponible', 'warning')
        } else {
          this._enterpriseService.updateEnterprise(res).subscribe((result) => {
            this._identityUserService.sendMail(res.contactPersonName, res.contactPersonEmail).subscribe((result) => {
              console.log(result)
              this.loader.close()
              this._errorService.SwalAlert('Proceso exitoso', 'Usuario actualizado', 'success')
            }, error => {
              this.loader.close()
              var message = this._errorService.HadlingError(error);
              this._errorService.SwalAlert(message.message, '', message.type);
            })
          }, error => {
            this.loader.close()
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
          })
        }
      })
  }

  individualSelection(empresa: any, event: MatSlideToggleChange) {
    this.selection.clear()
    if (event.checked) {
      this.selection.select(empresa)
      return;
    }
    this.selection.deselect(empresa)
  }
}
