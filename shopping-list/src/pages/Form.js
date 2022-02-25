import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addItemAsync, getItemAsync, updateItemAsync } from "../redux/itemSlice";

import { Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import ImageEdit from "../components/ImageEdit"

const useStyles = makeStyles((theme) => {
    return {
        textInput: {
            marginRight: theme.spacing(2),
        },
        formStyle: {
            maxWidth: "52ch",
            margin: "0 auto",
        },
        formButton: {
            marginTop: theme.spacing(3),
        },
        cta: {
            padding: '8px 10px',
            backgroundColor: '#f4f4f4',
            display: 'inline-block',
            fontSize: '.7rem',
            border: '1px solid gray',
            borderRadius: '5px',
            marginTop: theme.spacing(3),
            cursor: 'pointer',
        }
    }
});

export default function Form() {
    const params = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [valid, setValidate] = useState(false);
    const [imgstring, setImgstring] = useState('');
    const [imgdb, setImgdb] = useState(null);
    const [dataToSubmit, setDataToSubmit] = useState({
        name: '',
        location: '',
        image: ''
    });

    const dispatch = useDispatch();

    const setImgSrc = (srcStrng) => {
        setDataToSubmit(prevState => ({
            ...prevState,
            image: srcStrng
        }));
        validateFields();
    }

    const validateFields = () => {
        let validCount = 0;
        for (const key in dataToSubmit) {
            let fieldValue = dataToSubmit[key] ?? "";
            if (fieldValue.length > 0) validCount++;
        }

        setValidate(validCount >= 3);
    }

    const onChange = event => {
        const { name, value } = event.target;
        setDataToSubmit(prevState => ({
            ...prevState,
            [name]: value,
        }));
        validateFields();
    };

    const sendData = () => {
        if (params.id) {
            dataToSubmit['id'] = params.id;
            dispatch(updateItemAsync(dataToSubmit)).unwrap()
                .then((result) => {
                    history.push("/pantry");
                })
                .catch((err) => {
                    console.log(err);
                })
        } else { 
        dispatch(addItemAsync(dataToSubmit)).unwrap()
            .then((result) => {
                history.push("/pantry");
            })
            .catch((err) => {
                console.log(err);
            })
        }
    };

    useEffect(() => {
        if (params.id) {
            dispatch(getItemAsync({ id: params.id })).unwrap()
                .then((result) => {

                    setDataToSubmit(prevState => ({
                        ...prevState,
                        name: result.item.name,
                        location: result.item.location,
                        image: result.item.image
                    }));

                    setImgdb(result.item.image);
                    validateFields();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, []);

    return (
        <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "50ch" } }}
            autoComplete="off"
            className={classes.formStyle}
        >
            <TextField
                required
                label="Item name"
                value={dataToSubmit.name}
                className={classes.textInput}
                name="name"
                onChange={onChange}
            />
            <TextField
                required
                label="Location"
                value={dataToSubmit.location}
                name="location"
                onChange={onChange}
                className={classes.textInput}
            />

            <ImageEdit setImgSrc={setImgSrc} imgdb={imgdb} />
            <Button
                variant="outlined"
                disabled={!valid}
                className={classes.formButton}
                onClick={() => sendData()}
            >
                Submit
            </Button>
        </Box>
    );
}
