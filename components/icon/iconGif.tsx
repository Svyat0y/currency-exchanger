import styles from './iconGif.module.scss'
import Image, {StaticImageData} from "next/image"
import {FC} from "react"

type IconGifProps = {
	gif: StaticImageData
}

export const IconGif: FC<IconGifProps> = ({gif}) => {
	return (
		<div className={styles.wrapper}>
			<Image src={gif} alt={'travelExplore'}/>
		</div>
	)
}