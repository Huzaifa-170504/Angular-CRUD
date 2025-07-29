import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private collectionName = 'posts';

  constructor(private firestore: Firestore) {}

  // Create
  addPost(post: Post) {
    const postRef = collection(this.firestore, this.collectionName);
    return addDoc(postRef, post);
  }

  // Read all
  getPosts(): Observable<Post[]> {
    const postRef = collection(this.firestore, this.collectionName);
    return collectionData(postRef, { idField: 'id' }) as Observable<Post[]>;
  }

  // Read one by ID
  getPostById(id: string): Observable<Post> {
    const postDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(postDocRef, { idField: 'id' }) as Observable<Post>;
  }

  // Update
  updatePost(id: string, post: Partial<Post>) {
    const postDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(postDocRef, post);
  }

  // Delete
  deletePost(id: string) {
    const postDocRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return deleteDoc(postDocRef);
  }
}
