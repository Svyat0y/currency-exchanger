import {FC, ReactNode} from "react"
import styles from './primaryButton.module.scss'
import classNames from "classnames"

const BTN_TYPES = {
	gray: 'gray',
	black: 'black',
	whiteGray: 'whiteGray',
} as const

type PrimaryButtonProps = {
	children: ReactNode
	type: typeof BTN_TYPES[keyof typeof BTN_TYPES]
	onClick?: () => void
}

export const PrimaryButton: FC<PrimaryButtonProps> = (
	{
		children,
		type,
		onClick,
	}) => {
	return (
		<button
			className={classNames(styles.wrapper, {
				[styles.gray]: type === BTN_TYPES.gray,
				[styles.black]: type === BTN_TYPES.black,
				[styles.whiteGray]: type === BTN_TYPES.whiteGray,
			})}
			onClick={onClick}
		>
			{children}
		</button>
	)
}