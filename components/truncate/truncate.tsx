import styles from './truncate.module.scss'
import classNames from "classnames"
import {FC} from "react"

type TruncateProps = {
	text: string
	className: string
	withoutTruncate?: boolean
}

export const Truncate: FC<TruncateProps> = ({text ,className, withoutTruncate = false}) => {
	return (
		<div className={classNames(styles.wrapper, className)}>
			<div className={styles.truncateWrapper}>
				<span className={`${withoutTruncate ? '' : 'truncate'}`}>{text}</span>
			</div>
			{!withoutTruncate && <span>{String(text).slice(-3)}</span>}
		</div>
	)
}