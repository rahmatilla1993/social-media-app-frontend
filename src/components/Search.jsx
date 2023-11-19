import TextField from "@mui/material/TextField";
import React, {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {debounce} from "@mui/material";
import {setSearch} from "../redux/slices/post";

function Search() {

    const dispatch = useDispatch()
    const [value, setValue] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchValue = useCallback(
        debounce((str) => {
            if (str !== '') {
                dispatch(setSearch(str));
            } else {
                dispatch(setSearch(null))
            }
        }, 300),
        [],
    );

    const onChangeInput = (event) => {
        const item = event.target.value
        setValue(item)
        updateSearchValue(item)
    }

    return (
        <TextField id="standard-basic" variant='standard' fullWidth label="Search" value={value}
                   onChange={onChangeInput}/>
    )
}

export default Search