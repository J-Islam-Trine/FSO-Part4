const supertest = require('supertest')
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('../utils/api_helper')

helper.runBeforeEveryTests();

describe('get', () => {
test('gets all blog', async () => {
                const login = await api.post('/api/login').send({
            "name":"Rosalia Hargitt",
            "username":"rhargitt4",
            "password":"MePH7BJ2I"});
            
            const token = login.body.token;
        const posts = await helper.getAllPosts();
        const count = posts.length;
       const response = await api.get('/api/blogs').set('Authorization', 'bearer ' + token);
       // console.log(response.body);
       expect(response.body).toHaveLength(count);
})

test('Not providing jwt gives 401', async () => {
  const resp = await api.
    get('/api/blogs');
    expect(resp.status).toBe(400)
})

test('all blogs have id', async () => {
    const login = await api.post('/api/login').send({
        "name":"Rosalia Hargitt",
        "username":"rhargitt4",
        "password":"MePH7BJ2I"});
        
        const token = login.body.token;
    const response = await api.get('/api/blogs').set('Authorization', 'bearer ' + token);
expect(response).toBeDefined();
});
})

describe('post', () => {
    test('valid data gets posted', async () => {
        const beforePosts = await helper.getAllPosts();
        const beforeCount = beforePosts.length;
        console.log(beforeCount)
        const newBlog = new Blog({
            title: "testing blog list",
            author: "R Pinck",
            url: "www.r-pinck-the-main.com",
            like: 14
        });
        const login = await api.post('/api/login').send({
            "name":"Rosalia Hargitt",
            "username":"rhargitt4",
            "password":"MePH7BJ2I"});

            const token = login.body.token;
        await api.post('/api/blogs').
        set('Authorization','bearer ' + token).send(newBlog);

        const afterPosts = await helper.getAllPosts();
        const afterCount = afterPosts.length;

        expect(afterCount).toBe(beforeCount+1);
        const titles = afterPosts.map(r => r.title);
        expect(titles).toContain('testing blog list');

});

test('without value, like is set to 0', async () => {
    const beforePosts = await helper.getAllPosts();
        const beforeCount = beforePosts.length;
        const newBlog = new Blog({
            title: "test blog post 2",
            author: "P Jellyman",
            url: "www.p-jellyman-the-seaman.com"
        });
        const login = await api.post('/api/login').send({
            "name":"Rosalia Hargitt",
            "username":"rhargitt4",
            "password":"MePH7BJ2I"});

            const token = login.body.token;
        await api
        .post('/api/blogs')
        .set('Authorization', 'bearer '+ token)
        .send(newBlog);
        const afterPosts = await helper.getAllPosts();
        const afterCount = afterPosts.length;
        expect(afterCount).toBe(beforeCount+1);
        expect(afterPosts[afterCount-1].like).toBe(0);
})

test('can\'t be posted without title/url', async () => {
try {
    const newBlog = new Blog({
        author: "P Jellyman"
    });
    const login = await api.post('/api/login').send({
        "name":"Rosalia Hargitt",
        "username":"rhargitt4",
        "password":"MePH7BJ2I"});

        const token = login.body.token;
   const result = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer '+ token)
    .send(newBlog)
    
    expect(result.status).toBe(400);
}
catch(e)
{
    console.log(e)
}
});
})

describe('delete',  () => {
    test('success, when the creator deletes it', async () => {
        const newBlog = new Blog({
            title: "Intuitive 4th generation projection",
            author: "Quentin Gosnell",
            url: "http://engadget.com/enim/leo/rhoncus/sed.aspx"
        });

        const login = await api.post('/api/login').send({
            "name":"Rosalia Hargitt",
            "username":"rhargitt4",
            "password":"MePH7BJ2I"});

            const token = login.body.token;

            const postedBlog = await api.post('/api/blogs').
            set('Authorization','bearer ' + token).send(newBlog);
            // console.log(postedBlog.body)
            const blogId = postedBlog.body.id;
        
          const response =  await api
            .delete(`/api/blogs/${blogId}`)
            .set('Authorization', 'bearer ' + token)
            expect(response.status).toBe(204)
    });

    

    test('fails when some other user tries to delete it', async () => {
        const newBlog = new Blog({
        title: "Intuitive 4th generation projection",
        author: "Quentin Gosnell",
        url: "http://engadget.com/enim/leo/rhoncus/sed.aspx"
    });

    const login = await api.post('/api/login').send({
        "name":"Rosalia Hargitt",
        "username":"rhargitt4",
        "password":"MePH7BJ2I"});

        const token = login.body.token;

        const postedBlog = await api.post('/api/blogs').
        set('Authorization','bearer ' + token).send(newBlog);
        // console.log(postedBlog.body)
        const blogId = postedBlog.body.id;
        const user2 = await api.post('/api/login').send({
            "name":"Verine Boundy",
            "username":"vboundy2",
            "password":"0cuGOO36Y1H"});
        const newToken = user2.body.token;
       const deleteResponse = await api
       .delete(`/api/blogs/${blogId}`)
        .set('Authorization', 'bearer ' + newToken)
        expect(deleteResponse.status).toBe(409)
    });

    
})

describe('update', () => {
    test('success, when the id is valid', async () => {
        const newBlog = new Blog({
            title: "Intuitive 4th generation projection",
            author: "Quentin Gosnell",
            url: "http://engadget.com/enim/leo/rhoncus/sed.aspx"
        });
    
        const login = await api.post('/api/login').send({
            "name":"Rosalia Hargitt",
            "username":"rhargitt4",
            "password":"MePH7BJ2I"});
    
            const token = login.body.token;
    
            const postedBlog = await api.post('/api/blogs').
            set('Authorization','bearer ' + token).send(newBlog);
            // console.log(postedBlog.body)
            const blogId = postedBlog.body.id;

            const updatedValue = new Blog({
                author: "Quentin Gosnell, Han Za"
            })


       const response =  await api
        .put(`/api/blogs/${blogId}`)
        .send(updatedValue)
        .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(204)


//         console.log(data[2].id);


    });
})

afterAll(()=> {
        mongoose.connection.close();
    })