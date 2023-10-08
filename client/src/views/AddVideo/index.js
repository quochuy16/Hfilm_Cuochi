import './addVideo.css'
import { Button, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Layout from '../../components/Layout';
function AddVideo(){
    let navigate = useNavigate();

    const [name,setName] = useState()
    const [url,setUrl] = useState()
    const [category,setCategory] = useState()
    const [national,setNational] = useState()
    const [numEpisode,setNumEpisode] = useState()

     // const selectedFile = url;
     // const videoUrl = window.URL.createObjectURL(selectedFile);
    console.log(url)
    const hanldeUpVideo = async (e) => {
        e.preventDefault();
    
        try {
          const values ={ name,url,category,national, numEpisode}
          await fetch('http://localhost:3001/video', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
          .then((res)=>res.json())
          .then((data)=>{
            console.log(data)
              navigate('/')
          })
          .catch((err)=>{
            console.log(err.message);
          })
          ;
        } catch (err) {
          console.error('Register error:', err);
        }
    };
    return(
        <Layout>
        <div className="addVideo">
            <form className='form'  onSubmit={hanldeUpVideo}>
                <center>
                <h1>Đăng Ký</h1>
                <h5>Đăng ký tài khoản mới để trở thành một phần của HFilm</h5>
                </center>
                <input type='text' placeholder='Nhập tên' onChange={e=>setName(e.target.value)}/>
                <input type='file' placeholder='Chọn file' onChange={e=>setUrl(e.target.value)}/>
                <input type='text' placeholder='Nhập thể loại'  onChange={e=>setCategory(e.target.value)}/>
                <input type='text' placeholder='Nhập quốc gia'  onChange={e=>setNational(e.target.value)}/>
                <input type='text' placeholder='Nhập số tập'  onChange={e=>setNumEpisode(e.target.value)}/>
                
                <center>
                <Button type='submit' variant="contained" color="success">
                    Upload
                </Button>
                </center>
            </form>
        </div>
        </Layout>
    )
}
export default AddVideo