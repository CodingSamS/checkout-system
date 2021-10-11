import { Injectable } from '@angular/core';
import { ElectronService } from "./electron.service";
import { Event, SimpleCheckoutItem} from './event';

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
        "lastUpdated": new Date("2021-10-10T22:41:14.211Z"),
        "items": {
          "0": {
            "name": "Käsestange",
            "price": 3.50,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "1": {
            "name": "Schinkenstange",
            "price": 4.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "2": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "3": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "4": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "5": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "6": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "7": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "8": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "9": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "10": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "11": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "12": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          },
          "13": {
            "name": "Kuchen",
            "price": 1.00,
            "counterInternal": 0,
            "counterExternal": 0
          }
        }
      }
    }]
    this.currentEvent = this.getNewestEvent();
  }

  writeDatabase(): void {
    // Overwrite the database file
    if(this.electronService.isElectron) {
      this.electronService.ipcRenderer?.send('writeDatabase', JSON.stringify(this.database));
    }
  }

  updateCounter(data: Record<number, SimpleCheckoutItem>, eventName: string, internal: boolean): void {
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
    for (const key in Object.keys(data)) {
      if (internal) {
        this.database[index].content.items[key].counterInternal += data[key].counter;
      } else {
        this.database[index].content.items[key].counterExternal += data[key].counter;
      }
    }
    this.database[index].content.lastUpdated = new Date();
    this.writeDatabase();
  }

  overwriteEvent(event: Event): void {
    let index = -1;
    for (let i = 0; i < this.database.length; i++) {
      if (this.database[i].event == event.event) {
        index = i;
        break;
      }
    }
    if (0 <= index) {
      this.database.splice(index, 1);
      if (this.currentEvent?.event == event.event) {
        this.currentEvent = event;
      }
    }
    this.database.push(event);
    this.writeDatabase();
  }

  setCurrentEvent(eventName: string): boolean {
    let index = -1;
    for (let i = 0; i < this.database.length; i++) {
      if (this.database[i].event == eventName) {
        index = i;
        break;
      }
    }
    if (0 <= index) {
      this.currentEvent = this.database[index];
      return true;
    } else {
      return false;
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

  getEventByName(eventName: string): Event | null {
    for (let i = 0; i < this.database.length; i++) {
      if (this.database[i].event == eventName) {
        return this.database[i];
      }
    }
    return null;
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
      if(obj1.content.lastUpdated < obj2.content.lastUpdated) {
        return 1;
      } else if(obj2.content.lastUpdated < obj1.content.lastUpdated) {
        return -1;
      } else {
        return 0;
      }
    })
  }

}
