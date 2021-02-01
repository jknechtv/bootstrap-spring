import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function Dropzone(props) {

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        axios.post(
            `http://localhost:8080/api/v1/user-profiles/${props.userProfileId}/image/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then( () => {
            props.toggle();
        }).catch( err => {
            console.log("Error uploading the file");
            console.log(err);
        });

    },[props])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {
                isDragActive ?

                    <p className="py-5">
                        <svg aria-hidden="true" className="img-fluid d-block mx-auto mb-3" focusable="false" data-prefix="fas" data-icon="file-upload" role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="64px" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>
                        <span>Drop it here</span>
                    </p> :
                    <p className="py-5">
                        <svg aria-hidden="true" className="img-fluid d-block mx-auto mb-3" focusable="false" data-prefix="fas" data-icon="file-upload" role="img" xmlns="http://www.w3.org/2000/svg" width="48px" height="64px" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>
                        <span>Choose a file</span> or drag it here
        </p>
            }
        </div>
    )
}

export default Dropzone;