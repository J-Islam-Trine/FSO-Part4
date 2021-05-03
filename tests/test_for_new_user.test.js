const supertest = require('supertest')
const app = require('../app');
const api = supertest(app);
const user = require('../models/user')
const mongoose = require('mongoose')
const helper = require('../utils/api_helper')

helper.runBeforeEveryTests();

//can\'t add a user without username
test('can\'t add a user without username', async () => {
    await api
    .post('/api/users')
    .send({name: "Harry", password: "55s41SHts"})
    .set('Content-type', 'application/json')
    .expect(401)
  
  })

test('can\'t add a user without password', async () => {
    await api
     .post('/api/users')
     .set('Content-type', 'application/json')
     .send({username: "boxpham"})
     .expect(401)

   })

   test('can\'t add a user with short password', async () => {
    await api
     .post('/api/users')
     .set('Content-type', 'application/json')
     .send({username: "boxpham", password: "s1"})
     .expect(401)
   
   })
  
test('can\'t add a user with short username', async () => {
    await api
     .post('/api/users')
     .set('Content-type', 'application/json')
     .send({username: "bo", password: "shxdnxsh"})
     .expect(401)
   })
  
test('can\'t add user if the username already exists', async () => {
    await api
     .post('/api/users')
     .set('Content-type', 'application/json')
     .send({username: "bjorn2541", password: "sjhsxn5s2"})
     .expect(409)
   
   })


  afterAll(()=> {
    mongoose.connection.close();
})

