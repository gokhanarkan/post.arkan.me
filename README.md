# post.arkan.me

Tiny Express API for people who want to contact me in a non-conventional way.

📖 [Related blog post](https://arkan.me/tiny-contact-api/)

# Examples

---

## &rarr; curl

```curl
curl -X "POST" "https://post.arkan.me" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "name": ">{your name}(optional)<",
  "email": ">{your email}<",
  "message": ">{your message}<",
  "phone": ">{your phone}(optional)<"
}'
```

---

## &rarr; axios

```javascript
axios({
  method: "POST",
  url: "https://post.arkan.me",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  data: {
    name: ">{your name}(optional)<",
    email: ">{your email}<",
    message: ">{your message}<",
    phone: ">{your phone}(optional)<",
  },
});
```

---

## &rarr; python (requests)

```python
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
            "name": ">{your name}(optional)<",
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

## &rarr; go (http)

```go
package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"bytes"
)

func main() {
	// postEmail (POST https://post.arkan.me/)

	json := []byte(`{"name": ">{your name}(optional)<","email": ">{your email}<","message": ">{your message}<","phone": ">{your phone}(optional)<"}`)
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
