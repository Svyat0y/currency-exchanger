import classNames from "classnames"
import styles from './dynamicScreen.module.scss'
import {FC, ReactNode, useEffect} from "react"
import {useMount} from "@/hooks/useMount"
import {useContextStatus} from "@/context/statusContext"

type DynamicContentProps = {
	children: ReactNode
	active: boolean
	currentScreen?: boolean
	nextStep?: {step: string, status: string, delay: number}
}

export const DynamicContent: FC<DynamicContentProps> = (
	{
		children,
		active,
		currentScreen,
		nextStep
	}) => {
	const {updateState} = useContextStatus()
	const {mounted} = useMount(active)

	useEffect(() => {
		let timout: any

		if(active && currentScreen) {
			timout = setTimeout(() => {
				(updateState && nextStep) && updateState(nextStep?.step, nextStep?.status)
				clearTimeout(timout)
			}, nextStep?.delay)
		}

		return () => {
			clearTimeout(timout)
		}
	}, [active])

	if(!active && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active,
		})}>
			{children}
		</div>
	)
}