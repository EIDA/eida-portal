import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  private _currentPage: number = 0;
  private _pageSize: number = 15;
  private _pages = new Array();

  constructor() { }

  paginate(data) {
    this._pages = new Array();
    for (let i = 0; i < data.length; i += this._pageSize) {
      var tmpSlice = data.slice(i, i + this._pageSize);
      if (tmpSlice.length > 0) {
        this._pages.push(tmpSlice);
      }
    }
  }

  getTotalPages() {
    return this._pages.length;
  }

  getPages() {
    return this._pages;
  }

  getPage(i: number) {
    this._currentPage = i;
    return this._pages[i];
  }

  getCurrentPage() {
    return this._pages[this._currentPage];
  }

  getCurrentPageNumber(): number {
    return this._currentPage + 1;
  }

  getPreviousPageNumber(): number {
    return this.getCurrentPageNumber() - 1;
  }

  getNextPageNumber(): number {
    return this.getCurrentPageNumber() + 1;
  }

  getLastPageNumber(): number {
    return this._pages.length;
  }

  getNextPage() {
    if (this._currentPage < this._pages.length - 1) {
      this._currentPage++;
    }
    return this._pages[this._currentPage];
  }

  getPreviousPage() {
    if (this._currentPage > 0) {
      this._currentPage--;
    }
    return this._pages[this._currentPage];
  }

  getFirstPage() {
    this._currentPage = 0;
    return this._pages[this._currentPage];
  }

  getLastPage() {
    this._currentPage = this._pages.length - 1;
    return this._pages[this._currentPage];
  }

  nextPageExists() {
    return this._currentPage < this._pages.length - 1;
  }

  previousPageExists() {
    return this._currentPage > 0;
  }
}
