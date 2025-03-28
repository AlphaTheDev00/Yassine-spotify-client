import { useEffect, useState } from "react"
import AudioUpload from "../AudioUpload/AudioUpload"
import { songShow, songUpdate } from "../../services/songService.js"
import styles from './UpdateSong.module.css'
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function UpdateSong() {

    const { user } = useAuth()

    const [formData, setFormData] = useState({
        title: '',
        audio_url: '',
        duration: 0,
    })
    const [isUploading, setIsUploading] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (!user) {
            return navigate('/login')
        } 

        songShow(id).then(({song}) => {
            if (user._id !== song.user_id._id) {
                console.log('hello')
                return navigate('/')
            }

            setFormData(song)
        }).catch(() => navigate('/'))

    }, [id, user, navigate])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setErrors({ ...errors, [event.target.name]: '' })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        try {
            const { updatedSong } = await songUpdate(id, formData)
            navigate(`/songs/${updatedSong._id}`)
        } catch (error) {
            console.log('client 2:', error)
            setErrors(error.response.data.errors)
        }

    }

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Update A Song</h1>
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

                <button type="submit" disabled={!formData.title || !formData.audio_url || isUploading}>Update Song</button>
            </form>
        </div>
    )
}