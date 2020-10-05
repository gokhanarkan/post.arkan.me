# post.arkan.me

Tiny Express API for people who want to contact me in a non-conventional way.

[Test this API with a live demo.](/example)

# Examples

---

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

---

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

---

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

---

## go (http)

```
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"bytes"
)

func main() {
	// postEmail (POST https://post.arkan.me/)

	json := []byte(`{"email": ">{your email}<","message": ">{your message}<","phone": ">{your phone (optional)}<"}`)
	body := bytes.NewBuffer(json)

	// Create client
	client := &http.Client{}

	// Create request
	req, err := http.NewRequest("POST", "https://post.arkan.me/", body)

	// Headers
	req.Header.Add("Content-Type", "application/json; charset=utf-8")

	// Fetch Request
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Failure : ", err)
	}

	// Read Response Body
	respBody, _ := ioutil.ReadAll(resp.Body)

	// Display Results
	fmt.Println("response Status : ", resp.Status)
	fmt.Println("response Headers : ", resp.Header)
	fmt.Println("response Body : ", string(respBody))
}

```

---
