import React, {useState} from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import {SideBlock} from "./SideBlock";
import {useDispatch} from "react-redux";
import {setTagName} from "../redux/slices/post";

export const TagsBlock = ({items, isLoading}) => {

    const dispatch = useDispatch()
    const [selectedIndex, setSelectedIndex] = useState(null)

    const onClickTag = (tag, index) => {
        setSelectedIndex(index)
        dispatch(setTagName(tag))
    }

    return (
        <SideBlock title="Teglar">
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton selected={selectedIndex === index}
                                        onClick={() => onClickTag(name, index)}
                        >
                            <ListItemIcon>
                                <TagIcon/>
                            </ListItemIcon>
                            {isLoading ? (
                                <Skeleton width={100}/>
                            ) : (
                                <ListItemText primary={name}/>
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </SideBlock>
    );
};
