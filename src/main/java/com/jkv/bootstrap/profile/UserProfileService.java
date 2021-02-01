package com.jkv.bootstrap.profile;

import com.jkv.bootstrap.bucket.BucketName;
import com.jkv.bootstrap.filestore.FileStore;
import com.jkv.bootstrap.registration.token.ConfirmationToken;
import com.jkv.bootstrap.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.apache.http.entity.ContentType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class UserProfileService implements UserDetailsService {

    private final static String USER_EMAIL_NOT_FOUND_MSG = "User with email (%s) not found";

    private final UserProfileRepository userProfileRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final FileStore fileStore;

    List<UserProfile> getUserProfiles() {
        return userProfileRepository.findAll();
    }

    @Transactional
    public void uploadUserProfileImage(Long userProfileID, MultipartFile file) {
        isFileEmpty(file);

        isImage(file);

        UserProfile user = getUserProfile(userProfileID);

        Map<String, String> metadata = extractMetaData(file);

        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), user.getUserProfileID());
        String fileName = String.format("%s-%s", file.getOriginalFilename(),UUID.randomUUID());
        try{
            this.fileStore.save(path,fileName, Optional.of(metadata), file.getInputStream());
            user.setProfileImageLink(fileName);
        }catch(IOException e){
            throw new IllegalStateException(e);
        }
    }

    public byte[] downloadUserProfileImage(Long userProfileID) {
        UserProfile user = getUserProfile(userProfileID);
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                user.getUserProfileID());

        return user.getProfileImageLink()
                .map(key -> fileStore.download(path,key))
                .orElse(new byte[0]);
    }

    private Map<String, String> extractMetaData(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf( file.getSize() ));
        return metadata;
    }

    private UserProfile getUserProfile(Long userProfileID) {
        return userProfileRepository.findById(userProfileID).orElse(null);
    }

    private void isImage(MultipartFile file) {
        if(Arrays.asList(ContentType.IMAGE_JPEG, ContentType.IMAGE_PNG, ContentType.IMAGE_GIF, ContentType.IMAGE_WEBP, ContentType.IMAGE_TIFF).contains(file.getContentType())){
            throw new IllegalStateException("File must be an image. Got " + file.getContentType() );
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if( file.isEmpty() ){
            throw new IllegalStateException("Cannot upload an empty file [ " + file.getSize() + " ]");
        }
    }

    public void createUserProfile(UserProfile userProfile) {
        Optional<UserProfile> userProfileOptional= userProfileRepository.findByEmail(userProfile.getUsername());
        if( userProfileOptional.isPresent() ){
            throw new IllegalStateException("Username already exists");
        }
        userProfileRepository.save(userProfile);
    }

    public void deleteUserProfile(Long userProfileId) {
        boolean userProfileExists = userProfileRepository.existsById(userProfileId);
        if( !userProfileExists ){
            throw new IllegalStateException("A user profile with the id " + userProfileId + " does not exist");
        }

        userProfileRepository.deleteById(userProfileId);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userProfileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_EMAIL_NOT_FOUND_MSG, email)));
    }

    public String signUpUser(UserProfile userProfile){
        boolean userExists = userProfileRepository
                .findByEmail(userProfile.getUsername())
                .isPresent();
        if( userExists ){
            throw new IllegalStateException("Email already taken");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(userProfile.getPassword());

        userProfile.setPassword(encodedPassword);

        userProfileRepository.save(userProfile);

        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                userProfile
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        return token;
    }

    public int enableUserProfile(String email) {
        return userProfileRepository.enableUserProfile(email);
    }
}
