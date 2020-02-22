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
        name: "New",
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

    var index = 1;

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

    var macd = new MACD({
      values: [
        127.75,
        129.02,
        132.75,
        145.4,
        148.98,
        137.52,
        147.38,
        139.05,
        137.23,
        149.3,
        162.45,
        178.95,
        200.35,
        221.9,
        243.23,
        243.52,
        286.42,
        280.27
      ],
      fastPeriod: 5,
      slowPeriod: 8,
      signalPeriod: 3,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    });

    var result = macd.getResult();
    var a = "";

  }

  private addEmaChart(
    period: number,
    xData: undefined[],
    yData: undefined[]
  ): EmaResult {
    let result = new EmaResult();
    let ema100Y = [];

    var ema = new EMA({ period: period, values: yData });
    let emaResult = ema.getResult();

    for (let index = 0; index < 99; index++) {
      ema100Y.push(0);
    }

    for (let index = 0; index < emaResult.length; index++) {
      ema100Y.push(emaResult[index]);
    }

    result.x = xData;
    result.y = ema100Y;

    return result;
  }

  public onClick(data) {
    debugger;
  }
}
