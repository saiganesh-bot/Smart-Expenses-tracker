import { create } from 'zustand';
import api from '../services/api';
import toast from 'react-hot-toast';

const savedUser = localStorage.getItem('user');
const initialUser = savedUser ? JSON.parse(savedUser) : null;

export const useAuthStore = create((set) => ({
  user: initialUser,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, name } = response.data;
      
      const userData = { name, email };
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      set({ token: accessToken, user: userData, isAuthenticated: true });
      toast.success('Logged in successfully!');
      
      // Auto-fetch expenses after login
      useExpenseStore.getState().fetchExpenses();
      useExpenseStore.getState().fetchGoals();
      
      return true;
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Login failed';
      console.error(`Login error [${status}]:`, message);
      toast.error(message);
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
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
    toast.success('Logged out');
  }
}));

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  goals: [],
  loading: false,
  isExpenseModalOpen: false,
  currentTab: 'overview', // 'overview' | 'goals'

  setTab: (tab) => set({ currentTab: tab }),
  openExpenseModal: () => set({ isExpenseModalOpen: true }),
  closeExpenseModal: () => set({ isExpenseModalOpen: false }),

  fetchExpenses: async () => {
    set({ loading: true });
    try {
      console.log('Fetching expenses...');
      const response = await api.get('/expenses');
      set({ expenses: response.data });
      console.log(`Fetched ${response.data.length} expenses`);
    } catch (error) {
      const status = error.response?.status;
      console.error(`Fetch expenses error [${status}]:`, error.message);
      toast.error(`Failed to fetch expenses (${status || 'Network Error'})`);
    } finally {
      set({ loading: false });
    }
  },

  addExpense: async (expenseData) => {
    set({ loading: true });
    try {
      // expenseData now includes 'type' (INCOME/EXPENSE)
      const response = await api.post('/expenses', expenseData);
      set({ expenses: [response.data, ...get().expenses] });
      toast.success(`${expenseData.type === 'INCOME' ? 'Income' : 'Expense'} added!`);
      return true;
    } catch {
      toast.error('Failed to add transaction');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteExpense: async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      set({ expenses: get().expenses.filter(e => e.id !== id) });
      toast.success('Transaction deleted!');
    } catch {
      toast.error('Failed to delete transaction');
    }
  },

  // Goals Actions
  fetchGoals: async () => {
    try {
      const response = await api.get('/goals');
      set({ goals: response.data });
    } catch {
      toast.error('Failed to fetch goals');
    }
  },

  addGoal: async (goalData) => {
    set({ loading: true });
    try {
      const response = await api.post('/goals', goalData);
      set({ goals: [response.data, ...get().goals] });
      toast.success('Goal created!');
      return true;
    } catch {
      toast.error('Failed to create goal');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteGoal: async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      set({ goals: get().goals.filter(g => g.id !== id) });
      toast.success('Goal deleted!');
    } catch {
      toast.error('Failed to delete goal');
    }
  },

  updateGoal: async (id, goalData) => {
    try {
      const response = await api.put(`/goals/${id}`, goalData);
      set({ goals: get().goals.map(g => g.id === id ? response.data : g) });
      toast.success('Goal updated!');
      return true;
    } catch {
      toast.error('Failed to update goal');
      return false;
    }
  }
}));
