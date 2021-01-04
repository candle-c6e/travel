import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./context/auth-context";
import { getToken } from "./auth-provider";
import App from "./App";

const httpLink = createUploadLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          hotels: {
            keyArgs: [],
            merge(existing, incoming) {
              return {
                ...incoming,
              };
            },
          },
          hotelsUser: {
            keyArgs: [],
            merge(existing, incoming) {
              return {
                ...incoming,
              };
            },
          },
          reservedUsers: {
            keyArgs: [],
            merge(existing, incoming) {
              return {
                ...incoming,
              };
            },
          },
        },
      },
    },
  }),
  assumeImmutableResults: true,
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
