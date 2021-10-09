import { Injectable } from '@angular/core';
import { ElectronService } from "./electron.service";
import {CheckoutItem, Event} from './event';

@Injectable({
  providedIn: 'root'
})
export class DatabaseAccessService {

  database: Array<Event>;
  currentEvent: Event | undefined;

  constructor(private electronService: ElectronService) {
    if(this.electronService.isElectron) {
      const data = this.electronService.ipcRenderer?.sendSync('getDatabase');
      this.database = JSON.parse(data);
    } else {
      this.database = []
      throw new Error("No Electron support present");
    }
    // for testing purposes
    this.database = [{
      "event": "Liga 2021",
      "content": {
        "lastUpdated": "2021-10-01T13:03:40+00:00",
        "internal": {
          "0": {
            "name": "Käsestange",
            "price": 3.50,
            "counter": 0
          },
          "1": {
            "name": "Schinkenstange",
            "price": 4.00,
            "counter": 0
          },
          "2": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "3": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "4": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "5": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "6": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "7": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "8": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "9": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "10": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "11": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "12": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "13": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          }
        },
        "external": {
          "0": {
            "name": "Käsestange",
            "price": 3.50,
            "counter": 0
          },
          "1": {
            "name": "Schinkenstange",
            "price": 4.00,
            "counter": 0
          },
          "2": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "3": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "4": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "5": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "6": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "7": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "8": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "9": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "10": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "11": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "12": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          },
          "13": {
            "name": "Kuchen",
            "price": 1.00,
            "counter": 0
          }
        }
      }
    }]
    this.currentEvent = this.getNewestEvent();
  }

  writeDatabase(data: Record<number, CheckoutItem>, eventName: string, internal: boolean): void {
    // Check if the Event is present in database + get the index
    let index = undefined;
    for (let i = 0; i < this.database.length; i++) {
      if (this.database[i].event == eventName) {
        index = i;
        break;
      }
    }
    if (index == undefined) {
      return;
    }
    // Overwrite the data attributes
    if(this.electronService.isElectron) {
      for (const key in Object.keys(data)) {
        if (internal) {
          this.database[index].content.internal[key].counter += data[key].counter;
        } else {
          this.database[index].content.external[key].counter += data[key].counter;
        }
      }
      this.database[index].content.lastUpdated = JSON.stringify(new Date());
      this.electronService.ipcRenderer?.send('writeDatabase', JSON.stringify(this.database));
    }
  }

  getNewestEvent(): Event | undefined {
    if (0 < this.database.length) {
      this.sortDatabase();
      return this.database[0];
    } else {
      return undefined;
    }
  }

  getCurrentEvent(): Event | undefined {
    if (this.currentEvent == undefined) {
      this.currentEvent = this.getNewestEvent();
    }
    return this.currentEvent;
  }

  getSortedDatabase(reverse: boolean): Array<Event> {
    this.sortDatabase();
    if (reverse) {
      return this.database.reverse()
    } else {
      return this.database;
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
