import React, {useEffect} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import {Post} from "../components";
import {TagsBlock} from "../components";
import {CommentsBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllTags, fetchPosts, selectAllPosts, selectAllTags} from "../redux/slices/post";
import {fetchComments, selectComments} from "../redux/slices/comment";

export const Home = () => {

    const dispatch = useDispatch()
    const {items: posts, isLoading: isPostsLoading} = useSelector(selectAllPosts)
    const {items: tags, isLoading: isTagsLoading} = useSelector(selectAllTags)
    const {comments, isLoading: isCommentsLoading} = useSelector(selectComments)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchAllTags())
        dispatch(fetchComments())
    }, [dispatch]);


    return (
        <>
            <Tabs
                style={{marginBottom: 15}}
                value={0}
                aria-label="basic tabs example"
            >
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostsLoading ? [...Array(5)] : posts).map((obj, index) => (
                        isPostsLoading ? <Post key={index} isLoading={isPostsLoading}/> : (
                            <Post
                                id={obj.id}
                                title={obj.title}
                                user={obj.createdUser}
                                createdAt={obj.createdDateTime}
                                viewsCount={obj.viewsCount}
                                commentsCount={obj.comments.length}
                                tags={obj.tags}
                                isEditable
                            />
                        )
                    ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock
                        items={tags}
                        isLoading={isTagsLoading}
                    />
                    <CommentsBlock
                        items={comments}
                        isLoading={isCommentsLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
};
