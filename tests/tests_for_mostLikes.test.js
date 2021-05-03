

const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', ()=> {
    const emptyList = [];
    test('no blog, no author', ()=> {
        expect(mostLikes(emptyList)).toEqual({});
    });
    const list1 =  [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 7,
          __v: 0
        }];

        test('3 blog, 2 author, unequal likes', ()=> {
            expect(mostLikes(list1)).toEqual({
                author: 'Edsger W. Dijkstra',
                likes: 12
            });
        });

        const list2 =  [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            },
            {
              _id: "5a422aa71b54a676234d17f8",
              title: "Go To Statement Considered Harmful",
              author: "Harold P Jensen",
              url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
              likes: 7,
              __v: 0
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 7,
              __v: 0
            }];

            test('3 blog, 3 author, equal likes', ()=> {
                
                expect(mostLikes(list2)).toEqual({
                    author: 'Edsger W. Dijkstra',
                    likes: 7
                });
                // console.log(mostLikes(list2))
            });
})