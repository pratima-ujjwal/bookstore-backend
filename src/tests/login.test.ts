import request from 'supertest';
import app from '../index';

describe('Auth API', () => {
  it('should return 400 if email or password is missing', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: '',
      password: '',
      region: 'india'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});