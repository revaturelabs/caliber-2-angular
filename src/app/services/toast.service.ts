import { Injectable } from '@angular/core';

import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private configOptions: Object = 
    {timeOut: 2000,
     positionClass: 'toast-bottom-right',
     progressBar: true
     };

  constructor(private toastr: ToastrService) { }

  public message(message: string, title:string): void {
    this.toastr.success(message, title, this.configOptions);
  }
}
