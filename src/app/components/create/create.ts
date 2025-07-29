import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post';
import { Post } from '../../models/post';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common'; // ✅ Needed for goBack()

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class Create {
  post: Post = {
    title: '',
    content: ''
  };

  constructor(
    private postService: PostService,
    private router: Router,
    private location: Location // ✅ Injected Location properly
  ) {}

  createPost() {
    console.log('Post to be created:', this.post);

    this.postService.addPost(this.post)
      .then(() => {
        console.log('Post created successfully');
        this.router.navigate(['/read']);
      })
      .catch((err) => {
        console.error('Failed to create post:', err);
        alert('Post creation failed. Check Firestore rules and console.');
      });
  }

  goBack(): void {
    this.location.back(); // ✅ Safe browser-like navigation
  }
}
