import Header from "../Header"
import Footer from "../Footer"
function Layout({children}){
     return(
          <div className="App">
               <Header/>
                    <div >{children}</div>
               <Footer/>
          </div>
     )
}
export default Layout;