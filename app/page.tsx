import styles from './page.module.scss'
import {Exchanger} from "@/components/exchanger"
import {Container} from "@/components/container"

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Exchanger/>
      </Container>
    </div>
  )
}
