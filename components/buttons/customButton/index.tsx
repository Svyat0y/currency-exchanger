import {FC} from "react"
import styles from './customButton.module.scss'
import classNames from "classnames"
import Image from "next/image"

type CustomButtonProps = {
	text: string
	icon: string
	onClick?: () => void
	className?: string
}

export const CustomButton: FC<CustomButtonProps> = ({ text, icon, onClick, className }) => {

	return (
		<button aria-label={text} className={classNames(styles.wrapper, className)} onClick={onClick}>
			<div className={styles.imageWrapper}>
				<Image src={icon} alt='icon' width={16} height={16}/>
			</div>
			<span>{text}</span>
		</button>
	)
}
