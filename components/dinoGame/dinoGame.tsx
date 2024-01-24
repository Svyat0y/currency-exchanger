import React, {useEffect, useState} from "react"
import styles from './dinoGame.module.scss'
// @ts-ignore
import ChromeDinoGame from 'react-chrome-dino'
import Image from "next/image"
const dinoImg = '/media/dinoBg.jpg'

export const DinoGame = () => {
	const [isGameStarted, setIsGameStarted] = useState(false)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === " ") {
				event.preventDefault()
				setIsGameStarted(true)
			}
		}
		window.addEventListener("keydown", handleKeyDown)

		const clickableElement = document.getElementById('clickableForMobiles')

		if (clickableElement) {
			clickableElement.addEventListener('touchstart', () => {
				clickableElement.dispatchEvent(new KeyboardEvent('keydown', {
					key: ' ',
					code: 'Space',
					keyCode: 32,
					which: 32,
					bubbles: true,
				} ))
			})
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			if (clickableElement) {
				clickableElement.removeEventListener('click', () => {
					const spaceKeyEvent = new KeyboardEvent('keydown', {
						key: ' ',
						code: 'Space',
						keyCode: 32,
						which: 32,
						bubbles: true,
					})

					document.dispatchEvent(spaceKeyEvent)
				})
			}
		}
	}, [])

	return (
		<div id='clickableForMobiles' className={styles.wrapper}>
			{!isGameStarted &&
        <div className={styles.contentWrapper}>
          <div className={styles.imgWrapper}>
            <Image src={dinoImg} alt={'dinoBackground'} width={496} height={396}/>
          </div>
          <span className={styles.infoDesc}>
							press Space to start
					</span>
        </div>}
			<ChromeDinoGame/>
		</div>
	)
}