import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vgg16',
  templateUrl: './vgg16.component.html',
  styleUrls: ['./vgg16.component.scss']
})
export class Vgg16Component implements OnInit {
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

    CIFAR100_LABELS_LIST = [
        'apple', 'aquarium_fish', 'baby', 'bear', 'beaver', 'bed', 'bee', 'beetle',
        'bicycle', 'bottle', 'bowl', 'boy', 'bridge', 'bus', 'butterfly', 'camel',
        'can', 'castle', 'caterpillar', 'cattle', 'chair', 'chimpanzee', 'clock',
        'cloud', 'cockroach', 'couch', 'crab', 'crocodile', 'cup', 'dinosaur',
        'dolphin', 'elephant', 'flatfish', 'forest', 'fox', 'girl', 'hamster',
        'house', 'kangaroo', 'keyboard', 'lamp', 'lawn_mower', 'leopard', 'lion',
        'lizard', 'lobster', 'man', 'maple_tree', 'motorcycle', 'mountain', 'mouse',
        'mushroom', 'oak_tree', 'orange', 'orchid', 'otter', 'palm_tree', 'pear',
        'pickup_truck', 'pine_tree', 'plain', 'plate', 'poppy', 'porcupine',
        'possum', 'rabbit', 'raccoon', 'ray', 'road', 'rocket', 'rose',
        'sea', 'seal', 'shark', 'shrew', 'skunk', 'skyscraper', 'snail', 'snake',
        'spider', 'squirrel', 'streetcar', 'sunflower', 'sweet_pepper', 'table',
        'tank', 'telephone', 'television', 'tiger', 'tractor', 'train', 'trout',
        'tulip', 'turtle', 'wardrobe', 'whale', 'willow_tree', 'wolf', 'woman',
        'worm'
    ];

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
    this.http.post('http://localhost:5000/predict', JSON.stringify(message)).subscribe((data: any) => {

      console.log(data);

      // data = data.replace('{', '');
      // data = data.split('}');
      // let newData = data.map(item => {
      //   return item.replace('{', '')
      // });
      // newData = newData.map(item => {
      //   return item.split(':');
      // });
      // this.keys = [];
      // this.values = [];
      // newData.map(item => {
      //   if (item[0] != '' && item[1] != '') {
      //     this.keys.push(item[0].replace(''', '').replace(''', '').toUpperCase());
      //     this.values.push((parseFloat(item[1].trim()) * 100).toFixed(4));
      //   }
      // });
      // this.chartData = this.values;
      // this.chartLabels = this.keys;
    });
  }

  predict() {
    // let image = new Image();
    // image.src = this.imageData.nativeElement.currentSrc;
    // (async function () {
    //   let tensor = tf.fromPixels(image)
    //     .resizeNearestNeighbor([224, 224])
    //     .toFloat();

    //   let meanImageNewRGB = {
    //     red: 123.68,
    //     green: 116.779,
    //     blue: 103.939
    //   };

    //   let indices = [
    //     tf.tensor1d([0], 'int32'),
    //     tf.tensor1d([1], 'int32'),
    //     tf.tensor1d([2], 'int32')
    //   ];

    //   let centeredRGB = {
    //     red: tf.gather(tensor, indices[0], 2)
    //       .sub(tf.scalar(meanImageNewRGB.red))
    //       .reshape([50176]),
    //     green: tf.gather(tensor, indices[1], 2)
    //       .sub(tf.scalar(meanImageNewRGB.green))
    //       .reshape([50176]),
    //     blue: tf.gather(tensor, indices[2], 2)
    //       .sub(tf.scalar(meanImageNewRGB.blue))
    //       .reshape([50176])
    //   }

    //   let processedTensor = tf.stack([centeredRGB.red, centeredRGB.green, centeredRGB.blue], 1)
    //                           .reshape([224, 224, 3])
    //                           .reverse(2)
    //                           .expandDims();

    //   console.log('predict called', tf.memory());

    //   let predictions = await model.predict(processedTensor).data();
    //   predictions.dispose();
    //   let top5 = Array.from(predictions)
    //     .map((p, i) => {
    //       return {
    //         prob: p,
    //         className: IMAGENET_CLASSES[i]
    //       };
    //     }).sort((a: any, b: any) => {
    //       return b.prob - a.prob
    //     }).slice(0, 5);

    //   console.log(top5);
    // })()

  }
}
