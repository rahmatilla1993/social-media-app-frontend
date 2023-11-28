import ListItemAvatar from "@mui/material/ListItemAvatar";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import React from "react";

function CommentItem({obj, isLoading}) {
    return(
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40}/>
                ) : (
                    <Avatar src={obj.user.imageUrl} />
                )}
            </ListItemAvatar>
            {isLoading ? (
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Skeleton variant="text" height={25} width={120}/>
                    <Skeleton variant="text" height={18} width={230}/>
                </div>
            ) : (
                <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.content}
                />
            )}
        </ListItem>
    )
}

export default CommentItem