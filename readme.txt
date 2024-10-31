=== seekXL Snapr ===
Contributors: TimZ
Donate link: http://www.kiva.org/invitedby/tim5156
Tags: formatting, screenshot, post, thumbnails, seekXL
Requires at least: 2.8
Tested up to: 3.3.2
Stable tag: 2.0.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This plugin attaches a tooltip with a screenshot of the linktarget to every external link.

== Description ==

This plugin attaches a tooltip with a screenshot of the linktarget to every external link.

The screeshot service is provided by [seekXL Snapr](http://snapr.seekxl.de/ "seekXL Snapr").
This service is located in Germany but can be used worldwide.

The plugin languages are at the moment english, german and italian. The plugin can be easily translated into other languages.


== Installation ==

Download the plugin and extract the contents of the archive to the 'wp-content/plugins' directory.

After activating the plugin through the 'Plugins' menu, you will have a new menu entry 'seekXL Snapr' in your 'settings' menu.
Here you can change the plugin settings.


== Frequently Asked Questions ==

= How can I attach tooltips manually? =

Activate the plugin and change the setting of 'Show screenshots for all external links?' to 'No'

When you write a new post, change to the source view and to your link code e.g. `size="M"`.

Example:

`bla bla bla <a href="http://www.zyblog.de">External link to Zyblog</a> bla bla bla`

is changed to

`bla bla bla <a href="http://www.zyblog.de" size="M">External link to Zyblog</a> bla bla bla`

Allowed values to mark your links are 'T', 'S', 'M', 'L'

A size attribute added by hand will override the thumbnail size settings done on the plugin settings page.


= What about this Logo Key? =

Most of the screenshotservices show default pictures, when the screenshots must be generated or could not be generated.

For this plugin the service of [seekXL Snapr](http://snapr.seekxl.de/ "seekXL Snapr") allows you to use your own picture as a replacement for the default picture.
That way is is possible to integrate the tooltips into your own design.


== Miscellaneous ==

The Javascript Code to display the tooltips is based on the original source of bubble.js provided by the seekxl snapr service.
A few enhancments and changes were made to support all plugin functions.

Italian translation by Gianni Diurno (gidibao.net)


== Screenshots ==

1. Tooltip size T (100x75)
2. Tooltip size S (200x150)
3. Tooltip size M (400x300)


== Changelog ==

= 2.0.6 =
* More efficient JS generation
* ongoing code cleanup

= 2.0.5 =
* readme.txt updated
* fixed warnings in JS files
* changed directory names
* fixed deprecated function calls

= 2.0.4 = 
* Tested with WP 2.8.4; reduced CSS file; updated admin options to up to date layout style

= 2.0.3 =
* Bugfix for IE7 issues, when IE7 not running in quirks mode

= 2.0.2 =
* translated to italian by Gianni Diurno

= 2.0.1 =
* small bugfix. The javascript created unnecessary links to the stylesheet.

= 2.0 =
* plugin is upgraded to the new version of the SeekXL snapr tool
* the tooltipbox is now variable, as it will show up on free space in the browser window
* successfully tested with Wordpress 2.6
* changed the manual markup of seekxl-snapr links the the original method of seekxl snapr (class="seekxlsnaprM" is now size=M")

= 1.1 =
* Internationalization: Plugin is now in english, but a german translation is included. The plugin can now be translated easily using poedit.
* Using a shrunk version of the bubble.js which saves about 900 bytes
* Successfully tested with Wordpress 2.3
* Bugfix in bubble.js

= 1.0 =
* Initial release


== Upgrade Notice ==

= 2.0.6 =
Maintenance release. No functional changes.

= 2.0.5 =
Removed deprecated function calls. Now at least WP 2.8 is required!


