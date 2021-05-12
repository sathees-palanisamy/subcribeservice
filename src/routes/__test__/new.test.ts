import request from 'supertest';
import { app } from '../../app';
import { Subcribe } from '../../models/subcribe';

it('has a route handler listening to /api/subcribes for post requests', async () => {
  const response = await request(app).post('/api/subcribes').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/subcribes').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/subcribes')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/subcribes')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/subcribes')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/subcribes')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkjf',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/subcribes')
    .set('Cookie', global.signin())
    .send({
      title: 'laskdfj',
    })
    .expect(400);
});

it('creates a subcribe with valid inputs', async () => {
  let subcribes = await Subcribe.find({});
  expect(subcribes.length).toEqual(0);

  const title = 'asldkfj';

  await request(app)
    .post('/api/subcribes')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  subcribes = await Subcribe.find({});
  expect(subcribes.length).toEqual(1);
  expect(subcribes[0].price).toEqual(20);
  expect(subcribes[0].title).toEqual(title);
});
