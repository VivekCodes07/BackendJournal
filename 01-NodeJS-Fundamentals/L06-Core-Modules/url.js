/*
  The URL module is a built-in Node.js module
  used to work with URLs.

  Node.js provides the URL class which makes
  it easy to create and analyze URLs.
*/

import { URL } from "url";

/*
  We can create a URL object by passing
  a complete URL string to the URL constructor.
*/

const myUrl = new URL("https://example.com/products?category=shoes&page=2");

console.log(myUrl);

/*
  hostname gives us the domain name
  of the URL.
*/

console.log("Hostname:", myUrl.hostname);

/*
  pathname gives us the path part
  of the URL.
*/

console.log("Pathname:", myUrl.pathname);

/*
  protocol tells us which protocol
  is being used.
*/

console.log("Protocol:", myUrl.protocol);

/*
  searchParams allows us to work with
  query parameters.

  Example:

  ?category=shoes&page=2
*/

console.log("Category:", myUrl.searchParams.get("category"));

console.log("Page:", myUrl.searchParams.get("page"));

/*
  set() adds a new query parameter.

  If the parameter already exists,
  its value will be changed.
*/

myUrl.searchParams.set("sort", "price");

console.log(myUrl.href);

/*
  delete() removes a query parameter
  from the URL.
*/

myUrl.searchParams.delete("page");

console.log(myUrl.href);

/*
  toString() converts the URL object
  back into a normal string.
*/

console.log(myUrl.toString());
