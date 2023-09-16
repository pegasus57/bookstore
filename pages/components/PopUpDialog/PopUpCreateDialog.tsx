import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from "react-redux";
import {createBookToState} from "@/store/booksSlice";
import {InputAdornment} from "@mui/material";
export default function PopUpCreateDialog() {
    const [open, setOpen] = React.useState(false);
    const [formData,setFormData] = React.useState({
        name:"",
        price: "",
        category:"",
        description:""
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
            <Button variant="outlined" onClick={handleClickOpen}>
                add a book
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adding a book to the store</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       please type in the name, price, category, and description of the book.
                    </DialogContentText>

                    <div style={{display:"flex",flexDirection:"column",marginTop:"10px"}}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            helperText="The name of the book"
                            variant="outlined"
                            autoComplete='off'
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
                            type="number"
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
                            dispatch(createBookToState(formData))
                            setFormData({
                                name:"",
                                price: "",
                                category:"",
                                description:""
                            })
                            handleClose()
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}



