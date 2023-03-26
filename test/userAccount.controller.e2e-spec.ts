import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser('test'));
    await app.init();
  });

  it('/GET /user/data (UNAUTHORISED)', async () => {
    return await request(app.getHttpServer()).get('/user/data').expect(401);
  });

  it('/POST /auth/register', async () => {
    return await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'a@a.com', password: '12345' })
      .expect(201);
  });

  it('/GET /user/data (AUTHORISED)', async () => {
    let cookies: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a@a.com', password: '12345' })
      .then((res) => {
        cookies = res.headers['set-cookie'].pop().split(';')[0];
      });

    const req = request(app.getHttpServer()).get('/user/data');
    req.cookies = cookies;
    return req.expect(200);
  });

  it('/GET /auth/logout', async () => {
    let cookies: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a@a.com', password: '12345' })
      .then((res) => {
        cookies = res.headers['set-cookie'].pop().split(';')[0];
      });

    const req = request(app.getHttpServer()).get('/auth/logout');
    req.cookies = cookies;
    await req.expect(200);

    await request(app.getHttpServer()).get('/user/data').expect(401);
  });

  it('/DELETE /user', async () => {
    let cookies: string;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'a@a.com', password: '12345' })
      .then((res) => {
        cookies = res.headers['set-cookie'].pop().split(';')[0];
      });

    const req = request(app.getHttpServer()).delete('/user');
    req.cookies = cookies;
    return await req.expect(200);
  });

  afterEach(async () => {
    await app.close();
  });
});
