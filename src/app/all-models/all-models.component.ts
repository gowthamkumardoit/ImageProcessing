import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-all-models',
  templateUrl: './all-models.component.html',
  styleUrls: ['./all-models.component.scss']
})
export class AllModelsComponent implements OnInit {

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

  public chartData1: Array<any> = [];
  public chartLabels1: Array<any> = [];

  public chartData2: Array<any> = [];
  public chartLabels2: Array<any> = [];

  public chartData3: Array<any> = [];
  public chartLabels3: Array<any> = [];

  public chartData4: Array<any> = [];
  public chartLabels4: Array<any> = [];

  public chartData5: Array<any> = [];
  public chartLabels5: Array<any> = [];

  public chartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
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
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.imageURL = event.target.result;

        this.chartData1 = [];
        this.chartData2 = [];
        this.chartData3 = [];
        this.chartData4 = [];
        this.chartData5 = [];

        this.chartLabels1 = [];
        this.chartLabels2 = [];
        this.chartLabels3 = [];
        this.chartLabels4 = [];
        this.chartLabels5 = [];
      };
    }
  }


  predict_new() {
    const message = {
      image: this.imageData.nativeElement.currentSrc.replace("data:image/jpeg;base64,", "")
    };
    this.http.post("http://localhost:5000/predict", JSON.stringify(message)).subscribe((data: any) => {
      data = data.replace('{', '');
      data = data.split('}');
      let newData = data.map(item => {
        return item.replace('{', '')
      });
      newData = newData.map(item => {
        return item.split(":");
      });
      this.keys = [];
      this.values = [];
      newData.map(item => {
        if (item[0] != '' && item[1] != '') {
          this.keys.push(item[0].replace("'", "").replace("'", "").toUpperCase());
          this.values.push((parseFloat(item[1].trim()) * 100).toFixed(4));
        }
      });
      this.chartData = this.values;
      this.chartLabels = this.keys;
    });

    this.http.post("http://localhost:5100/predict", JSON.stringify(message)).subscribe((data: any) => {
      this.keys = [];
      this.values = [];
      data.map(item => {
        if (item) {
          this.keys.push(item.name.toUpperCase());
          this.values.push((parseFloat(item.probability) * 100).toFixed(4));
        }
      });
      this.chartData1 = this.values;
      this.chartLabels1 = this.keys;
    });

    this.http.post("http://localhost:5200/predict", JSON.stringify(message)).subscribe((data: any) => {
      this.keys = [];
      this.values = [];
      data.map(item => {
        if (item) {
          this.keys.push(item.name.toUpperCase());
          this.values.push((parseFloat(item.probability) * 100).toFixed(4));
        }
      });
      this.chartData2 = this.values;
      this.chartLabels2 = this.keys;
    });

  }

}
