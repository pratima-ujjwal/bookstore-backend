import express from 'express';
import {
  listCategories,
  getBooksByCategorySlug
} from '../controllers/categoriesController';

const router = express.Router();

router.get('/', listCategories);                 // GET /categories
router.get('/:slug/books', getBooksByCategorySlug); // GET /categories/:slug/books

export default router;