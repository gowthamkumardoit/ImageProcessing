import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfer-model',
  templateUrl: './transfer-model.component.html',
  styleUrls: ['./transfer-model.component.scss']
})
export class TransferModelComponent implements OnInit {

  @ViewChild('imageData') imageData: ElementRef;
  value = 0;
  imageURL: any;
  imageName: string;
  uploadPercent: number;
  image;
  model;
  flag: boolean;
  result: any;
  objectKeys = Object.keys;
  keys: any;
  values: any;

  public chartType = 'doughnut';

  public chartData: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
    hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
  }];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(private appService: ApplicationService, private storage: AngularFireStorage, private http: HttpClient) { }

  ngOnInit() {

  }
  uploadEvent(event) {
    this.chartData = [];
    this.values = [];
    this.chartLabels = [];
    this.keys = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = ($event: any) => { // called once readAsDataURL is completed
        this.imageURL = $event.target.result;
      };
    }
  }


  predict_new() {
    const message = {
      image: this.imageData.nativeElement.currentSrc.replace('data:image/jpeg;base64,', '')
    };
    this.http.post('http://localhost:5300/predict', JSON.stringify(message)).subscribe((data: any) => {
      this.keys = [];
      this.values = [];
      data.map(item => {
        if (item) {
          this.keys.push(item.name.toUpperCase());
          this.values.push((parseFloat(item.probability) * 100).toFixed(4));
        }
      });
      this.chartData = this.values;
      this.chartLabels = this.keys;
    });
  }

}
