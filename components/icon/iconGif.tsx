import styles from './iconGif.module.scss'
import Image, {StaticImageData} from "next/image"
import {FC} from "react"

type IconGifProps = {
	gif: StaticImageData
	alt: string
}

export const IconGif: FC<IconGifProps> = ({gif, alt }) => {
	return (
		<div className={styles.wrapper}>
			<Image src={gif} alt={alt}/>
		</div>
	)
}