export class NewsItem {
    id: number = undefined;
    title: string = undefined;
    url: string = undefined;
    constructor(obj: any) {
        this.map(obj);
    }
    protected map(obj: any): void {
    if (!obj) {
      return;
    }

    for (const prop in this) {
      // warning: does not handle arrays. must do custom map in derived class
      if (typeof obj[prop] !== 'object' && obj.hasOwnProperty(prop)) {
        this[prop] = obj[prop];
      }
    }
  }
}
