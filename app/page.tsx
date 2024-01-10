import styles from './page.module.scss'
import {Exchanger} from "@/components/exchanger"

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Exchanger/>
    </div>
  )
}
