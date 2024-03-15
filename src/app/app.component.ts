// app.component.ts
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vulcanSeed';
  creationDateFormatted: string | null = null; // Inicializa creationDateFormatted como null
  currentDate: Date = new Date();
  daysOfWork: number = 0; // Inicializa daysOfWork como 0

  constructor(
    private configService: ConfigService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.configService.getConfig().subscribe((data: any) => {
      const creationDate = new Date(data.creationDate);
      this.creationDateFormatted = this.datePipe.transform(
        creationDate,
        "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzz)"
      );

      // Calcular la diferencia de días aquí dentro del subscribe
      const diffTime = Math.abs(this.currentDate.getTime() - creationDate.getTime());
      this.daysOfWork = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    });

    // Verificar si creationDateFormatted es null antes de usarlo
    if (this.creationDateFormatted === null) {
      this.creationDateFormatted = ''; // Asigna una cadena vacía si es null
    }
  }
}
