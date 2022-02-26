import React from 'react'

const BlogForm = ({submit,
                   title,
                   author,
                   url,
                   titleChange,
                   authorChange,
                   urlChange}) => (
    <form onSubmit={submit}>
       <div> title: <input value={title} onChange={titleChange}/></div>
        <div>  author: <input value={author} onChange={authorChange}/></div>
        <div>  url: <input value={url} onChange={urlChange}/></div>
        <button type='submit'>add blog</button>
    </form>
)

export default BlogForm

