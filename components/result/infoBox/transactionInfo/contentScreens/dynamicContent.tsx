import classNames from "classnames"
import styles from './dynamicScreen.module.scss'
import {FC, ReactNode} from "react"
import {useMount} from "@/hooks/useMount"

type DynamicContentProps = {
	children: ReactNode
	active: boolean
}

export const DynamicContent: FC<DynamicContentProps> = ({children, active}) => {

	const {mounted} = useMount(active)

	if(!active && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active,
		})}>
			{children}
		</div>
	)
}