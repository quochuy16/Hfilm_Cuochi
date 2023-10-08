import Layout from '../../components/Layout'
import './Categories.css'
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
        category:''
    }, 
    {
        name:'Tình Cảm',
        category:'tinh-cam'
    }, 
    {
        name:'Kinh Dị',
        category:'kinh-di'
    },
    {
        name:'Kiếm Hiệp',
        category:'kiem-hiep'
    }
]

function Categories(){
    const [categoryName,setCategoryName] = useState(categories[0].name)
    const [category,setCategory] = useState(categories[0].category)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '' : '',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      console.log(category)
      const [newFilm,setNewFilm] = useState([])
    useEffect(()=>{
        
        if(category===''){
            setNewFilm(films)
        }else{
            const arrFilm=films.filter((film)=>{
              if(film.category===category){
                  return n=>[...n,film]
              }
              return false;
            })
            setNewFilm(arrFilm)
        }
    },[category])
      
    return(
        <Layout>
        <div className="categories">
            <div className='content'>
                <div className='title'>
                    <Dropdown className='dropdown'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <CIcon icon={cilFire} style={{'--ci-primary-color': 'red',width:'40px'}} /> 
                            <div className='nametitle'>{categoryName}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='dropdownMenu'>
                            <Dropdown.Item onClick={()=>{
                                    setCategory('')
                                    setCategoryName('Tất Cả')
                                }}>Tất Cả</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                    setCategory('tinh-cam')
                                    setCategoryName('Tình Cảm')
                                }}>Tình Cảm</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                    setCategory('kinh-di')
                                    setCategoryName('Kinh Dị')
                                }}>Kinh Dị</Dropdown.Item>
                            <Dropdown.Item onClick={()=>{
                                    setCategory('kiem-hiep')
                                    setCategoryName('Kiếm Hiệp')
                                }}>Kiếm Hiệp</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='row1'>
                    <Box sx={{ flexGrow: 2 }}>
                        <Grid container spacing={1}>
                            {newFilm.map((film,index)=>(
                                <Grid item  xs={6} lg={2} key={index}>
                                    <a href={"/film/"+film.link}>
                                        {console.log(film)}
                                        <Item className='item'><img src={film.img} alt=''/></Item>
                                        <Tooltip id="my-tooltip"  place='top'/>
                                        <div data-tooltip-id="my-tooltip" data-tooltip-content={film.name} className="filmName" >{film.name}</div>
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
export default Categories