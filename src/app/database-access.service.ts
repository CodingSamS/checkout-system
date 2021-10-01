import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class DatabaseAccessService {

  database: {};

  constructor(private electronService: ElectronService) {
    if(this.electronService.isElectronApp) {
      const data = this.electronService.ipcRenderer.sendSync('getDatabase');
      if (data == null) {
        this.database = {};
      } else {
        this.database = JSON.parse(data);
      }
    } else {
      // for testing purposes: no electron support present -> use a sample database
      this.database = {
        "event": "Liga 2021",
        "content": {
          "lastUpdated": "2021-10-01T13:03:40+00:00",
          "checkoutItems": [
            {
              "name": "Käsestange",
              "price": 3.50,
              "counter": 0
            },
            {
              "name": "Schinkenstange",
              "price": 4.00,
              "counter": 0
            },
            {
              "name": "Kuchen",
              "price": 1.00,
              "counter": 0
            }
          ]
        }
      }
    }
  }

  writeDatabase(): void {
    if(this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.send('writeDatabase', JSON.stringify(this.database));
    }
  }

}
