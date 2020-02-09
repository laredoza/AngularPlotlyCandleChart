import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoloniexData } from './models/poloniex-data';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TradeViewService {

  private baseUrl =  'https://poloniex.com';
  constructor(private httpClient: HttpClient) { }

  returnTrades(startDateUnix:number, endDateUnix: number, period: number): Observable<PoloniexData[]> {
    const headers = new HttpHeaders({
    });
    return this.httpClient
      .get<PoloniexData[]>(
        `${this.baseUrl}/public?command=returnChartData&currencyPair=USDT_BTC&start=${startDateUnix}&end=${endDateUnix}&period=${period}`)
        .pipe(
            map(data => data) // or any other operator
          );
  }
}
