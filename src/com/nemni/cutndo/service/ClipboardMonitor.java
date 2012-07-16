package com.nemni.cutndo.service;

import com.nemni.cutndo.ClipActivity;
import com.nemni.cutndo.LogTag;

/*notice this is the main android activity*/
import com.nemni.cutndo.R;
import com.nemni.cutndo.db.Clip;
import com.nemni.cutndo.db.ClipboardDbAdapter;
import com.nemni.cutndo.prefs.AppPrefs;


import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.IBinder;
import android.text.ClipboardManager;
import android.util.Log;

/**
 * Starts a background thread to monitor the states of clipboard and stores
 * any new clips into the SQLite database.
 * <p>
 * <i>Note:</i> the current android clipboard system service only supports
 * text clips, so in browser, we can just save images to external storage
 * (SD card). 
 */
public class ClipboardMonitor extends Service implements LogTag {

    private NotificationManager mNM;
    private MonitorTask mTask = new MonitorTask();
    private ClipboardManager mCM;
    private ClipboardDbAdapter mDbAdapter;
    private SharedPreferences mPrefs;

    
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        mNM = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        showNotification();
        mCM = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
        mDbAdapter = new ClipboardDbAdapter(this);
        mPrefs = getSharedPreferences(AppPrefs.NAME, MODE_PRIVATE);
        AppPrefs.operatingClipboardId = mPrefs.getInt(
                AppPrefs.KEY_OPERATING_CLIPBOARD,
                AppPrefs.DEF_OPERATING_CLIPBOARD);
        mTask.start();
    }

    private void showNotification() {
        Notification notif = new Notification(R.drawable.ic_launcher,
                "MyClips clipboard monitor is started",
                System.currentTimeMillis());
        notif.flags |= (Notification.FLAG_ONGOING_EVENT | Notification.FLAG_NO_CLEAR);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0,
                new Intent(this, ClipActivity.class), 0);
        notif.setLatestEventInfo(this, getText(R.string.clip_monitor_service),
                "Tap here to enter MyClips UI", contentIntent);
        // Use layout id because it's unique
        mNM.notify(R.string.clip_monitor_service, notif);
    }
    
    @Override
    public void onDestroy() {
        mNM.cancel(R.string.clip_monitor_service);
        mTask.cancel();
        mDbAdapter.close();
    }
    
    @Override
    public void onStart(Intent intent, int startId) {
    }

    /**
     * Monitor task: monitor new text clips in global system clipboard 
     */
    private class MonitorTask extends Thread {

        private volatile boolean mKeepRunning = false;
        private String mOldClip = null;
        
        public MonitorTask() {
            super("ClipboardMonitor");
        }

        /** Cancel task */
        public void cancel() {
            mKeepRunning = false;
            interrupt();
        }
        
        @Override
        public void run() {
            mKeepRunning = true;
            while (true) {
                doTask();
                try {
                    Thread.sleep(mPrefs.getInt(AppPrefs.KEY_MONITOR_INTERVAL,
                            AppPrefs.DEF_MONITOR_INTERVAL));
                } catch (InterruptedException ignored) {
                }
                if (!mKeepRunning) {
                    break;
                }
            }
        }
        
        private void doTask() {
            if (mCM.hasText()) {
                String newClip = mCM.getText().toString();
                if (!newClip.equals(mOldClip)) {
                    Log.i(TAG, "detect new text clip: " + newClip.toString());
                    mOldClip = newClip;
                    mDbAdapter.insertClip(Clip.CLIP_TYPE_TEXT,
                            newClip.toString());
                            //mPrefs.getInt(AppPrefs.KEY_OPERATING_CLIPBOARD,
                            //        AppPrefs.DEF_OPERATING_CLIPBOARD));
                    Log.i(TAG, "new text clip inserted: " + newClip.toString());
                }
            }
        }
    }
}
