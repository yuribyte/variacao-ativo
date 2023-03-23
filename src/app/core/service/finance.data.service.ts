import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinanceDataMap } from '../model/finance.map';
import { FinanceModelData as Model } from '../model/finance.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceDataService {
  constructor(private httpClient: HttpClient) {}
  private url = environment.baseUrl;

  requestFinanceListData(): Observable<Model.RawIResult> {
    const paramsUrl = {
      symbol: 'PETR4.SA',
      range: '2mo',
      interval: '1d'
    };

    const httpParams = new HttpParams({
      fromObject: { ...paramsUrl }
    });

    const request = this.httpClient.get<Model.RawIFinance>(this.url, {
      params: httpParams
    });

    return request.pipe(
      catchError((error: unknown) => {
        console.error(error);
        return of({});
      }),
      map(FinanceDataMap.mapFinanceData)
    );
  }
}
