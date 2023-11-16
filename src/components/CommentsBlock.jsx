import React from "react";

import {SideBlock} from "./SideBlock";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import CommentItem from "./CommentItem";

export const CommentsBlock = ({items, isLoading, children}) => {

    return (
        <SideBlock title="Комментарии">
            <List>
                {(isLoading ? [...Array(5)] : items).map((obj, index) => (
                    <React.Fragment key={index}>
                        <CommentItem obj={obj} isLoading={isLoading}/>
                        <Divider variant="inset" component="li"/>
                    </React.Fragment>
                ))}
            </List>
            {children}
        </SideBlock>
    );
};
