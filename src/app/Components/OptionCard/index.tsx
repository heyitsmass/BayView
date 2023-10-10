// intended to render a card of sorts that displays information of a hotel room available to reserve
// displayed horizontally
// preview image will show
// description box will show details of the hotel room like 'no smoking', '1 master bed', etc
// Submit reservation button will make an api call to reserve the hotel room

import styles from './optionCard.module.css'
import {DetailedHTMLProps, ImgHTMLAttributes, useId, SyntheticEvent } from 'react';

// There should be a data type defined for this option card which passes data down through the children 

export type OptionCardProps = { 
    /* the href to the image */ 
    previewImage: string 
    /* the text for the description */ 
    descriptionText: string
} 

const OptionCard = ({...props}:OptionCardProps) => {
    const id = useId(); 
    const handleSubmission = async (e?:SyntheticEvent) => { 
        e?.preventDefault(); 
        
        /* perform work 
        const res = await createReservation();
        if(res.error){ 
            console.log(res.message) 
        } */ 
                
    } 

    const {previewImage, descriptionText} = props; 
    // we can reduce the component overhead by using pure html for this component 
    return(
        <div id={id} className={styles.optionCard}>
            <img className={styles.previewImage} src={previewImage}/>
            <p className={styles.descriptionText}>{descriptionText}</p>
            <button className={styles.submissionButton} onClick={handleSubmission}></button>
        </div>
    )
}

/* 

type PreviewImageProps = { 
    previewImage:string
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const PreviewImage = ({...props}:PreviewImageProps) => { 

    // Custom state work

    const {previewImage, className} = props; 

    props.className = [className, styles.previewImage].join(' '); 
    props.src = previewImage
    
    return <img {...props}/>
}
then 
    return(
        <div id={id} className={styles.optionCard}>
            <PreviewImage {...previewImage}/>
            <p className={styles.descriptionText}>{descriptionText}</p>
            <button className={styles.submissionButton} onClick={handleSubmission}></button>
        </div>
    )
*/ 

