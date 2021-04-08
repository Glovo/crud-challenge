## Headers

All requests to the API should include a custom `interview-id` header. The value can be any unique string (like your favorite tv show or travel location) that stays the same for the duration of the interview.

## Return all glovers

```
GET: https://crud-challenge.herokuapp.com/glovers
```

response: 

```json
{
   "237128737": {
        "name": "Joe Bloggs",
        "id": 237128737
    },
   "230000000": {
        "name": "David Zuckerberg",
        "id": 230000000
    }
}
```

## Add a glover

```
POST: https://crud-challenge.herokuapp.com/glovers
```

body:

```json
{ "name": "GloverName" }
```

Note: you might get a 500 with short names, also you need the `Content-Type: application/json` header.

If ok, returns:

```json
{ "status": “ok” }
```

## Remove a glover

```
DELETE: https://crud-challenge.herokuapp.com/glovers/:id 
```