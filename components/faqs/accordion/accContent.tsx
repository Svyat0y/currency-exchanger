import styles from './accordion.module.scss'
import classNames from "classnames"
import {FC} from "react"
import {useMount} from "@/hooks/useMount"

type AccContent = {
	text: string
	active: boolean
}

export const AccContent: FC<AccContent> = ({text, active}) => {
	const {mounted} = useMount(active)

	if(!active && !mounted) return null

	return (
		<p className={classNames(styles.accContent, {
			[styles.active]: active && mounted
		})}>{text}</p>
	)
}