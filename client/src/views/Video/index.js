import './Video.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getAllVideos} from '../../services/videoService'
import {getUser,updateUser} from '../../services/userService'
function Video(){
     const idUser = localStorage.getItem("ID")
        
     const id = useParams().id
     const [idFilm,setIdFilm] = useState()
     const [url,setUrl] = useState()
     const [name,setName] = useState()
     const [category,setCategory] = useState()
     const [national,setNational] = useState()
     const [description,setDescription] = useState()
     const [filmName,setFilmName] = useState()
     const [allFilm,setAllFilm] = useState([])

     useEffect(() => {
          getAllVideos()
            .then((res) => {
              console.log('data all film ',res)
              const films = res.data.films
              films.filter((film)=>{
               if(film.filmEpisode === id){
                    console.log(film.filmEpisode)
                    return[
                         setIdFilm(film._id),
                         setUrl(film.url),
                         setName(film.name),
                         setCategory(film.category),
                         setNational(film.national),
                         setDescription(film.description),
                         setFilmName(film.filmName)
                    ]
               }
               return false;
               })
               console.log('phim sau khi get api ',films)
               const arrayFilm = films.filter((film)=>{
                    if(film.filmName === filmName){
                              return allFilm=>[...allFilm,film]
                    }
                    return false;
               })
               console.log('các tập cùng phim ',arrayFilm)
               setAllFilm(arrayFilm)
            })
            .catch((err) => console.log(err));
        }, [idFilm,id,filmName]);
        console.log(idFilm)
        

        //state of user
        const [nameUser,setNameUser] = useState()
        const [emailUser,setEmailUser] = useState()
        const [passUser,setPassUser] = useState()    
        const [favouriteUser,setFavouriteUser] = useState([])
        const [favourite,setFavourite] = useState()

     //thả tim  
     const handleFavorite = () => {
             setFavourite(true)
             console.log(favourite)
             if(favourite===true){
                  setFavourite(false)
             }
     }
     //get user
     useEffect(()=>{
          if(idUser){// đã đăng nhập 
               getUser(idUser)
               .then((res)=>{
               console.log('data user ban dau ',res)
               const user = res.data.user
               setNameUser(user.name)
               setEmailUser(user.email)
               setPassUser(user.password)
               setFavouriteUser(user.favourite)
               console.log('favoriteUser la ',favouriteUser)
               })
               if(favouriteUser.length===0){
                    setFavourite(false)
                    console.log(favourite)
               }else{
                    favouriteUser.some((e,i) => {
                         if(e===idFilm){
                              setFavourite(true)
                              console.log(e,idFilm,i,e===idFilm,favourite);
                              return true;
                         }else if(i+1===favouriteUser.length){
                              setFavourite(false)
                         }
                         return false
                    });
               }
               console.log('nhung phim da thich ',favouriteUser,favourite)
          }
     },[idFilm,favourite,id])
     
     console.log(favourite)
     // console.log([...favouriteUser,idFilm])
     
     //update user
     useEffect(()=>{
          if(idUser){ // đã đăng nhập 
               console.log('trang thai truoc khi update ',favourite)
               if(favourite===true){
                    if(favouriteUser.length===0){
                         favouriteUser.push(idFilm)
                    }else{
                         favouriteUser.some((e,i) => {
                              if(e===idFilm){
                                   return true;
                              }else if(i+1===favouriteUser.length){
                                   favouriteUser.push(idFilm)
                              }
                              return false
                         });
                    }
                    console.log('phim yeu thich truoc khi update ',favouriteUser)  
                    const values = {name:nameUser,email:emailUser,password:passUser,favourite:favouriteUser}
                    console.log('data truoc khi update ',idUser,values)
                    updateUser(idUser,values)
                         .then((res)=>{
                              console.log('data user sau khi update ',res)
                         })

               }
          }
     },[favourite])

     return(
          <Layout>
          <div className='video'>
               <div className='film'>
                    <iframe src={`https://player.vimeo.com/video/${url}?badge=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479`} 
                     frameborder="0" 
                     allow="autoplay; fullscreen; picture-in-picture" 
                     width="100%"
                     height="100%"
                     title="phim hay"
                    />
               </div>
               <div className='detailFilm'>
                    <div className='nameFavorite'>
                         <div className='filmName'>{name}</div>
                         <div onClick={handleFavorite} className='favorite'>
                              {favourite ? <FavoriteIcon sx={{ fontSize: 40 }} style={{"color":"#ff4332"}}/> : <FavoriteIcon sx={{ fontSize: 40 }} style={{"color":"white"}}/>}
                         </div>
                    </div>
                    <div className='filmCategory'>Thể loại: {category}</div>
                    <div className='filmNational'>Quốc gia: {national}</div>
                    <div className='filmDescription'>Mô tả: {description}</div>
               </div>
               <div className='episode'>
                    {allFilm.map((film,index)=>(
                         <a href={film.filmEpisode} style={film.filmEpisode===id ? {"pointerEvents":"none","backgroundColor":"#242424"}:{}} className='btnEpisode'>Tập {index+1}</a>
                    ))}
               </div>
               </div>
          </Layout>
     )     
}
export default Video