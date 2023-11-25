import React, {useEffect, useState} from "react";

import {Post} from "../components";
import {CommentsBlock} from "../components";
import {useParams} from "react-router-dom";
import axios from "../util/axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchCommentsByPost, selectCommentDataByPost} from "../redux/slices/comment";

export const FullPost = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const [post, setPost] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {items, isLoading: commentLoading} = useSelector(selectCommentDataByPost)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            try {
                const {data} = await axios.get(`/posts/${id}`)
                setPost(data)
                dispatch(fetchCommentsByPost(id))
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
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
                likes={post.likes}
                likedUsers={post.likedUsers}
                imageUrl={post.imageUrl}
                commentsCount={items.length}
                tags={post.tags}
                isFullPost
            >
                <p>
                    {post.text}
                </p>
            </Post>
            <CommentsBlock
                postId={id}
                items={items}
                isLoading={commentLoading}
            />
        </>
    );
};
