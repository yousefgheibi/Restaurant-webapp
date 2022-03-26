import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogModel } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  isWait: boolean = true;
  blog: any;
  allblog : BlogModel[] = [];
  constructor(private route: ActivatedRoute, private _api: BlogService) {}

  ngOnInit(): void {
    this.getSingleBlog();
    this.getAllBlog();
  }

  getSingleBlog(){
     const routeParams = this.route.snapshot.paramMap;
     const blogIdFromRoute = Number(routeParams.get('blogId'));
     this._api.getSingleBlog(blogIdFromRoute).subscribe((res) => {
       this.blog = res;
       this.isWait = false;
     });
  }

  getAllBlog(){
 this._api.getBlogs().subscribe((res) => {
   this.allblog = res;
   this.isWait = false;
 });
  }
}
