import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | null;

  constructor(
    public boardService: BoardService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const authenticatedUser = this.authService.getSavedUser();
    // Acessa o nome do usuário
    this.userName = authenticatedUser ? authenticatedUser.name : 'N/A';
    console.log('Nome do usuário:', this.userName);
  }

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['login']);
  }

  addColumn(event: string) {
    if (event) {
      this.boardService.addColumn(event)
    }
  }

}
