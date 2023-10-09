import styles from './page.module.css';

export type DescriptionBoxProps = null;

const DescriptionBox = (
{...props}: DescriptionBoxProps
) => {
    return (<div className={{styles.description}}></div>)
}

export default DescriptionBox;