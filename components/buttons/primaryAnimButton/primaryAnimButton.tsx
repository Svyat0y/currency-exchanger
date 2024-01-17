import {FC} from "react"
import styles from './primaryAnimButton.module.scss'
import classNames from "classnames"
import {Icon} from "@/components/icon"

type PrimaryAnimButtonProps = {
	state: boolean
	onClick: () => void
	firstLabel: string
	secondLabel: string
	icon?: string
}

export const PrimaryAnimButton: FC<PrimaryAnimButtonProps> = ({state, onClick, firstLabel, secondLabel, icon}) => {
	return (
		<button className={classNames(styles.wrapper, {
			[styles.default]: !state,
			[styles.active]: state
		})} onClick={onClick}>
			<span className={styles.defaultContent}>{firstLabel}</span>
			<span className={styles.activeContent}>
					{icon && <span className={styles.iconWrapper}>
						<Icon type={icon}/>
					</span>}
				{secondLabel}
				</span>
		</button>
	)
}