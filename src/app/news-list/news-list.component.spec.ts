import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { NewsService } from '../services/news.service';
import { NewsListComponent } from './news-list.component';
import { of } from 'rxjs';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let mockNewsService = jasmine.createSpyObj('NewsService', ['getNews']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListComponent ],
      providers: [
        { provide: NewsService, useValue: mockNewsService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockNewsService = TestBed.get(NewsService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product data initially', () => {
    // Arrange
    const response = [
      {
        id: '1',
        title: 'Test Product',
        url: 'https://www.google.com'
      },
      {
        id: '2',
        title: 'Test Product',
        url: 'https://www.google.com'
      }
    ];
    mockNewsService.getNews.and.returnValue(of(response));
    // Act
    component.getNews();
    // Assert
    expect(mockNewsService.getNews).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });

});
