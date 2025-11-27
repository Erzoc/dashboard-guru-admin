// src/authProvider.js
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabaseUrl = 'https://xtlqmlecilqwqejrkcsp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bHFtbGVjaWxxd3FlanJrY3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjk5NzMsImV4cCI6MjA3OTgwNTk3M30.8FMyRxb8h9o5meM01ZQQPVYlI_VyV_zF_1iaf1mV468';
const supabase = createClient(supabaseUrl, supabaseKey);

export const authProvider = {
  // Login
  login: async ({ username, password }) => {
  try {
    // Query user dari database
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', username)
      .single();

    if (error || !users) {
      throw new Error('Invalid email or password');
    }

    // Compare password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, users.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (users.status !== 'active') {
      throw new Error('Account is not active');
    }

    // Store user info in localStorage
    localStorage.setItem('auth', JSON.stringify(users));
    
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
},


  // Logout
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },

  // Check if user is authenticated
  checkAuth: () => {
    return localStorage.getItem('auth') 
      ? Promise.resolve() 
      : Promise.reject({ message: 'Not authenticated' });
  },

  // Check error (untuk handle 401/403)
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Get user identity
  getIdentity: () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      return Promise.resolve({
        id: auth.id,
        fullName: auth.name,
        avatar: auth.avatar || undefined,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Get user permissions (role)
  getPermissions: () => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      return Promise.resolve(auth.role);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
