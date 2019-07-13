---
date: 2019-07-12 13:00:00
title: "Basic pages from APIs in Eleventy"
featured_image: https://images.weserv.nl?url=imgur.com/download/zmQVZx4&&a=entropy
author: danfascia
tags:
  - recipe
  - eleventy
  - API
---

Eleventy (11ty) is a node.js based static site generator framework which makes the consumption and publishing of data from APIs really easy. But a lot of folks seem to find the topic challenging, so here's a beginner's guide.
<!--more-->

One of the killer features of [Eleventy](https://11ty.io) by Zach Leatherman is the ability to fetch data from an API at build time, mutate it with familiar javascript functions, then mount it just like any other collection. This opens up a whole world of possibilities and allows data from APIs to be treated just like static markdown files when templating pages.

## Javascript data files

Consuming API data can be carried out in a number of ways with 11ty but by far the simplest is to [create a collection from a javascript data file](https://www.11ty.io/docs/data-js/) stored in the `_data` folder.

First of all you'll need to use one of the javascript HTTP request libraries to call your API URL. I like [Axios](https://github.com/axios/axios) because it conveniently mounts the returned JSON data array for you rather than needing to JSON parse. [Fetch](https://github.github.io/fetch/) is also a popular choice.

```bash
npm install --save axios
```

## Setting up your javascript data source

In the `_data` folder create a new javascript file with the same intended name as your collection. In this example we will call dummy user data from [jsonplaceholder](https://jsonplaceholder.typicode.com)

```js 
// _data/users.js

// _data/users.js

const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/users'

module.exports = async fetcher => {
	
	let apiData = await axios.get(url).then(
		
		console.log("Grabbed some data...")
    ).catch( err => {
      console.log("An error occurred with the API call:: " + err)
      return err
    } )
    
    return apiData.data
}
```

Each time that the site rebuilds, this will fire off an asynchronous call to the JSON API and return the results in a collection called, quite simply `users`. From there you can loop over users and the data within with ease in your chosen 11ty template language.

I'm using Nunjucks which is one of the default template languages in 11ty.

## Looping over the returned collection

It's always worth dumping at least a single record from the API to begin with, especially if it is not one which you have designed the schema for yourself. You will need to know the `key` names in the `key:value` pairs to be able to output record data.

### JSON Data from API

```json
 
 // A single record from the API
 
 {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  ```


### Nunjucks Data
{% raw %}
```html
	<ol>
	{% for user in users %}
		<li>
		    <span>{{user.username}}</span>
		    <span>{{user.name}}</span>
		    <span>{{user.email}}</span>
		</li>
	{% endfor %}
	</ol>
```
{% endraw %}

## End result

![Screenshot of data from JSON API in 11ty ](https://images.weserv.nl?url=imgur.com/download/zmQVZx4)

By adding a little bit of styling to the loop (I used TailwindCSS) you can pretty quickly end up with attractive output from the returned result set. It's easy to see how you can make a useful application with even this simple setup.

Here are a few ideas how you could make use of this setup.

* Use the Airtable API for a simple CMS or to take front end user submissions with Airtable Forms
* Use Google Sheets to transform and publish data to a static site
* Publish your latest Tweets on your blog

## Next time...

In this tutorial, we have learned how to make basic queries against an and API and publish the results in a single page. In the next installment, we will take a look at how that data can be paginated to create single page entries from each individual data item.