export class TradeViewSettings {
    static settings = {
    config: {
      scrollZoom: true,
      responsive: true,
      displayModeBar: false
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
          color: "#07570d"
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        type: "lines",
        name: "100",
        line: {
          color: "#080aa0"
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
          color: "#ad080c"
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
        yaxis: "y2",
        line: {
          color: "#0576c9"
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        legendgroup: "MACD",
        showlegend: false,
        type: "bar",
        name: "Hist",
        xaxis: "x",
        yaxis: "y2",
        mode: "markers",
        marker: {
          color: [],
          size: 5
        }
      },
      {
        x: [],
        y: [],
        legendgroup: "MACD",
        showlegend: false,
        type: "lines",
        name: "Signal",
        xaxis: "x",
        yaxis: "y2",
        line: {
          color: "#e26004"
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        legendgroup: "CCI",
        showlegend: true,
        type: "lines",
        name: "CCI",
        xaxis: "x",
        yaxis: "y3",
        line: {
          color: "#815b17"
          // width: 1
        }
      },
      {
        x: [],
        y: [],
        showlegend: false,
        type: "bar",
        name: "Volume",
        xaxis: "x",
        mode: "markers",
        marker: {
          color: [],
          // symbol: symbolForThresholds,
          size: 5
        }
      }
    ],
    layout: {
      plot_bgcolor: "#131722",
      paper_bgcolor: "#131722",
      grid: {
        rows: 3,
        columns: 1,
        subplots: [["xy"], ["xy2"], ["xy3"]],
        roworder: "top to bottom"
      },
      autosize: true,
      // width: 1800,
      // height: 900,
      dragmode: "pan",
      // margin: {
      //   r: 10,
      //   t: 0,
      //   b: 40,
      //   l: 60
      // },
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
          y: 1.1,
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
        range: [],
        rangeslider: {
          visible: false,
          range: [] 
        },
        type: "date",
        tickcolor: "#787878",
        linecolor: "#787878",
        gridcolor: "#363c4e",
        titlefont: {
          // family: "Arial, sans-serif",
          size: 18,
          color: "#cccdcd"
        },
        tickfont: {
          // family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        },
        showspikes:true,
        spikemode:"across",
        spikedash:"dash",
        spikecolor:"#787878",
        spikethickness: 1
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
          // family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        },
        title:"Candle",
        showspikes:true,
        spikemode:"across",
        spikedash:"dash",
        spikecolor:"#787878",
        spikethickness: 1
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
          // family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        },
        title:"MACD",
        showspikes:true,
        spikemode:"across",
        spikedash:"dash",
        spikecolor:"#787878",
        spikethickness: 1
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
          // family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        },
        title:"CCI",
        showspikes:true,
        spikemode:"across",
        spikedash:"dash",
        spikecolor:"#787878",
        spikethickness: 1
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
          // family: "Old Standard TT, serif",
          size: 14,
          color: "#cccdcd"
        }
      },
      annotations: [
        // {
        //   x: "2019-06-27",
        //   y: 0.9,
        //   xref: "x",
        //   yref: "paper",
        //   text: "largest movement",
        //   font: { color: "magenta" },
        //   showarrow: true,
        //   xanchor: "right",
        //   ax: -20,
        //   ay: 0
        // }
      ],
      shapes: [
        // {
        //   type: "rect",
        //   xref: "x",
        //   yref: "paper",
        //   x0: "2019-06-12",
        //   y0: 0,
        //   x1: "2019-06-27",
        //   y1: 1,
        //   fillcolor: "#d3d3d3",
        //   opacity: 0.2,
        //   line: {
        //     width: 0
        //   }
        // },
        {
          type: "rect",
          xref: "x",
          yref: "y3",
          x0: "",
          y0: 100,
          x1: "",
          y1: -100,
          fillcolor: "#815b17",
          opacity: 0.2,
          yaxis: "y3",
          line: {
            width: 0
          }
        },
        {
          type: "line",
          x0: "2019-06-26",
          y0: 14000,
          x1: "2019-08-6",
          y1: 12300,
          line: {
            color: "rgb(50, 171, 96)",
            width: 4,
            dash: "dashdot"
          }
        }
      ]
    }
  };
}