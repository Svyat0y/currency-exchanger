import {FC} from "react"
import styles from './primaryButton.module.scss'
import classNames from "classnames"

const BTN_TYPES = {
	gray: 'gray',
	black: 'black',
	whiteGray: 'whiteGray',
} as const

type PrimaryButtonProps = {
	type: typeof BTN_TYPES[keyof typeof BTN_TYPES]
	onClick?: () => void
	disabled?: boolean
	text?: string
}

export const PrimaryButton: FC<PrimaryButtonProps> = (
	{
		type,
		onClick,
		disabled,
		text
	}) => {
	return (
		<button
			aria-label={text}
			className={classNames(styles.wrapper, {
				[styles.gray]: type === BTN_TYPES.gray,
				[styles.black]: type === BTN_TYPES.black,
				[styles.whiteGray]: type === BTN_TYPES.whiteGray,
			})}
			disabled={disabled}
			onClick={onClick}
		>
			{text}
		</button>
	)
}