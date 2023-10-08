import './Footer.css'
import DarkLogo from './../../assets/images/Dark-Logo.png'
import LogoFace from './../../assets/images/LogoFace.png'
import LogoIG from './../../assets/images/LogoIG.png'


function Footer(){

    return(
        <div className="footer">
            <div className='logo'>
                <center><a href='/'><img className="imgLogo" src={DarkLogo} alt="logo"/></a></center>
            </div>
            <div className="menu">
                <a href='/'><button>TRANG CHỦ</button></a>
                <a href='/categories'><button>THỂ LOẠI</button></a>
                <a href="/nation"><button>QUỐC GIA</button></a>
                <a href="/favourite"><button>YÊU THÍCH</button></a>
                <a href="/allFilm"><button>PHIM BỘ</button></a>
            </div>  
            <div className='contact1'>
                <a href='https://www.facebook.com/NQHNTD/' target="_blank" rel="noreferrer"><img src={LogoFace} alt='logoface'/>Nguyễn Quốc Huy</a>
                <a href='https://www.instagram.com/cuochi175/' target="_blank" rel="noreferrer"><img src={LogoIG} alt='logoface'/>Nguyễn Quốc Huy</a>
            </div>
            <div className='contact2'>
                Email: nguyenquochuy0987@gmail.com<br/>Phone: 0963583795
            </div>
        </div>
    )
}
export default Footer
