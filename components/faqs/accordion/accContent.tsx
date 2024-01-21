import styles from './accordion.module.scss'
import classNames from "classnames"
import {FC, useEffect, useRef, useState} from "react"
import {useMount} from "@/hooks/useMount"

type AccContent = {
	text: string
	active: boolean
}

export const AccContent: FC<AccContent> = ({text, active}) => {
	const {mounted} = useMount(active)
	const contentRef = useRef<HTMLParagraphElement | null>(null)
	const [maxHeight, setMaxHeight] = useState('0px')

	useEffect(() => {
		if (active && contentRef?.current) {
			const contentHeight = contentRef?.current?.scrollHeight
			setMaxHeight(`${contentHeight + 40}px`)
		} else {
			setMaxHeight('0px')
		}
	}, [active, contentRef?.current])


	if (!active && !mounted) return null

	return (
		<p className={classNames(styles.accContent, {
			[styles.active]: active && mounted
		})} style={{maxHeight: maxHeight}} ref={contentRef}>
			{text}
		</p>
	)
}