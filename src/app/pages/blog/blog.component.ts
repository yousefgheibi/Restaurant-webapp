import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogModel } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  searchKey!: string;
  p: any;
  isWait: boolean = true;
  blogData: BlogModel[] = [];
  constructor(private _api: BlogService) {}

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    this.subscription = this._api.getBlogs().subscribe((res) => {
      this.blogData = res;
      this.isWait = false;
    });
  }

  doSearch(searchKey: string) {
    let result: BlogModel[] = [];
    if (searchKey.length > 2) {
      result = this.blogData.filter((item) => {
        return !(item.title.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if (result.length > 0) {
      this.blogData = result;
    } else {
      this.getBlog();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
