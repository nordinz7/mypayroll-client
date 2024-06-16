import AppRouter from "@/pages/AppRouter"
import { Theme, useTheme } from "@/stores/useTheme"
import { useEffect } from "react"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Toaster } from "@/components/ui/toaster";


const App = () =>{
  const theme = useTheme(state => state.theme)
  const client = new ApolloClient({
    uri:'http://localhost:8000/graphql',
    cache: new InMemoryCache({addTypename: false}),
  });

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
      <AppRouter/>
      <Toaster />
    </ApolloProvider>
  )
}

export default App
