import {React, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import { IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    '& > *': {
  
        width: '25ch',
      },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  table: {
    minWidth: 650,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function Home() {

    const [label , setLabel] = useState("");
    const [datas , setDatas] = useState([]);
    const [labelUpdate , setLabelUpdate] = useState();
    const [idUpdate , setIdUpdate] = useState();
    const [open, setOpen] = useState(false);

    const handleClickOpen = (id) => {

      if(label = datas)
      {
        
      }
        axios.get(`http://127.0.0.1:8000/api/todo/get_by_id/${id}`,
        {
            headers : {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then((data)=>{
            setLabelUpdate(data.data.label)
            setIdUpdate(data.data.id)
        })



      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
    const supp = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/todo/destroy/${id}`,
      {
        headers : {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
       }
      }
       )
       .then((data) => {
        setDatas(data.data);
      })


      
    }


    const UpdateTodo = () => {
        let fd = new FormData();
        fd.append("label",labelUpdate);
        axios.post(`http://127.0.0.1:8000/api/todo/update/${idUpdate}`,fd,
        {
          headers : {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then((data) => {
        setDatas(data.data);
      })


    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todo/index',
        {
            headers : {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then((data)=>{
            
            setDatas(data.data);
        })

    }, [])

    const  ajouter = () => {
        console.log("i am in function ajouter " , label );
        let fd = new FormData() ;
        fd.append("label",label);
        axios.post('http://127.0.0.1:8000/api/todo/store',fd,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            }
          )
          .then((data)=>{
            setDatas(data.data);
          })
          .catch((error) => {
 
            if(error.response.status === 401)
            {
                window.location.href="/"
            }
            
        })

    }
  
    return (
        <div>
        <div className="m-auto w-50 mt-3">
      <Card className={classes.root}>
      <CardHeader
       title="Add a todo"
        subheader="September 14, 2016"
      />
    
        <CardContent>
         
          <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="label" onChange={e =>{setLabel(e.target.value)}} />
             </form>
          
        </CardContent>
        <CardActions>
          <Button size="small" onClick={ajouter}>ADD</Button>
        </CardActions>
      </Card>
      </div>
      <br/>
      <div >
  
    
    
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Created AT</TableCell>
            <TableCell align="right">Actions </TableCell>

        </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">
                  <Button variant="outlined" color="primary" onClick={()=>handleClickOpen(row.id)}>
                      Update
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={()=>supp(row.id)}>
                    Supprimer
                  </Button>
         </TableCell>

             
             </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
     
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update an todo?"}</DialogTitle>
        <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label="label" value={labelUpdate} onChange={e =>{setLabelUpdate(e.target.value)}} />
             </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={UpdateTodo} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
}
