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
import moment from 'moment'
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
export default function List() {
    const [DataPointage, setDataPointage] = useState([]);
    const Excel = () => {
        let table = Array();
        table.push({id:"id" , nom :"Nom" , prenom : "Prenom" ,site : "Site" , Date : "Date" , Entrer : "Entrer" , Sortie :""})


    }
    useEffect(() => {
    axios.get('http://192.168.0.130:8000/api/list')
    .then((data)=>{
        console.log(data);
        console.log("here");
        setDataPointage(data.data);
    })
       
    }, [])

  const classes = useStyles();
    return (
        <div>
            <button className="btn btn-primary m-3" > Generation d'excel</button>
            <br/>
            <br/>
            <br/>
                <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Nom</TableCell>
            <TableCell align="right">Prenom</TableCell>
            <TableCell align="right">Site</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Entrer</TableCell>
            <TableCell align="right">Sortie</TableCell>
            <TableCell align="right">Flag</TableCell>
            <TableCell align="right">Actions </TableCell>

        </TableRow>
        </TableHead>
        <TableBody>
        {DataPointage.map((row)=>(
        <TableRow key={row.id}>

            <TableCell align="right">{row.id}</TableCell>
            <TableCell align="right">{row.nom}</TableCell>
            <TableCell align="right">{row.prenom}</TableCell>
            <TableCell align="right">{row.Site_pointage}</TableCell>
            <TableCell align="right">{ moment.unix(row.QR_Unix_Time).format("DD/MM/YYYY")}</TableCell>
            <TableCell align="right">{ moment.unix(row.QR_Unix_Time).format("HH:mm:ss")}</TableCell>
            <TableCell align="right">{ moment.unix(row.QR_Unix_Time_s).format("HH:mm:ss")}</TableCell>
            <TableCell align="right">{row.Flag == null ? "Pas de problème" : "problème dans çe pointage" }</TableCell>
            <TableCell align="right">Actions </TableCell>

          </TableRow>
             ))}  
        </TableBody>
      </Table>
    </TableContainer>
        
     
        </div>
    )
}
