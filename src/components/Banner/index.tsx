import Image, { StaticImageData } from "next/image";
import styles from "./banner.module.css";
import { CSSProperties, ReactNode } from "react";

type BannerProps = {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode,
    bannerHeight?: string;
};

export default function Banner(props: BannerProps) {
    const {src, className, style, children, bannerHeight, ...spread_props } = props;
    
    // Combine the provided style with default styles
    const combinedClasses = `-z-20  ${className}`;
    const combinedStyle: CSSProperties = {
        objectFit: 'cover',
        objectPosition: '50% 80%',
        ...style
    };
    
	return (
		<div className={`relative w-full h-52 ${bannerHeight}`}>
			<Image
                src={src}
				fill
				priority
				alt="Banner"
				className={combinedClasses}
				style={combinedStyle}
                {...spread_props}
			/>
			<div className={`${styles.imageWrapper} w-full h-10 z-200`}>
			    {/* Add content to overlay on the image here */}
                {children}
            </div>
		</div>
	);
}