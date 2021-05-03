const dummy = (blogs) => {
    return 1;
}

const totalLikes = (list) => {
  return  list.map(item => item.likes).reduce((sum, val)=> {
        return sum+val;
    }, 0)
}

const favoriteBlog = (list) => {
    if (list.length === 0)
    {
        return {};
    }
    let likes = list.map(item => item.likes);
    let max = Math.max(...likes);
    const result = list.filter(item => item.likes === max);
    return {
        title: result[0].title,
        author: result[0].author,
        likes: result[0].likes
    }
}

function mostBlogs(list){
    if(list.length === 0)
    {
        return {};
    }
    
    var authors = list.map(function(blog){
      return blog.author;
    });
    let authorsSet = new Set(authors);
    
    let max = 0;
    let currentAuthor = ' '
    for(let author of authorsSet)
    {
        const number = list.filter(blog => blog.author === author).length;
        if(number>max)
        {
            max = number;
            currentAuthor = author;
        }
        else if (number == max && currentAuthor !== author)
        {
            currentAuthor = author;
        }
    }
    
    return {
        author: currentAuthor,
        blogs: max
    }
    }

const mostLikes = (list) => {
        if(list.length === 0)
        {
            return {};
        }

        var authors = list.map(function(blog){
            return blog.author;
          });
          let authorsSet = new Set(authors);
          let currentAuthor = ' ';
          let maxLikes = 0;
          for(let author of authorsSet)
          {
              const likes = list.filter(blog => blog.author === author)
              .map(blog => blog.likes)
              .reduce((sum, num)=> {
                  return sum+num;
              }, 0);
              if(likes> maxLikes && currentAuthor !== author)
              {
                  maxLikes = likes;
                  currentAuthor = author;
              }
              else if (likes === maxLikes && currentAuthor !== author)
              {
                  currentAuthor = author;
              }
              
          }

          return {
              author: currentAuthor,
              likes: maxLikes
          }


    }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}