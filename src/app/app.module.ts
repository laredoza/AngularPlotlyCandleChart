import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { TradeViewComponent } from './trade-view/trade-view.component';
import { TradeViewService } from './trade-view/trade-view.service';
import { HttpClientModule } from '@angular/common/http';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    TradeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlotlyModule,
    HttpClientModule
  ],
  providers: [TradeViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
