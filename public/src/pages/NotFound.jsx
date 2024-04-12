import { Link } from "react-router-dom"
export default function NotFound(){
    return(
        <div>
            PAGE NOTFOUND <br />    
            <button><Link to={'/'} >Home</Link></button>
            <button> <a href="/">HOME</a></button>
        </div>
    )
}