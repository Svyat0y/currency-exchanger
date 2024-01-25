import styles from './dotLoader.module.scss'
import classNames from "classnames"

export const DotLoader = ({className}: {className?: string}) => {
	return (
		<div className={classNames(styles.wrapper, className)}>
			<span className={styles.dot}></span>
			<span className={styles.dot}></span>
			<span className={styles.dot}></span>
		</div>
	)
}