import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  blogData : BlogModel[] = [];
  constructor(private _blogapi : BlogService) {}

  ngOnInit(): void {
    this.getBlog();
  }
  getBlog() {
    this._blogapi.getBlogs().subscribe((res) => {
      this.blogData = res;
    });
  }
} 
