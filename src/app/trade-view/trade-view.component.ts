import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { TradeViewService } from "./trade-view.service";
import * as moment from "moment";
import { PlotlyModule } from "angular-plotly.js";
import { EMA, MACD, CCI } from "technicalindicators";
import { EmaResult } from "./models/ema-result";
import { MACDInput } from "technicalindicators/declarations/moving_averages/MACD";
import { MACDResult } from "./models/macd-result";
import { CCIInput } from "technicalindicators/declarations/oscillators/CCI";
import { CCIResult } from "./models/cci-result";
import { TradeViewSettings } from './models/trade-view-settings';

@Component({
  selector: "app-trade-view",
  templateUrl: "./trade-view.component.html",
  styleUrls: ["./trade-view.component.scss"]
})
export class TradeViewComponent implements OnInit, AfterViewInit {
  @ViewChild("chart", { static: true, read: ElementRef }) chart: ElementRef<
    PlotlyModule
  >;

  ngAfterViewInit(): void {
    // PlotlyModule.plotlyjs.layout.template1 = 'plotly_dark';
  }

  startDate = moment("2018-06-01", "YYYY-MM-DD HH:mm:ss");
  endDate = moment("2020-03-01", "YYYY-MM-DD HH:mm:ss");
  volumeColors = [];
  macdColours = [];

  public candleGraph = TradeViewSettings.settings;

  constructor(private service: TradeViewService) {}

  async ngOnInit() {
    this.candleGraph.layout.xaxis.range = [this.startDate.utc().format("YYYY-MM-DD HH:mm:ss"),
          this.endDate.utc().format("YYYY-MM-DD HH:mm:ss")];
    this.candleGraph.layout.xaxis.rangeslider.range = [
            this.startDate.utc().format("YYYY-MM-DD HH:mm:ss"),
            this.endDate.utc().format("YYYY-MM-DD HH:mm:ss")
          ];
    this.candleGraph.layout.shapes[0].x0 = this.startDate.utc().format("YYYY-MM-DD HH:mm:ss");
    this.candleGraph.layout.shapes[0].x1 = this.endDate.utc().format("YYYY-MM-DD HH:mm:ss");

    await this.loadData();
  }

  private async loadData()
  {
    let results = await this.service
      .returnTrades(
        this.startDate.utc().unix(),
        this.endDate.utc().unix(),
        86400
      )
      .toPromise();

    let volume = [];
    // this.volumeColors = [];
    // this.macdColours = [];

    let previousVolume = 0;

    results.forEach(data => {
      let date = moment
        .unix(data.date)
        .utc()
        .format("YYYY-MM-DD HH:mm:ss");
      this.candleGraph.data[0].x.push(date);
      this.candleGraph.data[0].close.push(data.close);
      this.candleGraph.data[0].high.push(data.high);
      this.candleGraph.data[0].low.push(data.low);
      this.candleGraph.data[0].open.push(data.open);

      // Artificially lowering amounts
      volume.push(data.volume / 4000);

      if (previousVolume > data.volume) {
        // Volume lower than previous
        this.volumeColors.push("#ef5350");
      } else {
        this.volumeColors.push("#26a69a");
      }
      previousVolume = data.volume;
    });

    this.addEmaCharts();
    this.addMacdCharts();
    this.addCciCharts();

    this.candleGraph.data[8].x = this.candleGraph.data[0].x;
    this.candleGraph.data[8].y = volume;
    this.candleGraph.data[8].marker.color = this.volumeColors;

  }

  private generateEmaChartData(
    period: number,
    xData: undefined[],
    yData: undefined[]
  ): EmaResult {
    let result = new EmaResult();
    let emaX = [];

    var ema = new EMA({ period: period, values: yData });
    let emaResult = ema.getResult();

    for (let index = period; index < xData.length; index++) {
      emaX.push(xData[index]);
    }

    result.x = emaX;
    result.y = emaResult;

    return result;
  }

  private generateMACDChartData(input: MACDInput, xData: undefined[]): MACDResult {
    let result = new MACDResult();

    var macd = new MACD(input);
    var macdResults = macd.getResult();

    macdResults.forEach(macdResult => {
      result.MACD.push(macdResult.MACD);
      result.histogram.push(macdResult.histogram);
      result.signal.push(macdResult.signal);
    });

    let indexDifference = xData.length - macdResults.length;

    for (let index = 0; index < xData.length; index++) {
      if (index >= indexDifference) {
        result.x.push(xData[index]);
      }
    }

    return result;
  }

  private generateCciChartData(input: CCIInput, xData: undefined[]): CCIResult {
    let result = new CCIResult();
    let cci1 = new CCI(input);
    var cciResults = cci1.getResult();

    cciResults.forEach(cciResult => {
      result.y.push(cciResult);
    });

    let indexDifference = xData.length - cciResults.length;

    for (let index = 0; index < xData.length; index++) {
      if (index >= indexDifference) {
        result.x.push(xData[index]);
      }
    }

    return result;
  }

  private addEmaCharts()
  {
    let ema50Result = this.generateEmaChartData(
      50,
      this.candleGraph.data[0].x,
      this.candleGraph.data[0].close
    );

    this.candleGraph.data[1].x = ema50Result.x;
    this.candleGraph.data[1].y = ema50Result.y;

    let ema100Result = this.generateEmaChartData(
      100,
      this.candleGraph.data[0].x,
      this.candleGraph.data[0].close
    );

    this.candleGraph.data[2].x = ema100Result.x;
    this.candleGraph.data[2].y = ema100Result.y;

    let ema200Result = this.generateEmaChartData(
      200,
      this.candleGraph.data[0].x,
      this.candleGraph.data[0].close
    );

    this.candleGraph.data[3].x = ema200Result.x;
    this.candleGraph.data[3].y = ema200Result.y;
  }

  private addMacdCharts()
  {
    let macdResult = this.generateMACDChartData(
      {
        values: this.candleGraph.data[0].close,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false
      },
      this.candleGraph.data[0].x
    );

    this.candleGraph.data[4].x = macdResult.x;
    this.candleGraph.data[4].y = macdResult.MACD;

    this.candleGraph.data[5].x = macdResult.x;
    this.candleGraph.data[5].y = macdResult.histogram;
    this.candleGraph.data[5].marker.color = this.macdColours;

    this.candleGraph.data[6].x = macdResult.x;
    this.candleGraph.data[6].y = macdResult.signal;

    macdResult.histogram.forEach(histogram => {
      if (!histogram || histogram < 0) {
        this.macdColours.push("#ef5350");
      } else {
        this.macdColours.push("#26a69a");
      }
    });
  }

  private addCciCharts()
  {
    let cciResult = this.generateCciChartData(
      {
        high: this.candleGraph.data[0].high,
        low: this.candleGraph.data[0].low,
        close: this.candleGraph.data[0].close,
        period: 20
      },
      this.candleGraph.data[0].x
    );

    this.candleGraph.data[7].x = cciResult.x;
    this.candleGraph.data[7].y = cciResult.y;
  }

  public onClick(data) {
    debugger;
  }
}
