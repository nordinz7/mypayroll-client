import AppRouter from "@/pages/Router"
import { Theme, useTheme } from "@/stores/useTheme"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster";
import { apolloClientSingleton } from "@/utils/singletons/apolloClient";
import { ApolloProvider } from "@apollo/client";


const App = () => {
  const theme = useTheme(state => state.theme)
  const client = apolloClientSingleton.getInstance()


  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(Theme.light, Theme.dark)

    if (theme === Theme.system) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? Theme.dark
        : Theme.light

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <ApolloProvider client={client}>
      <AppRouter />
      <Toaster />
    </ApolloProvider>
  )
}

export default App
