package com.nemni.cutndo.db;

import com.nemni.cutndo.LogTag;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DataSetObservable;
import android.database.DataSetObserver;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

/**
 * Adapter class used to manipulate clipboard database.
 * <p>
 * The database contains two tables:
 * <pre>
 * Clips TABLE:
 * +-----+------+------+------+
 * | _ID | TYPE | DATA | TIME |
 * +-----+------+------+------+
 * </pre>
 * <pre>
 * Uses TABLE:
 * +-----+------+---------+------+
 * | _ID | TYPE | CLIP_ID | TIME |
 * +-----+------+---------+------+
 * </pre>
 */
public class ClipboardDbAdapter implements LogTag {
    private static final String TAG = "ClipboardDbAdapter";

    private static final String DATABASE_NAME = "clipboard.db";
    private static final int DATABASE_VERSION = 2;
    
    private static final String CLIPS_TABLE_NAME = "clips";
    private static final String USES_TABLE_NAME = "uses";

    private static final String[] CLIPS_PROJECTION = new String[] {
        Clip._ID, Clip.COL_TYPE, Clip.COL_DATA, Clip.COL_TIME
    };
    private static final String[] USES_PROJECTION = new String[] {
        Use._ID, Use.COL_TYPE, Use.COL_CLIP_ID, Clip.COL_TIME
    };
    
    
    private static DataSetObservable mDataSetObservable = new DataSetObservable();

    /** Convenient class for handling database creation and upgrade */
    private static class DatabaseHelper extends SQLiteOpenHelper {

        public DatabaseHelper(Context context) {
            super(context, DATABASE_NAME, null, DATABASE_VERSION);
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            db.execSQL("CREATE TABLE " + CLIPS_TABLE_NAME + " ("
                    + Clip._ID + " INTEGER PRIMARY KEY,"
                    + Clip.COL_TYPE + " INTEGER,"
                    + Clip.COL_DATA + " TEXT,"
                    + Clip.COL_TIME + " DATETIME DEFAULT CURRENT_TIMESTAMP"
                    + ");");
            Log.i(TAG, "create sqlite database table: " + CLIPS_TABLE_NAME);
            
            db.execSQL("CREATE TABLE " + USES_TABLE_NAME + " ("
                    + Use._ID + " INTEGER PRIMARY KEY,"
                    + Use.COL_TYPE + " TEXT,"
                    + Use.COL_CLIP_ID + " INTEGER,"
                    + Use.COL_TIME + " DATETIME DEFAULT CURRENT_TIMESTAMP"
                    + ");");
            Log.i(TAG, "create sqlite database table: " + USES_TABLE_NAME);
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            Log.w(TAG, "Upgrading database from version " + oldVersion + " to "
                    + newVersion + ", which will destroy all old data");
            db.execSQL("DROP TABLE IF EXISTS " + CLIPS_TABLE_NAME);
            onCreate(db);
        }
    }

    private DatabaseHelper mDbHelper;

    /**
     * Get an adapter to manipulate the clipboard database. The clipboard will
     * be created if it doesn't exist yet.
     *
     * @param context  Used to open or create database
     * @throws SQLException  Thrown when opening or creating database fails
     */
    public ClipboardDbAdapter(Context context) throws SQLException {
        this.mDbHelper = new DatabaseHelper(context);
    }
    
    /*CLIPS*/
    
    public Cursor queryClips(String[] columns, String selection, String[] selectionArgs, String orderBy) {
    	return mDbHelper.getReadableDatabase().query(CLIPS_TABLE_NAME, columns,
                selection, selectionArgs, null, null, orderBy);
    }
    
    public void insertClip(int clipType, String clipData) {
        ContentValues values = new ContentValues();
        values.put(Clip.COL_TYPE, clipType);
        values.put(Clip.COL_DATA, clipData);
        values.put(Clip.COL_TIME, System.currentTimeMillis());
        long rowId = mDbHelper.getWritableDatabase().insert(CLIPS_TABLE_NAME, Clip.COL_DATA, values);
        if (rowId < 0) {
            Log.e(TAG, "add clip failed");
            return ;
        }
        Log.d(TAG, "add clip succsued");
        mDataSetObservable.notifyChanged();
    }
    
