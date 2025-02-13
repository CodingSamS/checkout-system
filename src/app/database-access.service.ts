import {Injectable} from '@angular/core';
import {CheckoutItem, Event, EventStandalone, EventStandaloneSimple} from './event';
import { invoke } from "@tauri-apps/api/core";
import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

@Injectable({
  providedIn: 'root'
})
export class DatabaseAccessService {

  database: Record<string, Event>;
  currentEventName: string | undefined;

  constructor() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    this.database = {};
  }

  initialize(): Promise<any> {
    return invoke<Record<string, Event>>("get_database").then((data) => {
      this.database = data;
    }).finally(
      () => {
      this.currentEventName = this.getNewestEventName();
      info(JSON.stringify(this.database));
    })
  }

  writeEvent(eventName: string): void {
    // Overwrite the database file
    /*
    if(this.electronService.isElectron) {
      this.electronService.ipcRenderer?.send('writeEvent', {
        eventName: eventName,
        eventData: JSON.stringify(this.database[eventName])
      });
    }
    */
  }

  deleteEvent(eventName: string): void {
    // delete in active database
    delete this.database[eventName];
    // trigger file delete on electron layer
    /*
    if(this.electronService.isElectron) {
      this.electronService.ipcRenderer?.send('deleteEvent', eventName);
    }
    */
  }

  updateCounter(event: EventStandaloneSimple, internal: boolean): void {
    if (this.database[event.eventName] !== undefined) {
      for (let i = 0; i < event.items.length; i++) {
        if (internal) {
          this.database[event.eventName].items[i].counterInternal += event.items[i].counter;
        } else {
          this.database[event.eventName].items[i].counterExternal += event.items[i].counter;
        }
      }
      this.database[event.eventName].lastUpdated = new Date().toISOString();
      this.writeEvent(event.eventName);
    }
  }

  overwriteEvent(eventStandalone: EventStandalone): void {
    this.database[eventStandalone.eventName] = {
      lastUpdated: new Date().toISOString(),
      items: eventStandalone.items
    };
    this.writeEvent(eventStandalone.eventName);
  }

  setCurrentEvent(eventName: string): boolean {
      info(JSON.stringify(this.database));
    if (this.database[eventName] !== undefined){
      this.currentEventName = eventName;
      return true;
    } else {
      return false;
    }
  }

  getNewestEventName(): string | undefined {
    const sortedKeyList = this.getSortedKeyList(false);
    if (0 < sortedKeyList.length) {
      return sortedKeyList[0];
    } else {
      return undefined;
    }
  }

  getCurrentEvent(): EventStandalone | undefined {
    if (this.currentEventName == undefined) {
      const newestEventName = this.getNewestEventName();
      if (newestEventName !== undefined) {
        return this.getEventStandalone(newestEventName);
      } else {
        return undefined;
      }
    } else {
      return this.getEventStandalone(this.currentEventName);
    }
  }

  getEventStandalone(eventName: string): EventStandalone | undefined {
    if (this.database[eventName] !== undefined) {
      return {
        eventName: eventName,
        items: this.database[eventName].items
      };
    } else {
      return undefined;
    }
  }

  getEventItems(eventName: string): Array<CheckoutItem> | undefined {
    info("get event items called")
    if (this.database[eventName] !== undefined) {
      let event = this.database[eventName];
      console.log(event);
      console.log(event.lastUpdated);
      console.log(event.items);
      console.log(event['items']);
      return this.database[eventName].items;
    } else {
      info("eventName is undefined")
      return undefined;
    }
  }

  get getDatabase(): Record<string, Event> {
    return this.database;
  }

  getSortedKeyList(reverse: boolean): Array<string> {
    if (reverse) {
      return this.sortKeyList(Object.keys(this.database)).reverse();
    } else {
      return this.sortKeyList(Object.keys(this.database));
    }
  }

  sortKeyList(keyList: Array<string>): Array<string> {
    keyList.sort((obj1, obj2) => {
      if(this.database[obj1].lastUpdated < this.database[obj2].lastUpdated) {
        return 1;
      } else if(this.database[obj2].lastUpdated < this.database[obj1].lastUpdated) {
        return -1;
      } else {
        return 0;
      }
    })
    return keyList;
  }

}
