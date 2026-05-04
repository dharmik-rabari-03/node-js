🔵 1xx – Informational (Server ne request receive kar li)

👉 Matlab: “Request aa gayi, process ho rahi hai”

100 Continue → Aage request bhejo (OK to proceed)
101 Switching Protocols → Protocol change ho raha (HTTP → WebSocket)
102 Processing → Server abhi process kar raha hai (slow request)
🟢 2xx – Success (Sab sahi chal raha hai)

👉 Matlab: “Request successful”

200 OK → Sab perfect 👍
201 Created → Naya data create ho gaya
202 Accepted → Request accept hui (process baad me hoga)
203 Non-Authoritative Info → Modified response (proxy se)
204 No Content → Success but kuch return nahi
205 Reset Content → Client ko reset karna hai (form clear)
206 Partial Content → Thoda data bheja (range request)
207 Multi-Status → Multiple responses (WebDAV)
🟡 3xx – Redirection (Dusri jagah jao)

👉 Matlab: “Resource yaha nahi, udhar dekho”

300 Multiple Choices → Multiple options available
301 Moved Permanently → Permanent shift (SEO important)
302 Moved Temporarily → Temporary redirect
303 See Other → Dusre URL se fetch karo
304 Not Modified → Cache use karo
305 Use Proxy → Proxy use karna padega
307 Temporary Redirect → Same method ke sath redirect
🔴 4xx – Client Error (User ki galti)

👉 Matlab: “Tumhari request galat hai”

400 Bad Request → Galat request format
401 Unauthorized → Login nahi kiya
402 Payment Required → Payment pending (rare use)
403 Forbidden → Access allowed nahi
404 Not Found → Page nahi mila 😢
405 Method Not Allowed → Wrong method (GET vs POST)
406 Not Acceptable → Response format match nahi
407 Proxy Auth Required → Proxy login needed
408 Request Timeout → Request slow thi
409 Conflict → Data conflict (duplicate etc.)
410 Gone → Resource permanently delete ho gaya
411 Length Required → Content length missing
412 Precondition Failed → Condition fail ho gayi
413 Payload Too Large → File size bahut bada
414 URI Too Long → URL bahut lamba
415 Unsupported Media Type → Wrong file format
416 Range Not Satisfiable → Invalid range request
417 Expectation Failed → Expectation header fail
418 I'm a teapot 😂 → Joke status code
422 Unprocessable Entity → Data valid nahi
423 Locked → Resource locked hai
424 Failed Dependency → Previous request fail
425 Unordered Collection → Rare (WebDAV)
426 Upgrade Required → Protocol upgrade karo
428 Precondition Required → Condition zaroori hai
429 Too Many Requests → Rate limit exceed 🚫
431 Headers Too Large → Headers heavy hai
⚫ 5xx – Server Error (Server ki galti)

👉 Matlab: “Server me problem hai”

500 Internal Server Error → Generic error 😵
501 Not Implemented → Feature bana hi nahi
502 Bad Gateway → Dusra server galat response de raha
503 Service Unavailable → Server down 🚫
504 Gateway Timeout → Dusra server response nahi de raha
505 HTTP Version Not Supported → Version supported nahi
506 Variant Also Negotiates → Server config issue
507 Insufficient Storage → Space nahi hai
509 Bandwidth Limit Exceeded → Limit cross ho gayi
510 Not Extended → Further extensions needed
511 Network Auth Required → Network login required
