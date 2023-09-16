import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch} from "react-redux";
import {deleteBookfromState} from "@/store/booksSlice";
import PopUpEditDialog from "@/pages/components/PopUpDialog/PopUpEditDialog";
import {CardMedia} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);


export default function BasicCard(props:Props) {
    const book = props.book
    const dispatch = useDispatch()
    return (
        <Card sx={{minWidth: 175}}>
            <CardContent>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                />
                <Typography variant="h5" component="div">
                    {book.name}
                </Typography>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {book.category}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    ${book.price}
                </Typography>
                <Typography variant="body2">
                    {book.description}
                    <br/>
                </Typography>
            </CardContent>
            <CardActions>
                <div style={{color:"red"}} onClick={()=>{
                    dispatch(deleteBookfromState(book))
                }}>Delete</div>
            </CardActions>

        </Card>
    );
}

interface Props {
    book: {name:string,
        category:string,
        price:string,
        description:string
    }
}