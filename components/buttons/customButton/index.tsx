import {FC} from "react"
import styles from './customButton.module.scss'
import classNames from "classnames"
import Image from "next/image"

type CustomButtonProps = {
	text: string
	icon: string
}

export const CustomButton: FC<CustomButtonProps> = ({ text, icon }) => {

	return (
		<button className={classNames(styles.wrapper)}>
			<div className={styles.imageWrapper}>
				<Image src={icon} alt='icon' width={16} height={16}/>
			</div>
			<span>{text}</span>
		</button>
	)
}
