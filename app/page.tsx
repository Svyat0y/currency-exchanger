"use client"

import styles from './page.module.scss'
import {Exchanger} from "@/components/exchanger"
import {Container} from "@/components/container"
import {Result} from "@/components/result"
import {useContextStatus} from "@/context/statusContext"

export default function Home() {
  const {isExchangeStarted} = useContextStatus()

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.content}>
          <Exchanger animStart={isExchangeStarted}/>
          <Result animStart={isExchangeStarted}/>
        </div>
      </Container>
    </div>
  )
}
