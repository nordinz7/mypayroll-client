import { InMemoryCache, ApolloClient } from '@apollo/client'
import { useAuth } from '@/stores/useAuth'

export const apolloClientSingleton = (function () {
  let instance: ApolloClient<any> | null = null
  return {
    getInstance: (): ApolloClient<any> => {
      if (instance != null) {
        return instance
      }

      const token = useAuth(state => state.token)

      const client = new ApolloClient({
        uri: 'http://localhost:8000/graphql',
        cache: new InMemoryCache({ addTypename: false }),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'cache-and-network',
          },
        },
        headers: {
          authorization: `jwt ${token}`,
        }
      });

      instance = client

      return instance
    }
  }
})()
