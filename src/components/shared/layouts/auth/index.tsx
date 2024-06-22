import { useAuth } from "@/stores/useAuth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { User } from "@/types/types"
import { useToast } from "@/components/ui/use-toast"

const AuthLayout = () => {
  const token = useAuth((state) => state.token)
  const setUser = useAuth((state) => state.setUser)
  const setToken = useAuth((state) => state.setToken)
  const navigate = useNavigate()
  const { toast } = useToast()


  const isTokenExpired = (exp: number) => {
    return Date.now() >= exp * 1000
  }

  const verifySetTokenSetUser = (token?: string | null) => {
    if (!token) {
      return navigate('/login')
    }

    const decodedToken = jwtDecode<{ user: User } & JwtPayload>(token)

    if (isTokenExpired(decodedToken.exp || 0)) {
      toast({
        title: "Session Expired",
        description: "Logging you out. Please login again.",
        duration: 2000
      })

      return setTimeout(() => {
        setToken(null)
        setUser(null)
        navigate('/login')
      }, 1000)
    }

    setToken(token)
    setUser(decodedToken.user)
  }

  useEffect(() => {
    verifySetTokenSetUser(token)
  }, [token])


  return <Outlet />
}

export default AuthLayout