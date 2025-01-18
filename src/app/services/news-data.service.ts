import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { Observable, throwError, timer } from 'rxjs';

// environment settings
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsDataService {
    protected webApiUrl = environment.webApiUrl;
    constructor(
      protected http: HttpClient
    ) { }

    getNews(): Observable<any> {
      const url = `${this.webApiUrl}`;
      return this.createApiGet({ url });
    }

    protected createApiGet = ({ url = '', options = {}, params = {} }: { url: string, options?: any, params?: any }): Observable<any> => {
      options = this.buildOptions(options, params);
      return this.http
        .get(url, options)
        .pipe(catchError(this.handleError));
    }

    protected handleError = (err: HttpErrorResponse): Observable<never> => {
      console.log(err.message || 'Server error');
      return throwError(err);
    }

    private buildOptions = (options?: any, params?: any): any => {
      // get everthing nice and neat in one options map
      const o = options || {};
      if (params) {
        o.params = params;
      }
      // o.headers = this.mergeData({ 'X-LCID': this.userService.lcid.toString() }, o.headers || {});
      return o;
    }
}
