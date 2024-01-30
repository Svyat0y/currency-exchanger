import classNames from "classnames"
import styles from "@/components/result/infoBox/headerInfo/headerInfo.module.scss"
import {Icon} from "@/components/icon"
import {FC} from "react";
import {STATUS, StatusKey, SUCCESS_STATUSES} from "@/context/statusContext"

type StateItemProps = {
	item: {
		id: number
		title: string
		state: string
	}
}

const STATE_ICONS = {
	depositing: 'BOX_ARROW_DOWN',
	confirming: 'STOPWATCH',
	exchanging: 'ARROW_REPEAT',
}

export const StateItem: FC<StateItemProps> = ({item}) => {
	const title = item.state === STATUS.success ? SUCCESS_STATUSES[item.title as StatusKey] : item.title;


	return (
		<div key={item.title} className={classNames(styles.stateItem, {
			[styles[item.state]]: item.state,
		})}>
			<span className={styles.iconWrapper}>
				<Icon type={item.state === STATUS.success ? 'CHECK' : STATE_ICONS[item.title as keyof typeof STATE_ICONS]} className={styles.icon}/>
			</span>
			<span>{title}</span>
		</div>
	)
}