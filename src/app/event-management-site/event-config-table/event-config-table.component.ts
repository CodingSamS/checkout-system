import { Component, OnInit } from '@angular/core';
import { ToastService } from "../../toasts/toast.service";

@Component({
  selector: 'app-event-config-table',
  templateUrl: './event-config-table.component.html',
  styleUrls: ['./event-config-table.component.scss']
})
export class EventConfigTableComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
  }


  saveConfigTable(): void {
    this.toastService.showSuccess("Speichern erfolgreich");
  }

}
