import styles from './page.module.css'
import {Exchanger} from "@/components/exchanger"
import {Layout} from "@/components/layout"
import {Header} from "@/components/header";

export default function Home() {
  return (
    <>
      <Header/>
      <main className={styles.main}>
        <Layout>
          <Exchanger/>
        </Layout>
      </main>
    </>
  )
}
