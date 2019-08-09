import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import 'zone.js/dist/zone-testing'
import { CategoryService } from './category.service';
import { Component } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';
import { Category } from '../Models/Category';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
describe ('CategorySevice', () =>{
    var categoryURL = environment.serverRootURL + "/category/all/";
    var getcatbyID = environment.serverRootURL + "/category/"
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

    beforeEach(() => TestBed.configureTestingModule ({
        imports: [HttpClientTestingModule],
        providers: [CategoryService],

    }))


it('should be created', () =>{
    inject([HttpTestingController],
    (httmock : HttpTestingController) =>{
        expect(httmock).toBe(TestBed.get(CategoryService));
    })
    })

it('should get all categories',
    inject ([HttpTestingController , CategoryService],
        (httpMock: HttpTestingController, service:
        CategoryService) => {
            let cat: Category[]
        service.getCategories().subscribe (data => {
            cat =data        
        })
        const req =httpMock.expectOne(categoryURL, 'application/json')
        expect(req.request.method).toEqual('GET')
    }));

it('should get a category by ID',
inject ([HttpTestingController , CategoryService],
    (httpMock: HttpTestingController, service:
    CategoryService) => {
        let cat: Category
    service.getCategoryById(1).subscribe (data => {
        cat =data        
    })
    const req =httpMock.expectOne(getcatbyID + "1", 'application/json')
    expect(req.request.method).toEqual('GET')
}));
});
