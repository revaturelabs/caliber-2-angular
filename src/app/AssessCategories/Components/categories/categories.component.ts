import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  
  
  constructor() { }

  


  ngOnInit() {
    this.loadIntoStorage();
  }

  loadIntoStorage(){
    //let id = 1;
    let keyThing = "id";
    localStorage.setItem(keyThing, '1');


  }
   

  

}
