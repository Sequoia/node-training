<!-- .slide: data-state="exercise" -->

Update our users server...
1. `GET /user/1` returns...
  1. Not "AJAX" request: `User 1: Zeynep`
  2. "AJAX" request: { name: 'Zeynep'}
2. If user not found, send appropriate **HTTP Code** and **message**
3. Set `X-Server-Time` header for all requests

Hints:
* "AJAX" requests have `X-Requested-With: XMLHTTP` header
* `request` object has a property that identifies this ^
^
TODO : create solution for this
