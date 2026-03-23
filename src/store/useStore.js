import { create } from 'zustand';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, name } = response.data;
      localStorage.setItem('token', accessToken);
      set({ token: accessToken, user: { name, email }, isAuthenticated: true });
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  register: async (name, email, password) => {
    set({ loading: true });
    try {
      await api.post('/auth/register', { name, email, password });
      toast.success('Registration successful. Please login.');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
    toast.success('Logged out');
  }
}));

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  loading: false,
  isExpenseModalOpen: false,

  openExpenseModal: () => set({ isExpenseModalOpen: true }),
  closeExpenseModal: () => set({ isExpenseModalOpen: false }),

  fetchExpenses: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/expenses');
      set({ expenses: response.data });
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      set({ loading: false });
    }
  },

  addExpense: async (expenseData) => {
    set({ loading: true });
    try {
      const response = await api.post('/expenses', expenseData);
      set({ expenses: [response.data, ...get().expenses] });
      toast.success('Expense added!');
      return true;
    } catch (error) {
      toast.error('Failed to add expense');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteExpense: async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      set({ expenses: get().expenses.filter(e => e.id !== id) });
      toast.success('Expense deleted!');
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  }
}));
