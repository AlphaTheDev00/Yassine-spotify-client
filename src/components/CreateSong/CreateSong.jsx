import { useEffect, useState } from "react"
import AudioUpload from "../AudioUpload/AudioUpload"
import { songCreate } from "../../services/songService.js"
import styles from './CreateSong.module.css'
import { useNavigate } from "react-router"

export default function CreateSong() {

    const user =
    {
        username: "aaron1",
        email: "aaron1@email.com",
        // profileImage: "https://bit.ly/sage-adebayo",
        isArtist: true
    }

    const [formData, setFormData] = useState({
        title: '',
        audio_url: '',
        duration: 0,
    })
    const [isUploading, setIsUploading] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else if (!user.isArtist) {
            navigate('/')
        }
    })

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setErrors({ ...errors, [event.target.name]: '' })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        try {
            const { song } = await songCreate(formData)
            navigate(`/songs/${song._id}`)
        } catch (error) {
            console.log('client 2:', error)
            setErrors(error.response.data.errors)
        }

    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Create A Song</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id='title' value={formData.title} onChange={handleChange} placeholder="Please enter a title" />
                    {errors.title && <p className={styles.errorMessage}>{errors.title}</p>}
                </div>

                <AudioUpload
                    formData={formData}
                    setFormData={setFormData}
                    isUploading={isUploading}
                    setIsUploading={setIsUploading}
                    errors={errors}
                    setErrors={setErrors}
                    styles={styles}
                />

                <button type="submit" disabled={!formData.title || !formData.audio_url || isUploading}>Create Song</button>
            </form>
        </div>
    )
}