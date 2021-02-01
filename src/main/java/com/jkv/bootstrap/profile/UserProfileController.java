package com.jkv.bootstrap.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/user-profiles")
@CrossOrigin("http://localhost:3000")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public List<UserProfile> getUserProfiles() {
        return userProfileService.getUserProfiles();
    }

    @PostMapping(
            path = "create"
    )
    public void createUserProfile(@RequestBody UserProfile userProfile){
        userProfileService.createUserProfile(userProfile);
    }

    @PostMapping(
            path = "{userProfileID}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadUserProfileImage(@PathVariable("userProfileID") Long userProfileID,
                                       @RequestParam("file" )MultipartFile file) {
        userProfileService.uploadUserProfileImage(userProfileID, file);
    }

    @GetMapping("{userProfileID}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileID") Long userProfileID){
        return userProfileService.downloadUserProfileImage(userProfileID);
    }

    @DeleteMapping(path = "{userProfileId}")
    public void deleteUserProfile(
            @PathVariable("userProfileId") Long userProfileId
    ){
    userProfileService.deleteUserProfile(userProfileId);
    }
}