    public void updateClip(int clipId, int clipType, String clipData) {
        SQLiteDatabase db = mDbHelper.getWritableDatabase();
        ContentValues values = new ContentValues();
        if (clipType >= 0) {
            values.put(Clip.COL_TYPE, clipType);
        }
        if (clipData != null) {
            values.put(Clip.COL_DATA, clipData);
        }
        if (values.size() <= 0) {
            return ;
        }
        db.update(CLIPS_TABLE_NAME, values, Clip._ID + "=" + clipId, null);
        mDataSetObservable.notifyChanged();
    }
    
    public void deleteClip(int clipId) {
        mDbHelper.getWritableDatabase().delete(CLIPS_TABLE_NAME,
                Clip._ID + "=" + clipId, null);
        mDataSetObservable.notifyChanged();
    }
    
    public Cursor queryClip(int clipId) {
    	return queryClips(CLIPS_PROJECTION, Clip._ID + "=" + clipId, null, null);
    }
    
    public Cursor queryAllClips(String[] columns) {
        return queryClips(columns, null, null, Clip.DEFAULT_SORT_ORDER);
    }
    
    public Cursor queryAllClips() {
        return queryAllClips(CLIPS_PROJECTION);
    }
    
	public Cursor queryLimitClips(String[] columns) {	 
        return queryClips(columns, null, null, Use.DEFAULT_SORT_LIMIT);
    }
    
	public Cursor queryLastClip(String[] columns) {
        return queryClips(columns, null, null, Clip.DEFAULT_SORT_LIMIT);
    }    
    
    public Cursor queryLastClip() {
        return queryLastClip(CLIPS_PROJECTION);
    }
	/*ENDOF CLIPS*/
        
	/*USES*/
    
    public Cursor queryUses(String[] columns, String selection, String[] selectionArgs, String orderBy) {
    	return mDbHelper.getReadableDatabase().query(USES_TABLE_NAME, columns,
                selection, selectionArgs, null, null, orderBy);
    }
    
    public Cursor queryUses(String[] columns, String selection, String[] selectionArgs, String GroupBy, String orderBy) {
    	return mDbHelper.getReadableDatabase().query(USES_TABLE_NAME, columns,
                selection, selectionArgs, GroupBy, null, orderBy);
    }
    
    public void insertUse(String useType, Integer clipID) {
        ContentValues values = new ContentValues();
        values.put(Use.COL_TYPE, useType);
        values.put(Use.COL_CLIP_ID, clipID);
        values.put(Use.COL_TIME, System.currentTimeMillis());
        long rowId = mDbHelper.getWritableDatabase().insert(USES_TABLE_NAME, Use.COL_CLIP_ID, values);
        if (rowId < 0) {
            Log.e(TAG, "add use failed");
            return ;
        }
        Log.d(TAG, "add use succsued");
        mDataSetObservable.notifyChanged();
    }
    
    public void deleteUse(int useId) {
        mDbHelper.getWritableDatabase().delete(USES_TABLE_NAME,
                Use._ID + "=" + useId, null);
        mDataSetObservable.notifyChanged();
    }
    
    public Cursor queryUse(int useId) {
    	return queryUses(USES_PROJECTION, Use._ID + "=" + useId, null, null);
    }
    
    public Cursor queryAllUses(String[] columns) {
        return queryUses(columns, null, null, Use.DEFAULT_SORT_ORDER);
    }
    public Cursor queryAllUses(String[] columns ,String whereString,String[] selectionArgs ,String orderString) {
        return queryUses(columns, whereString , selectionArgs, orderString);
    }
 
    public Cursor queryAllUses() {
        return queryAllUses(USES_PROJECTION);
    }
    
    public Cursor queryLimitUses(String[] columns) {
    	
        return queryUses(columns, null, null, Use.DEFAULT_SORT_LIMIT);
    }
    
    public Cursor queryCountAllUses() {    	
        return queryAllUses(new String[] {Use.DEFAULT_COUNT_USES,"type"});
    }
    
    public Cursor queryCountUsesByType() {   
    	// NOT WORKING
        return queryUses(new String[] {Use.DEFAULT_COUNT_USES,"type"} ,  null ,null ,"type", "total_uses DESC");
    }
    /*ENDOF USES*/
  
    /**
     * Close open database
     */
    public void close() {
        mDbHelper.close();
    }
    
    public void registerDataSetObserver(DataSetObserver observer) {
        mDataSetObservable.registerObserver(observer);
    }
    
    public void unregisterDataSetObserver(DataSetObserver observer) {
        mDataSetObservable.unregisterObserver(observer);
    }
}
