import classNames from "classnames"
import styles from './dynamicScreen.module.scss'
import {FC, ReactNode, useEffect} from "react"
import {useMount} from "@/hooks/useMount"
import {useContextStatus} from "@/context/statusContext"
import {useExchangeContext} from "@/context/exchangeContext"
import {RATES} from "@/components/exchangerCard/cardContent/exchangeCard/rateSwitcher/rateSwitcher"

type DynamicContentProps = {
	children: ReactNode
	active: boolean
	currentScreen?: boolean
	nextStep?: {step: string, status: string, delay: number}
	isChangeToFixedRate?: boolean
}

export const DynamicContent: FC<DynamicContentProps> = (
	{
		children,
		active,
		currentScreen,
		nextStep,
		isChangeToFixedRate
	}) => {
	const {updateState} = useContextStatus()
	const {setRateState} = useExchangeContext()
	const {mounted} = useMount(active)

	useEffect(() => {
		let timout: any

		if(active && currentScreen) {
			timout = setTimeout(() => {
				(updateState && nextStep) && updateState(nextStep?.step, nextStep?.status)
				if(isChangeToFixedRate) {
					setRateState(RATES.fixed)
					localStorage.setItem('rateState', JSON.stringify(RATES.fixed))
				}
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