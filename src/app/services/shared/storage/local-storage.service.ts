import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  //Save data
  setItem(key: string, value: any): void {
    try {
      const serializedValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
    }
  }

  //Get data
  getItem<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;

      // Try parsing JSON
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T; // fallback if not JSON
      }
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  //Remove item
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  }

  //Clear all
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  //Check if key exists
  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
