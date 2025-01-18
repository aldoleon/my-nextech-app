import { Injectable } from '@angular/core';

// rxjs
import { map, share, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { NewsDataService } from './news-data.service';

// models
import { NewsItem } from '../models/news-item';

@Injectable({
    providedIn: 'root'
  })
export class NewsService {
    private newsDataSource$: Observable<any>;
    constructor(
      private newsDataService: NewsDataService
      ) {}

    getNews(): Observable<NewsItem[]> {
      return this.newsDataService
        .getNews()
        .pipe(map(json => this.deserializeNewsList(json)));
    }

    private deserializeNewsList(obj: any): NewsItem[] {
      const list = Array<NewsItem>();
      obj.forEach(news => {
        list.push(new NewsItem(news));
      });
      return list;
    }
  }
