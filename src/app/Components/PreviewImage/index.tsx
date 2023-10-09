'use client'
import styles from './page.module.css';

export type PreviewImageProps = null;

const PreviewImage = (
{...props} : PreviewImageProps
                      ) => {
    return (<div className={styles.previewImage}>
        <img className={"Image"} src={} alt={} height={} width={}></img>
    </div>)
}

export default PreviewImage;