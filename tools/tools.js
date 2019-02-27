import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost"

export const queryClient = new ApolloClient({
        link: new HttpLink({uri: "http://localhost:5000/graphql"}),
        cache: new InMemoryCache(),
      });