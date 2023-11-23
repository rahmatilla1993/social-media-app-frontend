import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Post.module.scss";
import {UserInfo} from "../UserInfo";
import {PostSkeleton} from "./Skeleton";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchRemovePost} from "../../redux/slices/post";

export const Post = ({
                         id,
                         title,
                         createdAt,
                         user,
                         viewsCount,
                         commentsCount,
                         tags,
                         imageUrl,
                         children,
                         isFullPost,
                         isLoading,
                         isEditable,
                     }) => {

    const image = "https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
    const dispatch = useDispatch()

    const onClickRemove = async () => {
        if (window.confirm("Siz rostdan ham bu postni o'chirmoqchimisiz?")) {
            dispatch(fetchRemovePost(id))
        }
    }

    return (
        isLoading ? <PostSkeleton/> : (
            <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
                {isEditable && (
                    <div className={styles.editButtons}>
                        <IconButton color="primary">
                            <Link to={`/main/edit-post/${id}`}>
                                <EditIcon/>
                            </Link>
                        </IconButton>
                        <IconButton color="secondary" onClick={onClickRemove}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                )}
                <img
                    className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
                    src={imageUrl || image}
                    alt={title}
                />
                <div className={styles.wrapper}>
                    <UserInfo {...user} additionalText={new Date(createdAt).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}/>
                    <div className={styles.indention}>
                        <h2
                            className={clsx(styles.title, {[styles.titleFull]: isFullPost})}
                        >
                            {isFullPost ? title :
                                <Link to={`/main/posts/${id}`}>{title}</Link>
                            }
                        </h2>
                        <ul className={styles.tags}>
                            {tags.map((name) => (
                                <li key={name}>
                                    <Link to={`/tag/${name}`}>#{name}</Link>
                                </li>
                            ))}
                        </ul>
                        {children && <div className={styles.content}>{children}</div>}
                        <ul className={styles.postDetails}>
                            <li>
                                <EyeIcon/>
                                <span>{viewsCount}</span>
                            </li>
                            <li>
                                <CommentIcon/>
                                <span>{commentsCount}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    );
};
