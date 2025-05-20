import express from 'express';
import {
  listBooks,
  getBookBySlug,
  getFeaturedBooks,
  searchBooks
} from '../controllers/booksController';

const router = express.Router();

router.get('/', listBooks);                  // GET /books
router.get('/featured', getFeaturedBooks);   // GET /books/featured
router.get('/search', searchBooks);          // GET /books/search?q=...
router.get('/:slug', getBookBySlug);         // GET /books/:slug

export default router;