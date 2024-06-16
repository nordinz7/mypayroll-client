import { useAuth } from "@/stores/useAuth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {jwtDecode} from 'jwt-decode'

const AuthLayout = () => {
  const user = useAuth((state) => state.user)
  const token  = useAuth((state) => state.token)
  const setUser = useAuth((state) => state.setUser)
  const setToken = useAuth((state) => state.setToken)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return navigate('/login')

      setToken(token)
      //@ts-ignore
      setUser(jwtDecode(token)?.user)
  }, [token])


  return <Outlet />
}

export default AuthLayout