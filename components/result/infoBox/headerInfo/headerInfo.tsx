import styles from './headerInfo.module.scss'
import {useContextStatus} from "@/context/statusContext"
import {StateItem} from "./StateItem"
import {FC} from "react"
import classNames from "classnames"

type HeaderInfoProps = {
	isAllSuccess: boolean
}

export const HeaderInfo:FC<HeaderInfoProps> = ({isAllSuccess}) => {
	const {states} = useContextStatus()


	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: !isAllSuccess
		})}>
			{states?.map((item) => {
				return (
					<StateItem key={item.title} item={item}/>
				)
			})}
		</div>
	)
}