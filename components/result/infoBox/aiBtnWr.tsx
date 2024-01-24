import styles from './infoBox.module.scss'
import classNames from "classnames"
import {IconButton} from "@/components/buttons/iconButton/iconButton"
import {FC} from "react"
import {useMount} from "@/hooks/useMount"

type AiBtnWr = {
	handleOpenRightBox: () => void
	active: boolean
}

export const AiBtnWr: FC<AiBtnWr> = ({handleOpenRightBox, active = true}) => {
	const {mounted} = useMount(active)

	if(!active && !mounted) return null

	return (
		<IconButton onClick={handleOpenRightBox} className={classNames(styles.aiBtn, {
			[styles.active]: active && mounted,
		})} icon='STARS' active={false}/>
	)
}