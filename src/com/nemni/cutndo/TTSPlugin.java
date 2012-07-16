package com.nemni.cutndo;

import org.apache.cordova.api.PluginResult;
import org.ispeech.SpeechSynthesis;
import org.ispeech.SpeechSynthesisEvent;
import org.ispeech.error.BusyException;
import org.ispeech.error.InvalidApiKeyException;
import org.ispeech.error.NoNetworkException;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.phonegap.api.Plugin;

public class TTSPlugin extends Plugin implements LogTag {
	
	/** List Action */
	public static final String ACTION1="speak";
	
	private SpeechSynthesis synthesis;
	private Context context;
	private Activity clipActivity;
	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		Log.d("TTSPlugin", "Plugin Called");
		PluginResult.Status status = PluginResult.Status.OK;
		if (ACTION1.equals(action)) {
			try {
				Log.d("TTSPlugin", "inside the action");
				context=ctx.getContext();
				String text = data.getString(0);
				Log.d("TTSPlugin", "reciving the text: " + text);
				
				try {
					Log.d("TTSPlugin", "inside the action2");
					context=ctx.getContext();
					synthesis = SpeechSynthesis.getInstance(context, new Activity());
				}
				catch (InvalidApiKeyException e) {
					Log.e(TAG, "Invalid API key\n" + e.getStackTrace());
					Toast.makeText(context, "ERROR: Invalid API key", Toast.LENGTH_LONG).show();
				}
				
				try{
					Log.d("TTSPlugin", "inside the action3");
					synthesis.speak(text);
				}
				catch (BusyException e) {
					Log.e(TAG, "SDK is busy");
					e.printStackTrace();
					Toast.makeText(context, "ERROR: SDK is busy", Toast.LENGTH_LONG).show();
				} catch (NoNetworkException e) {
					Log.e(TAG, "Network is not available\n" + e.getStackTrace());
					Toast.makeText(context, "ERROR: Network is not available", Toast.LENGTH_LONG).show();
				}
				Log.d("TTSPlugin", "Speaking text!!");
				return new PluginResult(status.OK);

			}
			catch (JSONException jsonEx) {
				Log.d("ClipsPlugin", "Got JSON Exception " + jsonEx.getMessage());
				return new PluginResult(status.JSON_EXCEPTION);
			} 
		
		}
	return null;
	}
	private void prepareTTSEngine() {
		try {
			context=ctx.getContext();
			synthesis = SpeechSynthesis.getInstance(context, new Activity());
			synthesis.setSpeechSynthesisEvent(new SpeechSynthesisEvent() {

				public void onPlaySuccessful() {
					Log.i(TAG, "onPlaySuccessful");
				}

				public void onPlayStopped() {
					Log.i(TAG, "onPlayStopped");
				} 

				public void onPlayFailed(Exception e) {
					Log.e(TAG, "onPlayFailed");
					e.printStackTrace();
				}

				public void onPlayStart() {
					Log.i(TAG, "onPlayStart");
				}

				@Override
				public void onPlayCanceled() {
					Log.i(TAG, "onPlayCanceled");
				}
				
				
			});

			//synthesis.setVoiceType("usenglishfemale1"); // All the values available to you can be found in the developer portal under your account

		} catch (InvalidApiKeyException e) {
			Log.e(TAG, "Invalid API key\n" + e.getStackTrace());
			Toast.makeText(context, "ERROR: Invalid API key", Toast.LENGTH_LONG).show();
		}

	}


}
