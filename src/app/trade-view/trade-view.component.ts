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
  endDate = moment("2020-03-01", "YYYY-MM-DD HH:mm:ss");
  volumeColors = [];

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
        name: "50",
        line: {
          color: "#07570d",
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "100",
        line: {
          color: "#080aa0",
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "200",
        xaxis: "x",
        line: {
          color: "#ad080c",
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        legendgroup: "MACD",
        showlegend: true,
        type: "lines",
        name: "MACD",
        xaxis: "x",
        yaxis: "y2"
      },
      {
        x: [],
        y: [],
        legendgroup: "MACD",
        showlegend: false,
        type: "bar",
        name: "Hist",
        xaxis: "x",
        yaxis: "y2"
      },
      {
        x: [],
        y: [],
        legendgroup: "MACD",
        showlegend: false,
        type: "lines",
        name: "Signal",
        xaxis: "x",
        yaxis: "y2"
      },
      {
        x: [],
        y: [],
        legendgroup: "CCI",
        showlegend: true,
        type: "lines",
        name: "CCI",
        xaxis: "x",
        yaxis: "y3"
      },
      {
        x: [],
        y: [],
        legendgroup: "CCI",
        showlegend: false,
        type: "lines",
        name: "CCI100",
        xaxis: "x",
        yaxis: "y3"
      },
      {
        x: [],
        y: [],
        legendgroup: "CCI",
        showlegend: false,
        type: "lines",
        name: "CCI-100",
        xaxis: "x",
        yaxis: "y3"
      },
      {
        x: [],
        y: [],
        showlegend: false,
        type: "bar",
        name: "Volume",
        xaxis: "x",
        // yaxis: "y4"
        mode: "markers",
        marker: {
          color: this.volumeColors,
          // symbol: symbolForThresholds,
          size: 5
        }
      }
    ],
    layout: {
      plot_bgcolor: "#131722",
      paper_bgcolor: "#131722",
      grid: {
        rows: 4,
        columns: 1,
        subplots: [["xy"], ["xy2"], ["xy3"], ["xy4"]],
        roworder: "top to bottom"
      },
      autosize: true,
      // width: 1800,
      // height: 900,
      dragmode: "pan",
      margin: {
        r: 10,
        t: 0,
        b: 40,
        l: 60
      },
      showlegend: true,
      legend: {
        orientation: "h",
        x: 0.025,
        y: 1,
        xanchor: "left",
        font: {
          // family: "sans-serif",
          size: 12,
          color: "#92969e"
        }
        // bgcolor: "#92969e"
      },
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
        type: "date",
        tickcolor: "#787878",
        linecolor: "#787878",
        gridcolor: "#363c4e",
        titlefont: {
          family: "Arial, sans-serif",
          size: 18,
          color: "#cccdcd"
        },
        tickfont: {
          family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        }
      },
      yaxis: {
        autorange: true,
        domain: [0.55, 1],
        range: [5000, 14000],
        type: "linear",
        tickcolor: "#787878",
        linecolor: "#787878",
        gridcolor: "#363c4e",
        titlefont: {
          // family: "Arial, sans-serif",
          size: 18,
          color: "#cccdcd"
        },
        tickfont: {
          family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        }
      },
      yaxis2: {
        domain: [0.35, 0.55],
        tickcolor: "#787878",
        linecolor: "#787878",
        gridcolor: "#363c4e",
        titlefont: {
          // family: "Arial, sans-serif",
          size: 18,
          color: "#cccdcd"
        },
        tickfont: {
          family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        }
      },
      yaxis3: {
        domain: [0.1, 0.35],
        tickcolor: "#787878",
        linecolor: "#787878",
        gridcolor: "#363c4e",
        titlefont: {
          // family: "Arial, sans-serif",
          size: 18,
          color: "#cccdcd"
        },
        tickfont: {
          family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        }
      },
      yaxis4: {
        domain: [0, 0.1],
        tickcolor: "#787878",
        linecolor: "#787878",
        gridcolor: "#363c4e",
        titlefont: {
          // family: "Arial, sans-serif",
          size: 18,
          color: "#cccdcd"
        },
        tickfont: {
          family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        }
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
        86400
      )
      .toPromise();

    let volume = [];

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
      volume.push(data.volume / 4000);

      if (previousVolume > data.volume) {
        // Volume lower than previous
        this.volumeColors.push("#ef5350");
      } else {
        this.volumeColors.push("#26a69a");
      }
      previousVolume = data.volume;
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

    let macdResult = this.addMACDChart(
      {
        values: this.candleGraph.data[0].close,
        fastPeriod: 5,
        slowPeriod: 8,
        signalPeriod: 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false
      },
      this.candleGraph.data[0].x
    );

    this.candleGraph.data[4].x = macdResult.x;
    this.candleGraph.data[4].y = macdResult.MACD;

    this.candleGraph.data[5].x = macdResult.x;
    this.candleGraph.data[5].y = macdResult.histogram;

    this.candleGraph.data[6].x = macdResult.x;
    this.candleGraph.data[6].y = macdResult.signal;

    let cciResult = this.addCCI(
      {
        high: this.candleGraph.data[0].high,
        low: this.candleGraph.data[0].low,
        close: this.candleGraph.data[0].close,
        period: 21
      },
      this.candleGraph.data[0].x
    );

    this.candleGraph.data[7].x = cciResult.x;
    this.candleGraph.data[7].y = cciResult.y;

    this.candleGraph.data[8].x = [
      this.candleGraph.data[0].x[0],
      this.candleGraph.data[0].x[this.candleGraph.data[0].x.length - 1]
    ];
    this.candleGraph.data[8].y = [100, 100];

    this.candleGraph.data[9].x = [
      this.candleGraph.data[0].x[0],
      this.candleGraph.data[0].x[this.candleGraph.data[0].x.length - 1]
    ];
    this.candleGraph.data[9].y = [-100, -100];

    this.candleGraph.data[10].x = this.candleGraph.data[0].x;
    this.candleGraph.data[10].y = volume;
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

  private addMACDChart(input: MACDInput, xData: undefined[]): MACDResult {
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

  private addCCI(input: CCIInput, xData: undefined[]): CCIResult {
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

  public onClick(data) {
    debugger;
  }
}
