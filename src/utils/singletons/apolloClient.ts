import { InMemoryCache, ApolloClient } from '@apollo/client'

export const apolloClientSingleton = (function () {
  let instance: ApolloClient<any> | null = null
  return {
    getInstance: (token: string): ApolloClient<any> => {
      if (instance != null) {
        return instance
      }


      const client = new ApolloClient({
        uri: 'http://localhost:8000/graphql',
        cache: new InMemoryCache({ addTypename: false }),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'cache-and-network',
          },
        },
        credentials: 'include',
        headers: {
          authorization: `jwt ${token}`,
        },
      });

      instance = client

      return instance
    }
  }
})()
