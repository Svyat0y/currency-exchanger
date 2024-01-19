import styles from './tRexGame.module.scss'
import {GradientBorder} from "@/components/gradientBorder"
import {useEffect, useRef, useState} from "react"
import Image from "next/image"

const dinoImg = '/media/dinoBg.jpg'

export const TRexGame = () => {
	const [isFrameLoaded, setIsFrameLoaded] = useState(false)
	const nodeRef = useRef<HTMLDivElement | null>(null)
	const iFrameRef = useRef<HTMLIFrameElement | null>(null)

	const onLoadFrame = () => {
		setIsFrameLoaded(true)
	}

	useEffect(() => {
		if(iFrameRef.current) {
			iFrameRef.current?.focus()
		}
	},[isFrameLoaded])

	return (
		<div className={styles.wrapper}>
			<h5 className={styles.title}>Play to Win</h5>
			<div className={styles.borderWrapper}>
				<GradientBorder active={false}/>
				<div ref={nodeRef} className={styles.content} onClick={onLoadFrame}>

					{isFrameLoaded
						?	<iframe
							ref={iFrameRef}
							src="/iframe-dino-game"
							title="Dino Game"
							width="100%"
							height="100%"
							frameBorder="0"
							scrolling="no"/>
						: <div className={styles.btnWrapper}>
							<div className={styles.dinoBgWrapper}>
								<Image src={dinoImg} alt={'dinoBackground'} width={600} height={396}/>
							</div>
							<button
								className={styles.playBtn}>
								Play
							</button>
						</div>}

				</div>
			</div>
		</div>
	)
}