import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Navbar = ()=>{
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = ()=>{
        dispatch({type: 'LOGOUT' })
        dispatch({type: 'UNSET_VENUE'})
    }

    return(
        <>
        <h1 onClick={()=>history.push('/dashboard')}>Navbar</h1>
        <button onClick={()=>logout()}>Log Out</button>
        {' '}
        <button onClick={()=>history.push('/account')}>Account</button>
        </>
    )
}

export default Navbar