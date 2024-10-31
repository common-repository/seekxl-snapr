<?php
/*
Plugin Name: seekXL Snapr
Plugin URI: http://www.zyblog.de/wordpress-plugins/seekxl-snapr/
Description: Versieht externen Links mit einen Screenshot-Thumbnail von SeekXL Snapr.
Version: 2.0.6
Author: Tim Zylinski
Author URI: http://www.zyblog.de

Copyright 2009 Tim Zylinski  (email : websitecontact [a t ] zylinski DOT de)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/



if (!class_exists("SeekXLSnapr")) {
	class SeekXLSnapr {
		var $adminOptionsName = "SeekXLSnaprAdminOptions";

		function SeekXLSnapr() {
		}

		function init() {
			$this->getAdminOptions();
		}

		function getAdminOptions() {
			$seekXLSnaprAdminOptions = array('show_all' => 'true',
				'thumbnail_size' => 'M',
				'use_logo_key' => 'false',
				'logo_key' => '');

			$devOptions = get_option($this->adminOptionsName);

			if (!empty($devOptions)) {
				foreach ($devOptions as $key => $option)
					$seekXLSnaprAdminOptions[$key] = $option;
			}

			update_option($this->adminOptionsName, $seekXLSnaprAdminOptions);

			return $seekXLSnaprAdminOptions;
		}

		function addHeaderCode() {
			$devOptions = get_option($this->adminOptionsName);
			
			// CSS
			echo '<link type="text/css" rel="stylesheet" href="' .plugins_url( 'css/bubble.css' , __FILE__ ).'" />' . "\n";
			// JS
			echo "<script type='text/javascript'>\n";
			if($devOptions['use_logo_key'] == "true") {
				echo "var seekXLLogoKey = \"". $devOptions['logo_key'] . "\";\n";
			}
			if ($devOptions['show_all'] == 'true') {
				echo "var seekXLThumbnailSize = \"". $devOptions['thumbnail_size'] . "\";\n";
				echo "var seekXLShowAll = \"". $devOptions['show_all'] . "\";\n";
			} else {
				echo "var seekXLShowAll = \"". $devOptions['show_all'] . "\";\n";

			}
			echo "</script>\n";
			
			wp_enqueue_script('seekxl_snapr', plugins_url( 'js/bubble-min.js' , __FILE__ ));
		}

		function insertSeekXLSnaprClass($content = '') {
				$devOptions = get_option($this->adminOptionsName);
				$thumbnail_size = $devOptions['thumbnail_size'];

				if ($devOptions['show_all'] == 'true'){
					if (function_exists('str_ireplace')) {
						$content = str_ireplace('href="http://','class="seekxlsnapr'.$thumbnail_size.'" href="http://',$content);
						$content = str_ireplace('class="seekxlsnapr'.$thumbnail_size.'" href="' . get_settings("siteurl"),'href="' . get_settings("siteurl"),$content);
					} else {
						$content = str_replace('href="http://','class="seekxlsnapr'.$thumbnail_size.'" href="http://',$content);
						$content = str_replace('class="seekxlsnapr'.$thumbnail_size.'" href="' . get_settings("siteurl"),'href="' . get_settings("siteurl"),$content);
					}
				}
				return $content;
		}

		function printAdminPage() {
			$devOptions = $this->getAdminOptions();
			$updated = false;

			if (isset($_POST['update_seekXLSnaprSettings'])) {
				if (isset($_POST['seekXLSnaprShowAll'])) {
					$devOptions['show_all'] = $_POST['seekXLSnaprShowAll'];
				}
				if (isset($_POST['seekXLSnaprUseLogo'])) {
					$devOptions['use_logo_key'] = $_POST['seekXLSnaprUseLogo'];
				}
				if (isset($_POST['seekXLSnaprThumbnailSize'])) {
					$devOptions['thumbnail_size'] = $_POST['seekXLSnaprThumbnailSize'];
				}
				if (isset($_POST['seekXLSnaprLogoKey'])) {
					$devOptions['logo_key'] = $_POST['seekXLSnaprLogoKey'];
				}

				update_option($this->adminOptionsName, $devOptions);
				$updated = true;
			}  ?>

<div class=wrap>
<form method="post" action="<?php echo $_SERVER["REQUEST_URI"]; ?>">

<h2><?php _e("seekXL Snapr Settings","SeekXLSnapr"); ?></h2>

<?php if($updated) {?>
	<div class="updated"><p><strong><?php _e("Settings Updated.", "SeekXLSnapr");?></strong></p></div>
<?php } ?>

    <h3>Allgemeine Einstellungen</h3>
  	<table class="form-table">
 	<tr>
		<th scope="row" valign="top"><?php _e("Show screenshots for all external links?","SeekXLSnapr"); ?></th>
		<td>
			<p>
			<label for="seekXLSnaprShowAll_yes"><input type="radio" id="seekXLSnaprShowAll_yes" name="seekXLSnaprShowAll" value="true" <?php if ($devOptions['show_all'] == "true") { echo 'checked="checked"'; }?> /> <?php _e("Yes","SeekXLSnapr"); ?></label>
			<label for="seekXLSnaprShowAll_no"><input type="radio" id="seekXLSnaprShowAll_no" name="seekXLSnaprShowAll" value="false" <?php if ($devOptions['show_all'] == "false") { echo 'checked="checked"'; }?>/> <?php _e("No","SeekXLSnapr"); ?></label>
			</p>
			<span class="description"><?php _e("\"Yes\" activates the screenshots for all external links. \"No\" keeps the plugin active, but the screenshot tooltips will be shown only when the links are tagged manually. How this is done, you can learn in <i>readme.txt</i>","SeekXLSnapr"); ?></span>
		</td>
	</tr>
	
 	<tr>
		<th scope="row" valign="top"><label for="seekXLSnaprShowAll_yes"><?php _e("Thumbnail size","SeekXLSnapr"); ?></label></th>
		<td>
			<p>
			<select name="seekXLSnaprThumbnailSize" id="seekXLSnaprThumbnailSize">
			<option <?php if($devOptions['thumbnail_size'] == "T") { echo 'selected'; } ?> value="T"><?php _e("tiny 100x75","SeekXLSnapr"); ?></option>
			<option <?php if($devOptions['thumbnail_size'] == "S") { echo 'selected'; } ?> value="S"><?php _e("small 200x150","SeekXLSnapr"); ?></option>
			<option <?php if($devOptions['thumbnail_size'] == "M") { echo 'selected'; } ?> value="M"><?php _e("medium 400x300","SeekXLSnapr"); ?></option>
			<option <?php if($devOptions['thumbnail_size'] == "L") { echo 'selected'; } ?> value="L"><?php _e("large 640x480","SeekXLSnapr"); ?></option>
			</select>
			</p>
			<span class="description"><?php _e("Choose the size of the screenshot thumbnails.","SeekXLSnapr"); ?></span>
		</td>
	</tr>	
	
 	<tr>
		<th scope="row" valign="top"><?php _e("Use own logo?","SeekXLSnapr"); ?></th>
		<td>
			<p>
			<label for="seekXLSnaprUseLogo_yes"><input type="radio" id="seekXLSnaprUseLogo_yes" name="seekXLSnaprUseLogo" value="true" <?php if ($devOptions['use_logo_key'] == "true") { echo 'checked="checked"'; }?> /> <?php _e("Yes","SeekXLSnapr"); ?></label>
			<label for="seekXLSnaprUseLogo_no"><input type="radio" id="seekXLSnaprUseLogo_no" name="seekXLSnaprUseLogo" value="false" <?php if ($devOptions['use_logo_key'] == "false") { echo 'checked="checked"'; }?>/> <?php _e("No","SeekXLSnapr"); ?></label>
			</p>
			<span class="description"><?php _e("To use your own logo, you need to <a href=\"http://snapr.seekxl.de/register/\">register</a> and fill in your logo key below.","SeekXLSnapr"); ?> <?php _e("Your own logos will not be shown, until a key is entered and the setting is set to \"Yes\".","SeekXLSnapr"); ?></span>
		</td>
	</tr>	
	
 	<tr>
		<th scope="row" valign="top"><?php _e("Logo Key","SeekXLSnapr"); ?></th>
		<td>
			<p>
			<label for="seekXLSnaprLogoKey"><input type="text" id="seekXLSnaprLogoKey" name="seekXLSnaprLogoKey" size="32" value="<?php if ($devOptions['logo_key'] != "") { echo $devOptions['logo_key']; } ?>" /></label>
			</p>
		</td>
	</tr>		
	
	</table>

<p class="submit"><input type="submit" name="update_seekXLSnaprSettings" class="button-primary" value="<?php _e('Update Settings', 'SeekXLSnapr'); ?>" /></p>

</form>
 </div>
		<?php
		}//End function printAdminPage()
	}
}

// End of plugin class code

// Load i18n
load_plugin_textdomain('SeekXLSnapr', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/');

// Prepare plugin start
if (class_exists("SeekXLSnapr")) {
	$o_SeekXLSnapr = new SeekXLSnapr();
}

//Initialize the admin panel

if (!function_exists("SeekXLSnapr_ap")) {
	function SeekXLSnapr_ap() {
		global $o_SeekXLSnapr;
		if (!isset($o_SeekXLSnapr)) {
			return;
		}
		add_options_page('seekXL Snapr Plugin', 'seekXL Snapr', 'manage_options', basename(__FILE__), array(&$o_SeekXLSnapr, 'printAdminPage'));
	}
}

if (isset($o_SeekXLSnapr)) {
	//Actions
	add_action('admin_menu', 'SeekXLSnapr_ap');
	add_action('wp_head', array(&$o_SeekXLSnapr, 'addHeaderCode'), 1);
	add_action('activate_seekxl-snapr/seekxl-snapr.php',  array(&$o_SeekXLSnapr, 'init'));
}
?>