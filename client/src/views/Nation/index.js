import Layout from '../../components/Layout'
import './Nation.css'
import { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilFire} from '@coreui/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {films} from './../../components/films'
import Dropdown from 'react-bootstrap/Dropdown';
import { Tooltip } from 'react-tooltip'
const categories =[
    {
        name:'Tất Cả',
        national:''
    }, 
    {
        name:'Trung Quốc',
        national:'china'
    }, 
    {
        name:'Việt Nam',
        national:'vietnam'
    },
    {
        name:'Thái Lan',
        national:'thailand'
    }
]
function Nation(){


    const [nationalName,setNationalName] = useState(categories[0].name)
    const [national,setNational] = useState(categories[0].national)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '' : '',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      console.log(national)
      const [newFilm,setNewFilm] = useState([])
    useEffect(()=>{
        
        if(national===''){
            setNewFilm(films)
        }else{
            const arrFilm=films.filter((film)=>{
              if(film.national===national){
                  return n=>[...n,film]
              }
              return false;
            })
            setNewFilm(arrFilm)
        }
    },[national])
      
    return(
        <Layout>
        <div className="national">
            <div className='content'>
                <div className='title'>
                    <Dropdown className='dropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <CIcon icon={cilFire} style={{'--ci-primary-color': 'red',width:'40px'}} /> 
                            <div className='nametitle'>{nationalName}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>{
                                    setNational('')
                                    setNationalName('Tất Cả')
                                }}>Tất Cả</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                    setNational('china')
                                    setNationalName('Trung Quốc')
                                }}>Trung Quốc</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                    setNational('vietnam')
                                    setNationalName('Việt Nam')
                                }}>Việt Nam</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                    setNational('thailand')
                                    setNationalName('Thái Lan')
                                }}>Thái Lan</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='row1'>
                    <Box sx={{ flexGrow: 2 }}>
                        <Grid container spacing={1}>
                            {newFilm.map((film,index)=>(
                                <Grid item  xs={6} lg={2} key={index}>
                                    <a href={"/film/"+film.link}>
                                        <Item className='item'><img src={film.img} alt=''/></Item>
                                        <Tooltip id="my-tooltip" place='top'/>
                                    <div  data-tooltip-id="my-tooltip"  data-tooltip-content={film.name} className='filmName'>{film.name}</div>
                                    <div className='episodeNumber'>{film.pn} tập</div>
                                    </a>
                                </Grid>
                            ))}
                        </Grid>
                    </Box> 
                </div>
            </div>
        </div>
        </Layout>
    )
}
export default Nation