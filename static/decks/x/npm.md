<!-- .slide: data-state="exercise" -->
# File Server

`/path/to/filename.txt?u=xing&p=ponies`
1. If user/pass aren't correct, send "Access Denied"
2. If file can't be read/found, send "Not Found"
3. Send file contents

*Remember to set the appropriate HTTP status code!* <!-- .element: class="fragment" -->

 Extra Credit
1. Set port with environment variable
2. Remove requestHandler to its own file
