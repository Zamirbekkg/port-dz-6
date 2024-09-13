import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Moviem5 = () => {
    const [posts, setPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [newPost, setNewPost] = useState({ title: '', year: '' });
    const [editedPost, setEditedPost] = useState({ title: '', year: '' });
    const [createTime, setCreateTime] = useState(null);

    useEffect(() => {
        fetchAPI();
        setCreateTime(Date.now());
    }, []);

    const fetchAPI = () => {
        axios.get('http://localhost:5000/post')
        .then(res => {
            setPosts(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    };

    const handleAddPost = () => {
        addPost(newPost);
    };

    const addPost = (post) => {
        axios.post('http://localhost:5000/post', post)
        .then(() => {
            fetchAPI();
            setNewPost({ title: '', year: '' });
        })
        .catch(error => console.error(error));
    };

    const handleEditClick = (post) => {
        setEditPostId(post.id);
        setEditedPost({ title: post.title, year: post.year });
    };

    const handleUpdatePost = (id) => {
        updatePost(id, editedPost);
    };

    const updatePost = (id, updatedData) => {
        axios.patch(`http://localhost:5000/post/${id}`, updatedData)
        .then(() => {
            fetchAPI();
            setEditPostId(null);
        })
        .catch(error => console.error(error));
    };

    const handleDeletePost = (id) => {
        axios.delete(`http://localhost:5000/post/${id}`)
        .then(() => {
            fetchAPI();
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="container">
            <h1>Movies</h1>
            {createTime && (
                <p>Date and time of creation: {new Date(createTime).toLocaleString()}</p>
            )}
            <ul>
                {posts.map(Post => (
                    <li key={Post.id}>
                        {editPostId === Post.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedPost.title}
                                    onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editedPost.year}
                                    onChange={(e) => setEditedPost({ ...editedPost, year: e.target.value })}
                                />
                                <button onClick={() => handleUpdatePost(Post.id)}>Save</button>
                                <button onClick={() => setEditPostId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <Link to={`/description/${Post.id}`}>
                                    {Post.title} ({Post.year})
                                </Link>
                                <div>
                                    <button onClick={() => handleEditClick(Post)}>Edit</button>
                                    <button onClick={() => handleDeletePost(Post.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <h2>Add a new movie</h2>
            <div className="add-post">
                <input
                    type="text"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={newPost.year}
                    onChange={(e) => setNewPost({ ...newPost, year: e.target.value })}
                />
                <button onClick={handleAddPost}>Add Movie</button>
            </div>
        </div>
    );
}

export default Moviem5;