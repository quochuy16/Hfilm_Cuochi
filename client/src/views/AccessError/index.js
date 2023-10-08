import { useEffect, useState } from 'react'
import './AccessError.css'
function AccessError(){
    const [token,setToken] = useState()
    useEffect(()=>{
        setToken(localStorage.getItem('Token'))
    },[token])
    console.log(token)
    return(
     <div className="accessError">
          <h1 style={{marginTop:'30vh',fontSize:'10rem'}}>401</h1>
          <h1>Bạn cần phải đăng nhập!!!</h1>
     </div>
    )
}
export default AccessError