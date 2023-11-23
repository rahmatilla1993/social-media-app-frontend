import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import {CommentsBlock, Post, TagsBlock} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllTags, fetchPosts, selectAllPosts, selectAllTags} from "../redux/slices/post";
import {fetchComments, selectComments} from "../redux/slices/comment";
import {selectUser} from "../redux/slices/auth";
import {Box} from "@mui/material";
import Search from "../components/Search";

export const Home = () => {

    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState(1)
    const {items: posts, isLoading: isPostsLoading} = useSelector(selectAllPosts)
    const {items: tags, isLoading: isTagsLoading} = useSelector(selectAllTags)
    const {comments, isLoading: isCommentsLoading} = useSelector(selectComments)
    const user = useSelector(selectUser)
    const {tagName, search} = useSelector(state => state.post)

    useEffect(() => {
        dispatch(fetchPosts({
            tag: tagName,
            title: search,
            order: tabValue === 2 ? "order" : null
        }))
    }, [tagName, tabValue, search]);

    useEffect(() => {
        dispatch(fetchAllTags())
        dispatch(fetchComments())
    }, []);

    const onChangeTabValue = (event, value) => {
        setTabValue(value)
    }

    return (
        <>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Box gridColumn="span 4">
                    <Tabs
                        style={{marginBottom: 15}}
                        value={tabValue}
                        onChange={onChangeTabValue}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Yangilari" value={1}/>
                        <Tab label="Eng ko'p ko'rilganlar" value={2}/>
                    </Tabs>
                </Box>
                <Box gridColumn="span 8" sx={{
                    width: 500,
                    maxWidth: '100%',
                }}>
                    <Search/>
                </Box>
            </Box>
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
                                imageUrl={obj.imageUrl}
                                commentsCount={obj.comments.length}
                                tags={obj.tags}
                                isEditable={user.id === obj.createdUser.id}
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
                        items={comments.slice(0, 5)}
                        isLoading={isCommentsLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
};
