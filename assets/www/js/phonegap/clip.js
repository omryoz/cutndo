
/**
 *  
 * @return Instance of DirectoryListing
 */
var Clip = function() {

};

/**
 * @param directory The directory for which we want the listing
 * @param successCallback The callback which will be called when directory listing is successful
 * @param failureCallback The callback which will be called when directory listing encouters an error
 */
Clip.prototype.getAllClips = function(data , successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'ClipPlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
						'getAllClips',              //Telling the plugin, which action we want to perform
						[data]);
};

Clip.prototype.getLastClip = function(data , successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'ClipPlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
						'getLastClip',              //Telling the plugin, which action we want to perform
						[data]);
};

Clip.prototype.addClip = function(data , successCallback, failureCallback) {


    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'ClipPlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
						'addClip',              //Telling the plugin, which action we want to perform
						[data]);
};


Clip.prototype.addUse = function(data , successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'ClipPlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
						'addUse',              //Telling the plugin, which action we want to perform
						[data]);
};

Clip.prototype.CountUses = function(data , successCallback, failureCallback) {

	
    return PhoneGap.exec(successCallback,    //Callback which will be called when directory listing is successful
    					failureCallback,     //Callback which will be called when directory listing encounters an error
    					'ClipPlugin',  //Telling PhoneGap that we want to run "DirectoryListing" Plugin
						'CountUses',              //Telling the plugin, which action we want to perform
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
	PhoneGap.addPlugin('clip', new Clip());
	
	//Register the native class of plugin with PhoneGap
	//PluginManager.addService("ClipPlugin","com.nemni.cutndo.ClipPlugin");
});

