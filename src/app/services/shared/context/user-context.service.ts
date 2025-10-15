import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // <-- makes it available app-wide
})
export class UserContextService {
  private userIdSource = new BehaviorSubject<string | null>(null);
  userId$ = this.userIdSource.asObservable();

  setUserId(id: string) {
    this.userIdSource.next(id);
  }

  getUserId(): string | null {
    return this.userIdSource.getValue();
  }
}
