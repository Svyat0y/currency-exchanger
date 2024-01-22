"use client"

import styles from './page.module.scss'
import {Exchanger} from "@/components/exchanger"
import {Container} from "@/components/container"
import {Result} from "@/components/result"
import {useContextStatus} from "@/context/statusContext"

export default function Home() {
  const {currentStatus} = useContextStatus()

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.content}>
          <Exchanger animStart={!!currentStatus}/>
          <Result animStart={!!currentStatus}/>
        </div>
      </Container>
    </div>
  )
}
