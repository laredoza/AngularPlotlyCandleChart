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
import { EMA, MACD } from "technicalindicators";
import { EmaResult } from "./models/ema-result";
import { MACDInput } from 'technicalindicators/declarations/moving_averages/MACD';
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

  startDate = moment("2019-01-01", "YYYY-MM-DD HH:mm:ss");
  endDate = moment("2020-02-01", "YYYY-MM-DD HH:mm:ss");

  public candleGraph = {
    config: {
      scrollZoom: true,
      responsive: true
    },
    data: [
      {
        x: [],
        close: [],
        decreasing: { line: { color: "#ef5350" } },
        high: [],
        increasing: { line: { color: "#26a69a" } },
        line: { color: "rgba(31,119,180,1)" },
        low: [],
        open: [],
        type: "candlestick",
        xaxis: "x",
        yaxis: "y",
        name: "BTC/USD"
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "50"
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "100"
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "200",
        xaxis: "x",
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "Hist",
        xaxis: "x",
        yaxis: "y2"
      }
    ],
    layout: {
      grid: {
        rows: 2,
        columns: 1,
        subplots: [["xy"], ["xy2"]],
        roworder: "top to bottom"
      },
      autosize: true,
      // width: 1500,
      // height: 2000,
      dragmode: "pan",
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: true,
      xaxis: {
        autorange: true,
        title: "Date",
        rangeselector: {
          x: 0,
          y: 1.2,
          xanchor: "left",
          font: { size: 8 },
          buttons: [
            {
              step: "day",
              stepmode: "backward",
              count: 1,
              label: "1 day"
            },
            {
              step: "day",
              stepmode: "backward",
              count: 7,
              label: "1 week"
            },
            {
              step: "month",
              stepmode: "backward",
              count: 1,
              label: "1 month"
            },
            {
              step: "month",
              stepmode: "backward",
              count: 6,
              label: "6 months"
            },
            {
              step: "all",
              label: "All dates"
            }
          ]
        },
        domain: [0, 1],
        range: [
          this.startDate.utc().format("YYYY-MM-DD HH:mm:ss"),
          this.endDate.utc().format("YYYY-MM-DD HH:mm:ss")
        ],
        rangeslider: {
          visible: false,
          range: [
            this.startDate.utc().format("YYYY-MM-DD HH:mm:ss"),
            this.endDate.utc().format("YYYY-MM-DD HH:mm:ss")
          ]
        },
        type: "date"
      },
      yaxis: {
        autorange: true,
        domain: [1, 1],
        range: [2000, 3000],
        type: "linear"
      },
      annotations: [
        {
          x: "2019-06-27",
          y: 0.9,
          xref: "x",
          yref: "paper",
          text: "largest movement",
          font: { color: "magenta" },
          showarrow: true,
          xanchor: "right",
          ax: -20,
          ay: 0
        }
      ],
      shapes: [
        {
          type: "rect",
          xref: "x",
          yref: "paper",
          x0: "2019-06-12",
          y0: 0,
          x1: "2019-06-27",
          y1: 1,
          fillcolor: "#d3d3d3",
          opacity: 0.2,
          line: {
            width: 0
          }
        }
      ]
    }
  };

  constructor(private service: TradeViewService) {}

  async ngOnInit() {
    let results = await this.service
      .returnTrades(
        this.startDate.utc().unix(),
        this.endDate.utc().unix(),
        14400
      )
      .toPromise();

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
    });

    let ema50Result = this.addEmaChart(
      50,
      this.candleGraph.data[0].x,
      this.candleGraph.data[0].close
    );

    this.candleGraph.data[1].x = ema50Result.x;
    this.candleGraph.data[1].y = ema50Result.y;

    let ema100Result = this.addEmaChart(
      100,
      this.candleGraph.data[0].x,
      this.candleGraph.data[0].close
    );

    this.candleGraph.data[2].x = ema100Result.x;
    this.candleGraph.data[2].y = ema100Result.y;

    let ema200Result = this.addEmaChart(
      200,
      this.candleGraph.data[0].x,
      this.candleGraph.data[0].close
    );

    this.candleGraph.data[3].x = ema200Result.x;
    this.candleGraph.data[3].y = ema200Result.y;

    this.addMACDChart({
      values: this.candleGraph.data[0].y,
      fastPeriod: 5,
      slowPeriod: 8,
      signalPeriod: 3,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    },
    this.candleGraph.data[0].x)
  }

  private addEmaChart(
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

  private addMACDChart(
    settings: MACDInput,
    xData: undefined[]
  )
  {
    var macd = new MACD(settings);
    var result = macd.getResult();

  }

  public onClick(data) {
    debugger;
  }
}
