import { useEffect,useRef,useState } from 'react';
import Layout from '../../components/Layout'
import './Series.css'
import { useLocation } from 'react-router-dom';
import {films} from './../../components/films';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Tooltip } from 'react-tooltip'
function Series(){
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '' : '',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('search');
    console.log('tìm kiếm :',id)

    const [searchResults, setSearchResults] = useState([]);
    useEffect(()=>{
        if(id){
            const filteredProducts = films.filter((product) => {
                return product.name.toLowerCase().includes(id.toLowerCase());
              });
              setSearchResults(filteredProducts)
        }else{
            setSearchResults(films)
        }
    },[id])
    console.log(searchResults)
    const heightRef = useRef()
    const [height,setHeight] = useState(201)
    useEffect(() => {
        const element = heightRef.current;
        if (element) {
          const height = element.clientHeight;
          console.log(height<=600,height);
          setHeight(height)
        }
      }, [heightRef,id,searchParams]);
    return(
        <Layout>
        <div className={height<=500?'seriesHeightMin':'series'}>
            <div className='content'>
                <div ref={heightRef} className='row1'>
                    <Box sx={{ flexGrow: 2 }}>
                        <Grid container spacing={1}>
                            {searchResults.map((film,index)=>(
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
export default Series