import { Request, Response } from 'express';
import { getSupabase } from '../config/supabase';
import { getRegion } from '../utils/region';

export async function listBooks(req: Request, res: Response): Promise<void> {
  const { region } = req.query;
  const supabase = getSupabase(getRegion(region));

  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
    return;
  }

  res.json(data);
}

export async function getBookBySlug(req: Request, res: Response): Promise<void> {
  const { region } = req.query;
  const { slug } = req.params;
  const supabase = getSupabase(getRegion(region));

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }

  res.json(data);
}

export async function getFeaturedBooks(req: Request, res: Response): Promise<void> {
  const { region } = req.query;
  const supabase = getSupabase(getRegion(region));

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true);

  if (error) {
    res.status(500).json({ error: 'Failed to fetch featured books' });
    return;
  }

  res.json(data);
}

export async function searchBooks(req: Request, res: Response): Promise<void> {
  const { region, q } = req.query;
  const supabase = getSupabase(getRegion(region));

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${q}%`);

  if (error) {
    res.status(500).json({ error: 'Search failed' });
    return;
  }

  res.json(data);
}
