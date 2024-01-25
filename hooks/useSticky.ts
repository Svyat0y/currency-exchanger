import {useEffect, useRef, useState} from "react"

export function useSticky<Target extends HTMLElement>(parentRef: any, customOffset = 0) {
	const ref = useRef<Target>(null)
	const [isSticky, setIsSticky] = useState(false)

	const handleScroll = () => {
		if (!ref.current || !parentRef.current) {
			return
		}

		const parentTop = parentRef.current.getBoundingClientRect().top
		const elementTop = ref.current.getBoundingClientRect().top
		const offset = elementTop - parentTop

		setIsSticky(offset <= customOffset)
	}

	useEffect(() => {
		const parent = parentRef.current

		parent?.addEventListener('scroll', handleScroll)

		return () => {
			parent?.removeEventListener('scroll', handleScroll)
		};
	}, [parentRef])

	return { isSticky, ref }
}