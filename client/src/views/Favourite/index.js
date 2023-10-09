import { useEffect, useState,useRef } from 'react'
import Layout from '../../components/Layout'
import './Favourite.css'
import AccessError from '../AccessError'
import {getUser} from '../../services/userService'
import {getVideo} from '../../services/videoService'
import {films} from './../../components/films'

import CIcon from '@coreui/icons-react';
import { cilFire} from '@coreui/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Tooltip } from 'react-tooltip'
function Favourite(){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '' : '',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));




    const [token,setToken] = useState()
    const [arrFilmID,setArrFilmID] = useState()
    const [arrFilm,setArrFilm] = useState([])
    useEffect(()=>{
        setToken(localStorage.getItem('Token'))
        const ID = localStorage.getItem("ID")
        if(ID){
            getUser(ID)
            .then((res)=>{
                console.log(res)
                setArrFilmID(res.data.user.favourite)
            })
        }
    },[])
    console.log(arrFilmID)
    useEffect(() => {
        if (arrFilmID && arrFilmID.length > 0) {
          Promise.all(
            arrFilmID.map((id) =>
              getVideo(id).then((res) => res.data.film)
            )
          )
            .then((arrFilms) => {
              console.log(arrFilms);
              setArrFilm(arrFilms);
            })
            .catch((error) => {
              console.error("Error fetching videos:", error);
            });
        }
      }, [arrFilmID]);
    console.log('các film đã thích ',arrFilm)
    console.log('kho fim ',films)

    const heightRef = useRef()
    const [height,setHeight] = useState(201)
    useEffect(() => {
        const element = heightRef.current;
        if (element) {
          const height = element.clientHeight;
          console.log(height);
          setHeight(height)
        }
      }, [heightRef]);
    return(
        <Layout>
            <>
                {!token ? 
                    <AccessError/>
                :
                    <div ref={heightRef} className={height<=800?'favouriteHeightMin':'favourite'}>
                        <div className='content'>
                            <div className='title'>
                                <CIcon icon={cilFire} style={{'--ci-primary-color': 'red',width:'40px'}} /> 
                                <div className='nametitle'>Yêu Thích</div>
                            </div>
                            <div className='row1'>
                                <Box sx={{ flexGrow: 2 }}>
                                    <Grid container spacing={1}>
                                    {arrFilm.map((film,index)=>(
                                        films.map((films,i)=>{
                                            if(film.filmName === films.filmName) {
                                                return (
                                                    <Grid item xs={6} lg={2} key={index}>
                                                        <a href={"/film/"+film.filmEpisode}>
                                                            {console.log(film)}
                                                            <Item className='item'><img src={films.img} alt=''/></Item>
                                                            <Tooltip id="my-tooltip"  place='top'/>
                                                            <div data-tooltip-id="my-tooltip" data-tooltip-content={film.name} className="filmName" >{film.name}</div>
                                                        </a>
                                                    </Grid>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })
                                    ))}
                                    </Grid>
                                </Box> 
                            </div>
                        </div>
                    </div>
                }
            </>
        </Layout>
    )
}
export default Favourite