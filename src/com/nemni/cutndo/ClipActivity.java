package com.nemni.cutndo;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.DroidGap;

import com.nemni.cutndo.service.ClipboardMonitor;

public class ClipActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        startClipboardMonitor();
    }
    private void startClipboardMonitor() {
        ComponentName service = startService(new Intent(this,
                ClipboardMonitor.class));
        if (service == null) {
            Log.e(TAG, "Can't start service "
                    + ClipboardMonitor.class.getName());
        }
    }

} 