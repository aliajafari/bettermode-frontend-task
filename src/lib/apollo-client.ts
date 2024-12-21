import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apiUrl = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const httpLink = new HttpLink({
  uri: apiUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
