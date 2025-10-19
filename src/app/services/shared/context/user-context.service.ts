import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  private userSource = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this.userSource.asObservable();

  private loadUser(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSource.next(user);
  }

  getUser(): User | null {
    return this.userSource.getValue();
  }

  clearUser() {
    localStorage.removeItem('user');
    this.userSource.next(null);
  }
}
