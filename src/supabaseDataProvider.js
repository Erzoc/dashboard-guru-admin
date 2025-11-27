// src/supabaseDataProvider.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtlqmlecilqwqejrkcsp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bHFtbGVjaWxxd3FlanJrY3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjk5NzMsImV4cCI6MjA3OTgwNTk3M30.8FMyRxb8h9o5meM01ZQQPVYlI_VyV_zF_1iaf1mV468';
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseDataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;

    let query = supabase
      .from(resource)
      .select('*', { count: 'exact' })
      .range(start, end);

    if (field) {
      query = query.order(field, { ascending: order === 'ASC' });
    }

    const { data, error, count } = await query;
    
    if (error) throw error;

    return {
      data: data,
      total: count,
    };
  },

  getOne: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;
    return { data };
  },

  getMany: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .select('*')
      .in('id', params.ids);

    if (error) throw error;
    return { data };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;

    const { data, error, count } = await supabase
      .from(resource)
      .select('*', { count: 'exact' })
      .eq(params.target, params.id)
      .range(start, end)
      .order(field, { ascending: order === 'ASC' });

    if (error) throw error;

    return {
      data: data,
      total: count,
    };
  },

  create: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .insert(params.data)
      .select()
      .single();

    if (error) throw error;
    return { data };
  },

  update: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .update(params.data)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return { data };
  },

  updateMany: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .update(params.data)
      .in('id', params.ids)
      .select();

    if (error) throw error;
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    const { data, error } = await supabase
      .from(resource)
      .delete()
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;
    return { data };
  },

  deleteMany: async (resource, params) => {
    const { error } = await supabase
      .from(resource)
      .delete()
      .in('id', params.ids);

    if (error) throw error;
    return { data: params.ids };
  },
};
