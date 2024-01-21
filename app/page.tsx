"use client"

import styles from './page.module.scss'
import {Exchanger} from "@/components/exchanger"
import {Container} from "@/components/container"
import {Result} from "@/components/result"
import {STATUS, useContextStatus, WAITING_STATUSES} from "@/context/statusContext"

export default function Home() {
  const {currentStatus, updateState} = useContextStatus()

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.content}>
          <div className={styles.testStates} style={{width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', top: '0', gap: '10px', zIndex: '10000', left: '0', right: '0'}}>
            <button style={{border: '1px solid green'}}
                    onClick={() => updateState && updateState(WAITING_STATUSES.deposit, STATUS.loading)}>deposit
            </button>
            {' '}
            <button style={{border: '1px solid green'}}
                    onClick={() => updateState && updateState(WAITING_STATUSES.confirmations, STATUS.loading)}>confirmations
            </button>
            {' '}
            <button style={{border: '1px solid green'}}
                    onClick={() => updateState && updateState(WAITING_STATUSES.exchange, STATUS.loading)}>
              exchange
            </button>
            {' '}
            <button style={{border: '1px solid green'}}
                    onClick={() => updateState && updateState(WAITING_STATUSES.exchange, STATUS.success)}>
              exchange success
            </button>
            {' '}
            <button style={{border: '1px solid green'}}
                    onClick={() => updateState && updateState(WAITING_STATUSES.resetting, STATUS.reset)}>
              reset all
            </button>
          </div>
          <Exchanger animStart={!!currentStatus}/>
          <Result animStart={!!currentStatus}/>
        </div>
      </Container>
    </div>
  )
}
