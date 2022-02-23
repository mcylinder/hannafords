import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addItemAsync, getItemAsync } from "../redux/itemSlice";

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
    const [dbName, setDbName] = useState('');
    const [dbLocation, setDbLocation] = useState('');


    const dispatch = useDispatch();

    const [dataToSubmit, setDataToSubmit] = useState({
        name: null,
        location: null,
        image: null
    });

    const setImgSrc = (srcStrng) => {
        let revisedData = dataToSubmit;
        revisedData.image = srcStrng;
        setDataToSubmit(revisedData);
        validateFields();
    }

    const validateFields = () => {
        let validCount = 0;
        for (const key in dataToSubmit) {
            let fieldValue = dataToSubmit[key] ?? "";
            if (fieldValue.length > 1) validCount++;
        }

        setValidate(validCount >= 3);
    }

    const preparedData = (event) => {
        let targ = event.target;
        let revisedData = dataToSubmit;
        revisedData[targ.name] = targ.value;
        setDataToSubmit(revisedData);
        validateFields();
    };

    const sendData = () => {
        dispatch(addItemAsync(dataToSubmit)).unwrap()
            .then((result) => {
                history.push("/pantry");
            })
            .catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        if (params.id) {
            dispatch(getItemAsync({ id: params.id })).unwrap()
                .then((result) => {
                    console.log(result.item);
                    setDbName(result.item.name)
                    setDbLocation(result.item.location)
                    setImgstring(result.item.image)

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
                value={dbName}
                className={classes.textInput}
                name="name"
                onChange={(e) => preparedData(e)}
            />
            <TextField
                required
                label="Location"
                value={dbLocation}
                name="location"
                onChange={(e) => preparedData(e)}
                className={classes.textInput}
            />

            <ImageEdit setImgSrc={setImgSrc} />

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
