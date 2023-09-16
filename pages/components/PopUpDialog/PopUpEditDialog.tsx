import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {createBookToState, updateBookToState} from "@/store/booksSlice";
import {InputAdornment} from "@mui/material";
import BasicCard from "@/pages/components/MediaCard/MediaCard";

export default function PopUpEditDialog(props:Props) {
    const book = props.book
    const [open, setOpen] = React.useState(false);
    const [formData,setFormData] = React.useState({
        id:!!book.id?book.id:"no id",
        name:!!book.name?book.name:"no name",
        price: !!book.price?book.price:"no price",
        category:!!book.category?book.category:"no category",
        description:!!book.description?book.description:"no description"
    });
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button onClick={handleClickOpen}>
                <BasicCard book={book}/>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editing the Current Book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        please edit the name, price, category, and description of the book.
                    </DialogContentText>

                    <div style={{display:"flex",flexDirection:"column",marginTop:"10px"}}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            helperText="The name of the book"
                            variant="outlined"
                            autoComplete='off'
                            value={formData.name}
                            onChange={(e) => {
                                setFormData(
                                    {...formData,name:e.target.value}
                                )
                            }}
                        />

                        <TextField
                            margin="dense"
                            id="price"
                            label="Price"
                            value={formData.price}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                            autoComplete='off'
                            helperText="Has to be a valid number"
                            onChange={(e) => {
                                setFormData(
                                    {...formData,price:e.target.value}
                                )
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="category"
                            value={formData.category}
                            label="Category"
                            variant="outlined"
                            autoComplete='off'
                            helperText="The category of the book"
                            onChange={(e) => {
                                setFormData(
                                    {...formData,category:e.target.value}
                                )
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            value={formData.description}
                            fullWidth
                            variant="outlined"
                            helperText="The description of the book"
                            autoComplete='off'
                            onChange={(e) => {
                                setFormData(
                                    {...formData,description:e.target.value}
                                )
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{
                        dispatch(updateBookToState(formData))
                        setFormData({
                            id:!!book.id?book.id:"no id",
                            name:!!book.name?book.name:"no name",
                            price: !!book.price?book.price:"no price",
                            category:!!book.category?book.category:"no category",
                            description:!!book.description?book.description:"no description"
                        })
                        handleClose()
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

interface Props {
    book: {
        id:string
        name:string,
        category:string,
        price:string,
        description:string
    }
}



