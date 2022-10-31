import React, { useState, useEffect } from 'react'
import styles from '@styles/BlogPage.module.scss'

type Post = {
  id?: string
  date: string
  text: string
  tempId?: number
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [text, setText] = useState('')

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${process.env.NEXT_PUBLIC_HARPER_HEADER}`);

  // Fetch posts from HarperDB
  const postLoader = async () => {
    const raw = JSON.stringify({
        "operation": "sql",
        "sql": `SELECT * FROM news.news ORDER BY date DESC`
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("https://bimhl-adamryan.harperdbcloud.com", requestOptions)
      .then(response => response.text())
      .then(result => setPosts(JSON.parse(result)))
      .catch(error => console.log('error', error));
  }

  // Remove a post to HarperDB
  const removePost = async (post:Post) => {

    setPosts(posts.filter((p) => p.id !== post.id));

    var raw = JSON.stringify({
      "operation": "delete",
      "schema": "news",
      "table": "news",
      "hash_values": [
        post.id
      ]
  });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("https://bimhl-adamryan.harperdbcloud.com", requestOptions)
      .then(response => response.text())
      .then(result => console.log('result', result))
      .catch(error => console.log('error', error));
  }

  //Set Current Date
  const dateToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
  }

  // Add a post to HarperDB
  const addPost = async (post: Post) => {

    post.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let _posts = [...posts];
    _posts.push(post)
    setPosts(_posts)

    var raw = JSON.stringify({
      "operation": "insert",
      "schema": "news",
      "table": "news",
      "records": [
        {
          "text": post.text,
          "date": post.date
        },
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("https://bimhl-adamryan.harperdbcloud.com", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result, result))
      .catch(error => console.log('error', error));
  }

  //Update a post
  const updatePost = async (post: Post) => {

    var raw = JSON.stringify({
      "operation": "update",
      "schema": "news",
      "table": "news",
      "records": [
        {
          "text": post.text,
          "date": post.date
        },
    ]
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("https://bimhl-adamryan.harperdbcloud.com", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result, result))
      .catch(error => console.log('error', error));
  }

  //load posts on page load
  useEffect(() => {
    postLoader()
    setLoading(false)
    console.log(posts)
  }, [])

  return (
    <div className={styles.container}>
      {loading ? <div>...Loading</div> :
        <div className={styles.postsArea}>
      <>
        <h1>Existing Posts</h1>
        {posts.map((post: Post) => (
          <div className={styles.blogPost} key={post.id}>
            <h2>{post.date}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.text }} />
            <button onClick={() => removePost(post)}>Delete</button>
          </div>
        ))}
      </>
      </div>
    }
      <div className={styles.postArea}>
        <h1>Add a Post</h1>
        <textarea className={styles.postText} value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => addPost({date: dateToday(), text: text})}>Add Post</button>
      </div>
    </div>
  )
}

export default BlogPage