import * as mysql from 'mysql';
import { QueryFunction } from 'mysql';
import { Post } from './model/post';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'trayan',
  password: 'trayan',
  database: 'fullstack_react_2022'
})

connection.connect();

const createSql = `INSERT INTO posts (
  title,
  content,
  author_id,
  image_url,
  tags,
  categories
)
VALUES (
  'Intro To SQL',
  'SQL is a standart for accessing relational data ...',
  '1',
  'https://cdn-icons-png.flaticon.com/512/2772/2772165.png',
  'sql, intro',
  'database'
);`;

const updateSql = `UPDATE posts 
SET title = ?,
  content = ?,
  author_id = ?,
  image_url = ?,
  tags = ?,
  categories = ?,
  created = ?,
  modified = ?
WHERE id = ?;`;


connection.query(createSql, (err, rows, fields) => {
  if (err) throw err;
  console.log('1 post inserted successfully with ID=' + rows.insertId)
  console.log(rows);
});

connection.query('SELECT * FROM posts WHERE id=?', [1], (err, rows, fields) => {
  if (err) throw err
  if (rows.length == 1) {
    const post = rows[0] as Post;
    console.log('Selected post:', post);
    //change first record title
    post.title = 'New Title 987';
  
    connection.query(updateSql,
      [post.title, post.content, post.authorId, post.imageUrl, post.tags, post.categories,
      post.created, post.modified, post.id],
      (err2, rows2, fields2) => {
        if (err2) throw err2;
        console.log(`${rows2.affectedRows} post updated successfully`)
        console.log(rows2);
        console.log('All posts:')
        connection.query('SELECT * FROM posts', (err3, rows3, fields3) => {
          if (err3) throw err3
          rows3.forEach(row => console.log(row));
        })
        
        connection.end();
      });
  }
})


