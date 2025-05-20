import { Request, Response } from 'express';
import { getSupabase } from '../config/supabase';
import { getRegion } from '../utils/region';

export async function listCategories(req: Request, res: Response): Promise<void> {
  const { region } = req.query;
  const supabase = getSupabase(getRegion(region));
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
    return;
  }

  res.json(data);
}

export async function getBooksByCategorySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const { region } = req.query;
  const supabase = getSupabase(getRegion(region));

  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (catError || !category) {
    res.status(404).json({ error: 'Category not found' });
    return;
  }

  const { data, error } = await supabase
    .from('product_categories')
    .select('product_id')
    .eq('category_id', category.id);

  if (error) {
    res.status(500).json({ error: 'Failed to fetch product mappings' });
    return;
  }

  const productIds = data.map((d) => d.product_id);

  const result = await supabase
    .from('products')
    .select('*')
    .in('id', productIds);

  if (result.error) {
    res.status(500).json({ error: 'Failed to fetch books' });
    return;
  }

  res.json(result.data);
}
