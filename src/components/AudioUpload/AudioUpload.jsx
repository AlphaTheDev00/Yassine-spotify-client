import { Spinner } from "@chakra-ui/react"
import axios from "axios"

export default function AudioUpload({ setFormData, isUploading, setIsUploading, errors, setErrors ,styles }) {

    async function handleUpload(event) {
        setErrors({...errors, audio_url: ''})
        setIsUploading(true)
        setFormData(formData => ({
            ...formData,
            audio_url: '',
        }))
        const audioFile = event.target.files[0]
        try {
            const { data } = await axios.postForm(import.meta.env.VITE_CLOUDINARY_AUDIO_UPLOAD_URL, {
                file: audioFile,
                upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
            })
            setFormData(formData => ({
                ...formData,
                audio_url: data.secure_url,
                duration: data.duration
            }))

        } catch {
            setErrors({...errors, audio_url: 'Please provide an audio file'})
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            <div>
                <label htmlFor="audioFile">Audio File: </label>
                <input
                    type="file"
                    accept="audio/*"
                    name="audioFile"
                    id='audioFile'
                    onChange={handleUpload} />
                {isUploading && <Spinner />}
                {errors.audio_url && <p className={styles.errorMessage}>{errors.audio_url}</p>}

            </div>
            <div>
            </div>
        </>
    )
}