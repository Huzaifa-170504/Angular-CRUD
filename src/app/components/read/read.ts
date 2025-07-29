import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../services/post';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './read.html',
  styleUrls: ['./read.css']
})
export class Read implements OnInit {
  private postService = inject(PostService);
  private location = inject(Location);
  posts: any[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  goBack(): void {
    this.location.back(); // behaves like native browser
  }
}
