import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.html',
  styleUrls: ['./delete.css'],
})
export class Delete implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postService = inject(PostService);
  private location = inject(Location);

  id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  deletePost(): void {
    if (!this.id) return;

    this.postService.deletePost(this.id).then(() => {
      alert('Post deleted successfully!');
      this.router.navigate(['/read']);
    }).catch(err => {
      console.error('Error deleting post:', err);
      alert('Something went wrong!');
    });
  }

  cancel(): void {
    this.router.navigate(['/read']);
  }

  goBack(): void {
    this.location.back(); // behaves like native browser
  }
}
