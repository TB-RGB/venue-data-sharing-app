import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const Navbar = ()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(store=>store.user)


    const logout = ()=>{
        dispatch({type: 'LOGOUT' })
        dispatch({type: 'UNSET_VENUE'})
    }

    return(
        <>
        <h1 onClick={()=>history.push('/dashboard')}>Navbar</h1>
        {user.id && <button onClick={()=>logout()}>Log Out</button>}
        {' '}
        {user.id && <button onClick={()=>history.push('/account')}>Account</button>}
        </>
    )
}

export default Navbar