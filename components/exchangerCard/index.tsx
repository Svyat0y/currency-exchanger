"use client"

import {FC, useState} from "react"
import styles from './exchangeCard.module.scss'
import classNames from "classnames"
import {CustomButton} from "@/components/buttons/customButton"
import {Input} from "@/components/input"
import {Icon} from "@/components/icon"
import {TooltipTrigger} from "@/components/tooltipTrigger/tooltipTrigger"
import {TooltipFee} from "./tooltipFee"

const tether = 'icons/tether.svg'

type ExchangerCardProps = {
	cardTitle: string
	active: boolean
	isTriggerTooltip?: boolean
}

export const ExchangerCard: FC<ExchangerCardProps> = (
	{
		active,
		cardTitle,
		isTriggerTooltip,
	}) => {
	const [inputState, setInputState] = useState('')
	const [isLocked, setIsLocked] = useState(false)

	const handleInput = (value: string) => {
		let newText = value.replace(/[^0-9]/g, '')
		setInputState(newText)
	}

	return (
		<div className={styles.wrapper}>
			<span className={styles.border}></span>
			<div
				className={classNames(styles.gradientBlock, {
					[styles.active]: active
				})}>
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<span className={styles.titleDesc}>{cardTitle}</span>
					<CustomButton text='usdt' icon={tether}/>
				</div>
				<div className={styles.inputWrapper}>
					{/*<span className={styles.border}></span>*/}
					<Input
						id='count'
						value={inputState}
						handleChangeInput={handleInput}
						placeholder='Enter amount'
						border={false}
					/>
					{isTriggerTooltip &&
            <TooltipTrigger
              className={styles.lockIcon}
	            tag='btn'
	            setIsLocked={setIsLocked}
	            isLocked={isLocked}
	            tooltipContent={<TooltipFee isLocked={isLocked} isTriggerTooltip={isTriggerTooltip}/>}>
              <Icon type={isLocked ? 'LOCK_GREEN' : 'LOCK_GRAY'}/>
            </TooltipTrigger>
					}
				</div>
			</div>
		</div>
	)
}