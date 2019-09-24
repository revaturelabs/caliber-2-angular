import { Injectable } from '@angular/core';

import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private configOptions: Object = {
    
    };

  constructor(private toastr: ToastrService) { }

  public success(message: string, title:string): void {
    this.toastr.success(message, title, this.configOptions);
  }

  public warning(message: string, title:string): void {
    this.toastr.warning(message, title, this.configOptions);
  }

  public error(message: string, title:string): void {
    this.toastr.error(message, title, this.configOptions);
  }

  public info(message: string, title:string): void {
    this.toastr.info(message, title, this.configOptions);
  }
}
