package com.nemni.cutndo.db;

import android.provider.BaseColumns;

/** Define constants like columns or sorting order for clips table */
public class Clip implements BaseColumns {

    // This class shouldn't be instantiated
    private Clip() {}

    /**
     * The type of clip
     * <p>TYPE: INTEGER</p>
     * Supported value: {@link CLIP_TYPE_TEXT}, {@link CLIP_TYPE_IMAGE}
     */
    public static final String COL_TYPE = "type";

    /**
     * The data of clip
     * <p>TYPE: TEXT</p>
     */
    public static final String COL_DATA = "data";

    /**
     * The time the clip is created
     * <p>TYPE: INTEGER</p>
     */
    public static final String COL_TIME = "time";

    /**
     * The type of clip is text. <tt>DATA</tt> field is content of text.
     */
    public static final int CLIP_TYPE_TEXT = 1;

    /**
     * The type of clip is image. <tt>DATA</tt> field is URI of image.
     */
    public static final int CLIP_TYPE_IMAGE = 2;


    /** Default sorting order */
    public static final String DEFAULT_SORT_ORDER = COL_TIME + " DESC";
    
    /** Default sorting order */
    public static final String DEFAULT_SORT_LIMIT = COL_TIME + " DESC LIMIT 1";
}
