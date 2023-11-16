import React, {useEffect, useState} from "react";

import {Post} from "../components";
import {Index} from "../components";
import {CommentsBlock} from "../components";
import {useParams} from "react-router-dom";
import axios from "../util/axios";

export const FullPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)

        axios.get(`/posts/${id}`)
            .then(({data}) => {
                setIsLoading(false)
                setPost(data)
            })
            .catch(err => console.log(err))

        axios.get(`/comments/${id}`)
            .then(({data}) => {
                setComments(data)
            })
            .catch(err => console.log(err))
    }, [id]);

    if (isLoading) {
        return <Post isLoading={true}/>
    }

    return (
        <>
            <Post
                id={id}
                title={post.title}
                user={post.createdUser}
                createdAt={post.createdDateTime}
                viewsCount={post.viewsCount}
                commentsCount={comments.length}
                tags={post.tags}
                isFullPost
            >
                <p>
                    {post.text}
                </p>
            </Post>
            <CommentsBlock
                items={comments}
                isLoading={false}
            >
                <Index/>
            </CommentsBlock>
        </>
    );
};
