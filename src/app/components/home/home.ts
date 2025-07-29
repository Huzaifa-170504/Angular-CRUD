import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private auth: Auth, private router: Router) {}

  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']); // Redirect to login after logout
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  }
}
