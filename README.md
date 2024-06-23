# GraphQL course by NetNinja

[github repo for course](https://www.github.com/iamshaunjp/graphql-crash-course)

## RestAPI

- Over Fetching
  - getting more data than needed

ex: mysite.com/api/courses

```
{
  "id": "1",
  "title": "Thud",
  "author": {...},
  "description": "...",
  "price": "10.99",
  "thumbnail_url": "...",
  "video_url": "...",
}
```

- Under Fetching
  - receiving less data than expected
  - having to make multiple requests to the same endpoint

ex: mysite.com/api/courses/1 then mysite.com/api/author/1

### **GraphQL** uses one query for specific data from a single endpoint

- Fetch nested related data within a single query

mygraphqlsite.com/gql

```
Query {
  courses {
    id,
    title,
    thumbnail_url
  }
}
```

Multi nested request

```
Query {
  courses(id: "1") {
    id,
    title,
    thumbnail_url,
    author {
      name,
      id,
      courses {
        id,
        title,
        thumbnail_url
      }
    }
  }
}
```

## Apollo Server

[link to docs](https://www.apollographql.com/docs/apollo-server/getting-started)

## Apollo Explorer

similar to Postman for RestAPIs, but for GraphQL


