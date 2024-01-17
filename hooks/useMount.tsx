import { useEffect, useState } from "react"
import {ANIMATION_TIME} from "@/app/const"


export const useMount = ( animStart: boolean ) => {
	const [mounted, setMounted] = useState(animStart)

	useEffect(() => {
		if (animStart) {
			setMounted(true)
		} else {
			setTimeout(() => {
				setMounted(false)
			}, ANIMATION_TIME)
		}
	}, [animStart, mounted])

	return {
		mounted,
	}
}