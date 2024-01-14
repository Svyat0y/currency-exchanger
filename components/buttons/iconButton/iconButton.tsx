import {Icon} from "@/components/icon"
import {FC} from "react"
import styles from './iconButton.module.scss'
import classNames from "classnames"

type IconButtonProps = {
	onClick?: () => void
	icon: string
	className?: string
	disabled?: boolean
	active: boolean
	hided?: boolean
}

export const IconButton: FC<IconButtonProps> = (
	{
		onClick,
		icon,
		className,
		disabled,
		active,
		hided,
	}) => {
	return (
		<button disabled={disabled} onClick={onClick} className={classNames(styles.wrapper, className, {
			[styles.active]: active,
			[styles.hided]: hided,
		})}>
			<Icon type={icon}/>
		</button>
	)
}