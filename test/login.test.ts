import request from 'supertest';
import app from '../src/index';
import User from "../src/models/User.model"

describe('Signup Controller', () => {
  it('should create a new user', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
    };

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');

    // Check if the user was actually saved in the database
    const savedUser = await User.findOne({ email: newUser.email });
    expect(savedUser).toBeTruthy();
  });

  it('should return an error for an existing email', async () => {
    const existingUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
    };

    await User.create(existingUser);

    const response = await request(app)
      .post('/signup')
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('user with this email already exists');
  });
});
