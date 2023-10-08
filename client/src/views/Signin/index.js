import './Signin.css'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from '../../components/Layout';
import { ToastContainer, toast } from "react-toastify";
function Signin(){
    let navigate = useNavigate();

    useEffect(() => {
        const name = localStorage.getItem("Name");
        if (name) {
          localStorage.clear();
        }
      }, []);

    const [email,setEmail] = useState()    
    const [password,setPass] = useState()
    
    const hanldeSingIn = async (e) => {
        e.preventDefault();
    
        try {
          const values ={ email,password }
          const response = await axios.post('http://localhost:3001/user/sign-in',values)
            console.log(response)
              localStorage.setItem("ID",response.data.user._id);
              localStorage.setItem("Name",response.data.user.name);
              localStorage.setItem("Token", response.data.token);
              navigate('/')
          .catch((err)=>{
            console.log(err.message);
          })
          ;
        } catch (err) {
          console.error('Login error:', err);
        }
      };
    return(
      <Layout>
        <div className="signin">
          <form className='form' onSubmit={hanldeSingIn}>
            <center>
            <h1>Đăng Nhập</h1>
            <h5>Đăng nhập để sử dụng HFilm</h5>
            </center>
            <input type='text' placeholder='Nhập email hoặc số điện thoại' onChange={e=>setEmail(e.target.value) } value={email}/>
            {email==='' && <div className='warning'>Nhập email hoặc số điện thoại</div>}
            <a href='/forgotPassword' className='forgotPass' >Quên mật khẩu?</a>
            <input type='password' value={password} placeholder='Nhập mật khẩu'  onChange={e=>setPass(e.target.value)}  />
            {password==='' && <div className='warning'>Nhập mật khẩu</div>}
            <center>
            <Button type='submit' variant="contained">
                Đăng Nhập
            </Button>
            </center>
          </form>
        </div>
      </Layout>
    )
}
export default Signin