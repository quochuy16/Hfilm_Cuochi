import * as React from 'react';
import './Home.css'
import { CCarousel, CCarouselItem, CImage} from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.css';
import banner1 from './../../assets/images/banner1.jpg'
import banner2 from './../../assets/images/banner2.jpg'
import banner3 from './../../assets/images/banner3.jpg'
import CIcon from '@coreui/icons-react';
import { cilFire} from '@coreui/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Layout from '../../components/Layout';
import {films} from './../../components/films'

function Home(){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '' : '',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return(
        <Layout>
            <div className='home'>
                <div className='banner'>
                    <div className='slideout'>
                        <CCarousel controls transition="crossfade">
                            <CCarouselItem>
                                <CImage className="d-block w-100" src={banner1} alt="slide 1" />
                            </CCarouselItem>
                            <CCarouselItem>
                                <CImage className="d-block w-100" src={banner2} alt="slide 2" />
                            </CCarouselItem>
                            <CCarouselItem>
                                <CImage className="d-block w-100" src={banner3} alt="slide 3" />
                            </CCarouselItem>
                        </CCarousel>
                    </div>
                </div>
                <div className='content'>
                    <div className='title'>
                        <CIcon icon={cilFire} style={{'--ci-primary-color': 'red',width:'40px'}} /> 
                        <div className='nametitle'>Phim Mới</div>
                    </div>
                    <div className='row1'>
                        <Box sx={{ flexGrow: 2 }}>
                            <Grid container spacing={1}>
                                {films.map((film,index)=>(
                                    
                                    <Grid item  xs={6} lg={2} key={index}>
                                        <a href={"/film/"+film.link}>
                                            <Item className='item'><img src={film.img} alt=''/></Item>
                                        </a>
                                        <div className='filmName'>{film.name}</div>
                                        <div className='episodeNumber'>{film.pn} tập</div>
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
export default Home