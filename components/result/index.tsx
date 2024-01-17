"use client"

import styles from './result.module.scss'
import {InfoBox} from "./infoBox/infoBox"
import {InteractionBox} from "./interactioneBox/interactionBox"
import classNames from "classnames"
import {useMount} from "@/hooks/useMount"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext";
export const Result = ({animStart}: {animStart: boolean}) => {
	const {states} = useContextStatus()
	const isConfirmStatus = states.find(obj => obj.title === WAITING_STATUSES.confirmations)
	const isConfirmationLoading = isConfirmStatus?.state === STATUS.loading
	const {mounted} = useMount(animStart)

	if(!animStart && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, {
			[styles.animStart]: animStart && mounted,
		})}>
			<InfoBox isConfirmationLoading={isConfirmationLoading}/>
			<InteractionBox isConfirmationLoading={isConfirmationLoading}/>
		</div>
	)
}