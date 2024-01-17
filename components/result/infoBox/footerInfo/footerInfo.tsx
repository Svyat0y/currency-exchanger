import styles from './footerInfo.module.scss'
import {Icon} from "@/components/icon"
import classNames from "classnames"
import {FC} from "react"
import {useMount} from "@/hooks/useMount"

type FooterInfoProps = {
	active: boolean
}

const LINKS = [
	{label: 'Transaction Details', icon: 'FILE_EARMARK_MEDICAL'},
	{label: 'Exchange Logs', icon: 'CODE_SLASH'},
	{label: 'FAQs', icon: 'QUESTION_CIRCLE'},
]

export const FooterInfo:FC<FooterInfoProps> = ({active}) => {

	const {mounted} = useMount(active)

	if(!active && !mounted) return null
	
	return (
		<div className={classNames(styles.wrapper, {
			[styles.active]: active
		})}>
			{LINKS.map(item => {
				return (
					<button className={styles.buttonWrapper} key={item.label}>
						<span className={styles.groupLeft}>
							<Icon type={item.icon}/>
							{item.label}
						</span>
						<Icon type='ARROW_RIGHT_UP'/>
					</button>
				)
			})}
		</div>
	)
}