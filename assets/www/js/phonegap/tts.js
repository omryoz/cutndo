
/**
 *  
 * @return Instance of DirectoryListing
 */
var Tts = function() {

};

/**
 * @param directory The directory for which we want the listing
 * @param successCallback The callback which will be called when directory listing is successful
 * @param failureCallback The callback which will be called when directory listing encouters an error
 */
Tts.prototype.speak = function(data , successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'TTSPlugin',         //Telling PhoneGap that we want to run "DirectoryListing" Plugin
						'speak',             //Telling the plugin, which action we want to perform
						[data]);
};
/**
 * <ul>
 * <li>Register the Directory Listing Javascript plugin.</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(function() {
	//Register the javascript plugin with PhoneGap
	PhoneGap.addPlugin('tts', new Tts());
	
	//Register the native class of plugin with PhoneGap
	//PluginManager.addService("TTSPlugin","com.nemni.cutndo.TTSPlugin");
});

