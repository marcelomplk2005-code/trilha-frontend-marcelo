import { create } from 'zustand';

interface ToastState {
  message: string | null;
  type: 'success' | 'error' | null;
  isVisible: boolean;
  showToast: (message: string, type: 'success' | 'error') => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    message: null,
    type: null,
    isVisible: false,

    showToast: (message, type) => {
    set({ message, type, isVisible: true });

    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },

  hideToast: () => set({ isVisible: false }),
}));