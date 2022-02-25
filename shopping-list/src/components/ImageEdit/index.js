import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import ReactCrop from 'react-image-crop';
import '../../../node_modules/react-image-crop/dist/ReactCrop.css';

const useStyles = makeStyles((theme) => {
    return {
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

export default function ImageEdit({ setImgSrc, imgdb }) {
    const classes = useStyles();

    const [srcImg, setSrcImg] = useState(null);
    const [typeImg, setTypeImg] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 4 / 4 });
    const [showPicker, setShowPicker] = useState(true);
    const [showStatus, setShowStatus] = useState('crop');

    useEffect(() => {
        setShowPicker(null === srcImg);
    }, [srcImg]);

    useEffect(() => {
        setSrcImg(imgdb);
    }, [imgdb]);

    const handleImage = async (event) => {
        setSrcImg(URL.createObjectURL(event.target.files[0]));
        setTypeImg(event.target.files[0].type);
    };

    const getCroppedImg = async () => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL(typeImg, 1);
            setImgSrc(base64Image);
            setShowStatus('cropped!')

        } catch (e) {
            setShowStatus('there was an error')
        }
    };

    return (
        <>
            {showPicker ? (<label htmlFor="imageFilePicker" className={classes.cta}>
                Select image
            </label>) : ''}

            <input
                style={{ visibility: "hidden" }}
                required
                id="imageFilePicker"
                label="Image URL"
                defaultValue=""
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImage}
                className={classes.textInput}
            />

            <div style={{ marginTop: "15px" }}>
                {srcImg && (
                    <div>
                        <ReactCrop
                            style={{ maxWidth: "80%" }}
                            src={srcImg}
                            onImageLoaded={setImage}
                            crop={crop}
                            onChange={setCrop}
                        /><br />
                        <Button onClick={getCroppedImg} className={classes.cta}>
                            {showStatus}
                        </Button>

                        <Button onClick={() => setSrcImg(null)} className={classes.cta} style={{ marginLeft: '30px' }}>
                            remove
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

