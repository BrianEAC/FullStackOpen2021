const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  total = 0;
  blogs.forEach((blog) => (total += blog.likes));
  return total;
};

const favBlog = (blogs) => {
  if (blogs.length > 0)
    return blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

module.exports = {
  dummy,
  totalLikes,
  favBlog,
};
