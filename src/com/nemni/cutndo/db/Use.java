package com.nemni.cutndo.db;

import android.provider.BaseColumns;

/** Define constants like columns or sorting order for uses table */
public class Use implements BaseColumns {

    // This class shouldn't be instantiated
    private Use() {}

    /**
     * The type of use
     * <p>TYPE: INTEGER</p>
     * Supported value: {@link USE_TYPE_TRANSLATE}, {@link USE_TYPE_SEARCH}, {@link USE_TYPE_TTS}, {@link USE_TYPE_SOCIAL}
     */
    public static final String COL_TYPE = "type";

    /**
     * The related clip
     * <p>TYPE: INTEGER</p>
     */
    public static final String COL_CLIP_ID = "clipId";

    /**
     * The time the use is created
     * <p>TYPE: INTEGER</p>
     */
    public static final String COL_TIME = "time";


    public static final String USE_TYPE_TRANSLATE = "translate";

    public static final String USE_TYPE_SEARCH = "search";

    public static final String USE_TYPE_TTS = "tts";
    
    public static final String USE_TYPE_SOCIAL = "social";
    
    /** Default sorting order */
    public static final String DEFAULT_SORT_ORDER = COL_TIME + " DESC";
    
    public static final String COUNT_SORT_ORDER = "total_uses DESC";
    
    /** Default sorting order */
    public static final String DEFAULT_SORT_LIMIT = COL_TIME + " DESC LIMIT 50";
    
    public static final String DEFAULT_COUNT_USES = "count(*) As total_uses";
}
