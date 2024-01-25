import styles from './navigation.module.scss'
import {FC, forwardRef, ReactNode, Ref} from "react"
import classNames from "classnames"

type NavigationBoxProps = {
	children: ReactNode
	isShadow?: boolean
	className?: string
	isBorder?: boolean
	isNoSwitcher?: boolean
	ref?: Ref<HTMLDivElement | null>
	handleShowTooltip?: () => void
	handleCloseTooltip?: () => void
}

export const NavigationBox: FC<NavigationBoxProps> = forwardRef<HTMLDivElement | null, NavigationBoxProps>((
	{
		children,
		isShadow = true,
		className,
		isBorder = true,
		isNoSwitcher = false,
		handleShowTooltip,
		handleCloseTooltip,
	}, ref) => {
	const isTouchDevice = () => {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
	}


	return (
		<div className={classNames(styles.navigationBtns, className, {
			[styles.isShadow]: isShadow,
			[styles.isBorder]: isBorder,
			[styles.isNoSwitcher]: isNoSwitcher,
		})} ref={ref}
		     onMouseEnter={typeof window !== 'undefined' && !isTouchDevice() ? handleShowTooltip : undefined}
		     onMouseLeave={typeof window !== 'undefined' && !isTouchDevice() ? handleCloseTooltip : undefined}
		>
			{children}
		</div>
	)
})

NavigationBox.displayName = 'NavigationBox'