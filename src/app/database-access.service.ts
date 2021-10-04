import { Injectable } from '@angular/core';
import { ElectronService } from "./electron.service";

@Injectable({
  providedIn: 'root'
})
export class DatabaseAccessService {

  database: Array<any>;
  currentEvent: {} | undefined;

  constructor(private electronService: ElectronService) {
    if(this.electronService.isElectron) {
      const data = this.electronService.ipcRenderer?.sendSync('getDatabase');
      if (data == null) {
        this.database = [];
      } else {
        this.database = JSON.parse(data);
      }
    } else {
      throw new Error("No Electron support present");
    }
    // for testing purposes
    this.database = [{
      "event": "Liga 2021",
      "content": {
        "lastUpdated": "2021-10-01T13:03:40+00:00",
        "internal": {
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
        },
        "external": {
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
    }]
    this.currentEvent = this.getNewestEvent();
  }

  writeDatabase(): void {
    if(this.electronService.isElectron) {
      this.electronService.ipcRenderer?.send('writeDatabase', JSON.stringify(this.database));
    }
  }

  getNewestEvent(): any | undefined {
    if (0 < this.database.length) {
      this.sortDatabase();
      return this.database[0];
    } else {
      return undefined;
    }
  }

  sortDatabase(): void {
    this.database.sort((obj1, obj2) => {
      if(new Date(obj1.content.lastUpdated) < new Date(obj2.content.lastUpdated)) {
        return 1;
      } else if(new Date(obj2.content.lastUpdated) < new Date(obj1.content.lastUpdated)) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}
