import styles from './page.module.css'
import {Exchanger} from "@/components/exchanger"
import {Layout} from "@/components/layout"

export default function Home() {
  return (
    <main className={styles.main}>
      <Layout>
        <Exchanger/>
      </Layout>
    </main>
  )
}
