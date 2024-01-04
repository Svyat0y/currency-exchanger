import styles from './network.module.scss'
import Image from "next/image"
import {FC} from "react"

type ItemProps = {
	el: Record<string, string>
	icon: string
	active: boolean
	handleNetwork: (value: string) => void
}

export const Item: FC<ItemProps> = ({el, icon, active, handleNetwork}) => {
	return (
		<div key={el.value} className={styles.networkItem} onClick={() => handleNetwork(el.value)}>
			<button className={styles.left}>
				{el.icon ? <Image src={el.icon} alt='' width={16} height={16}/> : ''}
				{el.label}
			</button>
			{
				active &&
        <span className={styles.iconWrapper}>
					<Image src={icon} alt='' width={16} height={16}/>
				</span>
			}
		</div>
	)
}