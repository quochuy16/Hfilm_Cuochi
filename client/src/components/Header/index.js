import './Header.css'
import { Link } from "react-router-dom"
import DarkLogo from './../../assets/images/Dark-Logo.png'
import { styled, alpha } from '@mui/material/styles';
import CIcon from '@coreui/icons-react';
import { cilHome, cilMovie, cilMap, cilPlaylistAdd, cilHeart } from "@coreui/icons";
import { useState, useEffect} from "react";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
function Header(){
  const [name,setName] = useState('')
  useEffect(()=>{
  if(localStorage.getItem('Token')){
      setName(localStorage.getItem('Name'))
    }else{
      localStorage.clear()
    }
  },[])
  // const { name, logout } = useContext(AuthContext);
  
    const [btn, setBtn] = useState('')
    var page = window.location.href.slice(22)
    const hanleBtnHome = () =>{
        setBtn('')
        document.documentElement.scrollTop = 0
    }
    const hanleBtnCate = () =>{
        setBtn('categories')
        document.documentElement.scrollTop = 0
    }
    const hanleBtnNation = () =>{
        setBtn('nation')
        document.documentElement.scrollTop = 0
    }
    const hanleBtnFavourite = () =>{
        setBtn('favourite')
        document.documentElement.scrollTop = 0
    }
    const hanleBtnSeries = () =>{
        setBtn('series')
        document.documentElement.scrollTop = 0
    }
    // const hanldeSignIn = () =>{
    //     setUser('')
    // }
    const handleLogout = () =>{
      localStorage.clear()
    }
    //for mobile
    const [menuFM,setMenuFM] = useState(false)
    const handleMenuFM = () =>{
      setMenuFM(!menuFM)
    }

    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý tìm kiếm với giá trị searchTerm
    console.log('Đang tìm kiếm:', searchTerm);
    navigate(`/allFilm?search=${searchTerm}`,)
    
  };
    return(
        <div className="header">
            <a href="/"><img onClick={hanleBtnHome} className="imgLogo" src={DarkLogo} alt="logo"/></a>
            <div className="menu">
                <Link to='/' onClick={hanleBtnHome} className={page === '' ? 'selected':'nosl'}><CIcon icon={cilHome} style={page === '' ?{'--ci-primary-color': '#30A0E0',width:'20px', margin: "0 5px 7px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 7px 0"}} />TRANG CHỦ</Link>
                <Link to='/categories' onClick={hanleBtnCate} className={page === 'categories' ? 'selected':'nosl'}><CIcon icon={cilMovie} style={page === 'categories' ?{'--ci-primary-color': '#EE8980',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />THỂ LOẠI</Link>
                <Link to="/nation" onClick={hanleBtnNation} className={page === 'nation' ? 'selected':'nosl'}><CIcon icon={cilMap} style={page === 'nation' ?{'--ci-primary-color': '#62C4C3',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />QUỐC GIA</Link>
                <Link to="/favourite" onClick={hanleBtnFavourite} className={page === 'favourite' ? 'selected':'nosl'}><CIcon icon={cilHeart} style={page === 'favourite' ?{'--ci-primary-color': '#F14666',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />YÊU THÍCH</Link>
                <Link to="/allFilm" onClick={hanleBtnSeries} className={page === 'allFilm' || 'allFilm?search=' ? 'selected':'nosl'}><CIcon icon={cilPlaylistAdd} style={page === 'allFilm' || 'allFilm?search=' ?{'--ci-primary-color': '#FFC872',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />PHIM</Link>
                <form className='form'  onSubmit={handleSubmit}>
                  <Search>
                      <SearchIconWrapper>
                      <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchTerm}
                      onChange={handleSearch}
                      />
                  </Search>
                </form>
                {name ? 
                  <div className="button">
                    <a href='/'>{name}</a>
                    <a href='/sign-in' onClick={handleLogout}>Đăng xuất</a>
                  </div>
                  :
                  <div className="button">
                    <a href='/sign-up'>Đăng Ký</a>
                    <a href='/sign-in'>Đăng Nhập</a>
                      
                  </div>
                }
            </div>
            <div className='menuRep'>
                <button onClick={handleMenuFM} className="icon">☰</button>
            </div>
            {menuFM && <div className="menuForMobile">
                <Link to='/' onClick={hanleBtnHome} className={page === '' ? 'selected':'nosl'}><CIcon icon={cilHome} style={page === '' ?{'--ci-primary-color': '#30A0E0',width:'20px', margin: "0 5px 7px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 7px 0"}} />TRANG CHỦ</Link>
                <Link to='/categories' onClick={hanleBtnCate} className={page === 'categories' ? 'selected':'nosl'}><CIcon icon={cilMovie} style={page === 'categories' ?{'--ci-primary-color': '#EE8980',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />THỂ LOẠI</Link>
                <Link to="/nation" onClick={hanleBtnNation} className={page === 'nation' ? 'selected':'nosl'}><CIcon icon={cilMap} style={page === 'nation' ?{'--ci-primary-color': '#62C4C3',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />QUỐC GIA</Link>
                <Link to="/favourite" onClick={hanleBtnFavourite} className={page === 'favourite' ? 'selected':'nosl'}><CIcon icon={cilHeart} style={page === 'favourite' ?{'--ci-primary-color': '#F14666',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />YÊU THÍCH</Link>
                <Link to="/allFilm" onClick={hanleBtnSeries} className={page === 'allFilm' ? 'selected':'nosl'}><CIcon icon={cilPlaylistAdd} style={page === 'series' ?{'--ci-primary-color': '#FFC872',width:'20px', margin: "0 5px 5px 0"}:{'--ci-primary-color': 'white',width:'20px', margin: "0 5px 5px 0"}} />PHIM</Link>
                
                  {name ? <a href='/'>{name}</a> : <a href='/sign-up'>Đăng Ký</a>}
                  {name ? <a href='/sign-in'>Đăng Xuất</a> : <a href='/sign-in'>Đăng Nhập</a>}  
                    
            </div>
            }
            
        </div>
    )
}
export default Header