import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private location = inject(Location);

  postForm!: FormGroup;
  postId: string = '';

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.postService.getPostById(this.postId).subscribe((post) => {
      if (post) {
        this.postForm.patchValue(post);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.updatePost(this.postId, this.postForm.value).then(() => {
        this.router.navigate(['/read']);
      });
    }
  }

  goBack(): void {
    this.location.back(); // native browser-like back
  }
}
