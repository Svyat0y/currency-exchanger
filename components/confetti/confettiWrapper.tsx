import styles from './confettiWrapper.module.scss'
import Confetti from "react-confetti"
import {FC} from "react"
import {useMount} from "@/hooks/useMount"
import classNames from "classnames"

type ConfettiWrapperProps = {
	active: boolean
	numberOfPieces?: number
	gravity?: number
	width?: number
	height?: number
	className?: string
}

export const ConfettiWrapper: FC<ConfettiWrapperProps> = (
	{
		active,
		numberOfPieces = 50,
		gravity = 0.05,
		width = 400,
		height = 500,
		className,
	}) => {
	const {mounted} = useMount(active)

	if(!active && !mounted) return null

	return (
		<div className={classNames(styles.wrapper, className, {
			[styles.active]: active
		})}>
			<Confetti recycle={false} numberOfPieces={numberOfPieces} gravity={gravity} width={width} height={height}/>
		</div>
	)
}