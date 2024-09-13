import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Movierx = () => {
    const { id } = useParams();
    const [post, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Добавьте состояние для обработки ошибок

    useEffect(() => {
        // Вызывайте API только при изменении id
        if (id) {
            getAPI();
        }
    }, [id]); // Обновите зависимость

    const getAPI = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/posts/${id}`);
            setPosts(response.data); // Предполагается, что response.data уже содержит нужные данные
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Ошибка при загрузке данных');
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!post) {
        return <div>Movie not found</div>
    }

    return (
        <div>
            <h1>Movie Details</h1>
            <div>
                <p><b>Title: </b>{post.title}</p>
                <p><b>Year: </b>{post.year}</p>
            </div>
            <Link to="/">Go home</Link>
        </div>
    );
}

export default Movierx;
