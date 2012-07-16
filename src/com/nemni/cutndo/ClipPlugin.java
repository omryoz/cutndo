/**
 * Example of Android PhoneGap Plugin
 */
package com.nemni.cutndo;

import java.sql.Timestamp;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.database.Cursor;
import android.util.Log;

import com.nemni.cutndo.LogTag;
import com.nemni.cutndo.db.ClipboardDbAdapter;
import com.nemni.cutndo.db.Use;
import com.phonegap.api.Plugin;
import com.phonegap.api.PluginResult;


/**
 * PhoneGap plugin which can be involved in following manner from javascript
 * <p>
 * result example - {"clips":[{"date : "date string" ,"type" : "integer" , "id" : "integer" , "text" : "long string text"},{...}]}
 * </p>
 * <pre>
 * {@code
 * successCallback = function(result){
 *     //result is a json
 *  
 * }
 * failureCallback = function(error){
 *     //error is error message
 * }
 *	
 * window.plugins.clip.getAllClips(successCallback,
 *			                            failureCallback,
 *										[data]);
 *		                               
 * }
 * </pre>
 * @author Kobi Nemni
 * 
 */
public class ClipPlugin extends Plugin implements LogTag {

	/** List Action */
	public static final String ACTION1="getAllClips";
	public static final String ACTION2="getLastClip";
	public static final String ACTION3="addUse";
	public static final String ACTION4="CountUses";
	public static final String ACTION5="addClip";
	
	private ClipboardDbAdapter mDbAdapter;
	/** Clipboard cursor to iterate all clipboards */
    private Cursor clips;
    private Cursor uses;

	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.phonegap.api.Plugin#execute(java.lang.String,
	 * org.json.JSONArray, java.lang.String)
	 */
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		Log.d("ClipPlugin", "Plugin Called");
		PluginResult.Status status = PluginResult.Status.OK;
		
		
		if (ACTION1.equals(action)) {
			try {
				Context context=ctx.getContext();
				mDbAdapter = new ClipboardDbAdapter(context);
				JSONObject jsobject = getClipboards("getAllClips");
				Log.d("ClipsPlugin", "Returning "+ jsobject.toString());
				mDbAdapter.close();
				return new PluginResult(status.OK, jsobject);
			} catch (JSONException jsonEx) {
				Log.d("ClipsPlugin", "Got JSON Exception " + jsonEx.getMessage());
				mDbAdapter.close();
				return new PluginResult(status.JSON_EXCEPTION);
			}
		} else if(ACTION2.equals(action)){
			try {
				Context context=ctx.getContext();
				mDbAdapter = new ClipboardDbAdapter(context);
				JSONObject jsobject = getClipboards("getLastClip");
				Log.d("ClipsPlugin", "Returning "+ jsobject.toString());				
				mDbAdapter.close();
				return new PluginResult(status.OK, jsobject);
			} catch (JSONException jsonEx) {
				Log.d("ClipsPlugin", "Got JSON Exception " + jsonEx.getMessage());
				mDbAdapter.close();
				return new PluginResult(status.JSON_EXCEPTION);
			}
		} else if(ACTION3.equals(action)){
			try {
				Context context=ctx.getContext();
				mDbAdapter = new ClipboardDbAdapter(context);
				
				JSONObject jsonObj = new JSONObject(data.getString(0));	
				Log.d("ClipsPlugin", "This is the dataaaaa: "+ jsonObj.getString("target"));
				Log.d("ClipsPlugin", "This is the dataaaaa: "+ jsonObj.getInt("clip_id"));
				
				mDbAdapter.insertUse(jsonObj.getString("target"), jsonObj.getInt("clip_id"));
				mDbAdapter.close();
				return new PluginResult(status.OK);
				} catch (JSONException jsonEx) {
					Log.d("ClipsPlugin", "Got JSON Exception " + jsonEx.getMessage());
					mDbAdapter.close();
					return new PluginResult(status.JSON_EXCEPTION);
				}
		} else if(ACTION4.equals(action)){	
			try {
				Context context=ctx.getContext();
				mDbAdapter = new ClipboardDbAdapter(context);
				JSONObject jsobject = getCountUses();
				Log.d("ClipsPlugin", "Returning "+ jsobject.toString());
				mDbAdapter.close();
				return new PluginResult(status.OK, jsobject);
			} catch (JSONException jsonEx) {
				Log.d("ClipsPlugin", "Got JSON Exception " + jsonEx.getMessage());
				mDbAdapter.close();
				return new PluginResult(status.JSON_EXCEPTION);
			}

		} else if(ACTION5.equals(action)){	
			try {
				Context context=ctx.getContext();
				mDbAdapter = new ClipboardDbAdapter(context);
				
				JSONObject jsonObj = new JSONObject(data.getString(0));	
				Log.d("ClipsPlugin", "This is the dataaaaa: "+ jsonObj.getString("text"));
				
				mDbAdapter.insertClip(1, jsonObj.getString("text"));
				mDbAdapter.close();
				return new PluginResult(status.OK);
				} catch (JSONException jsonEx) {
					Log.d("ClipsPlugin", "Got JSON Exception " + jsonEx.getMessage());
					mDbAdapter.close();
					return new PluginResult(status.JSON_EXCEPTION);
				}

		} else {
			Log.d("ClipsPlugin", "Invalid action : "+action+" passed");
			mDbAdapter.close();
			return new PluginResult(status.INVALID_ACTION);			
		}

	}
	private JSONObject getCountUses() throws JSONException {
		JSONObject jsobj = new JSONObject();
		uses = mDbAdapter.queryCountAllUses();
		uses = mDbAdapter.queryCountUsesByType();
		JSONArray countUsesList = new JSONArray();
        while(uses.moveToNext()) {
        	Log.d("ClipsPlugin", "here");
        	JSONObject tempjsobj = new JSONObject();
        	tempjsobj.put("total_uses", uses.getInt(0));
        	tempjsobj.put("type", uses.getString(1));
        	countUsesList.put(tempjsobj);
        }   
        Log.d("ClipsPlugin", uses.toString());
        jsobj.put("uses", countUsesList);
		return jsobj;
	}
	/**
	 * Gets all clips that are saved in the clips table, in JSON format
	 * @return JSONObject representation all clips stired in db. e.g {"clips":[{"date : "date string" ,"type" : "integer" , "id" : "integer" , "text" : "long string text"},{...}]}
	 * @throws JSONException
	 */
	private JSONObject getClipboards(String type)
			throws JSONException {
		JSONObject jsobj = new JSONObject();
		if(type == "getAllClips"){
			clips = mDbAdapter.queryAllClips();
		} else if(type == "getLastClip"){
			clips = mDbAdapter.queryLastClip();
		}
		JSONArray clipsList = new JSONArray();
        while(clips.moveToNext()) {
        	JSONObject tempjsobj = new JSONObject();
        	tempjsobj.put("id", clips.getInt(0));
        	tempjsobj.put("type", clips.getInt(1));
        	tempjsobj.put("text", clips.getString(2));
        	
        	Timestamp st = new Timestamp(Long.parseLong(clips.getString(3)));
        	tempjsobj.put("time", Long.parseLong(clips.getString(3)));
        	java.util.Date date1 = new java.util.Date(st.getTime());           
        	tempjsobj.put("date", date1);
        	clipsList.put(tempjsobj);
        }   
        Log.d("ClipsPlugin", clips.toString());
        jsobj.put("clips", clipsList);
		return jsobj;
		
	}
}
