package com.jkv.bootstrap.bucket;

public enum BucketName {

    PROFILE_IMAGE("jknechtv-spring-react");

    private final String bucketName;

    BucketName(String bucketName){
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
