import React, {useEffect, useState} from 'react'
import {DinoGame} from "@/components/dinoGame/dinoGame"


export default function DinoGamePage() {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<>
			{isClient ? <DinoGame/> : ''}
		</>
	)
}
