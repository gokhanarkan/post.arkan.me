# post.arkan.me

Tiny Express API for people who want to contact me in a non-conventional way. 

# Examples

## curl

```
curl -X "POST" "https://post.arkan.me" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "email": ">{your email}<",
  "message": ">{your message}<",
  "phone": ">{your phone (optional)}<"
}'
```

## axios

```
axios({
	"method": "POST",
	"url": "https://post.arkan.me",
	"headers": {
		"Content-Type": "application/json; charset=utf-8"
	},
	"data": {
		"email": ">{your email}<",
		"message": ">{your message}<",
		"phone": ">{your phone (optional)}<"
	}
})
```

## python (requests)

```
# Install the Python Requests library:
# `pip install requests`

import requests
from json import dumps

try:
    response = requests.post(
        url="https://post.arkan.me",
        headers={
            "Content-Type": "application/json; charset=utf-8",
        },
        data=dumps({
            "email": ">{your email}<",
            "message": ">{your message}<",
            "phone": ">{your phone (optional)}<"
        })
    )
    print(f'Response HTTP Status Code: {response.status_code}')
    print(f'Response HTTP Response Body: {response.content}')
except requests.exceptions.RequestException:
    print('HTTP Request failed')

```


