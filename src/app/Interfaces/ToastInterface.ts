export interface Toast {
  id?: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number; // in ms
  icon?: string; // app icon path or emoji
  actionText?: string; // Button label (optional)
  action?: () => void; // Function to call on click
}
