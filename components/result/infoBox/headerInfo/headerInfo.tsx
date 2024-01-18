import styles from './headerInfo.module.scss'
import {useContextStatus} from "@/context/statusContext"
import {StateItem} from "./StateItem"

export const HeaderInfo = () => {
	const {states} = useContextStatus()

	return (
		<div className={styles.wrapper}>
			{states?.map((item) => {
				return (
					<StateItem key={item.title} item={item}/>
				)
			})}
		</div>
	)
}