import Main from '../components/Main'
//  import Sidebar from '../components/Sidebar'
import Header2 from '../components/Header2'
const styles = {
  container: `w-screen h-screen flex flex-col `,
}

export default function Shop() {
  return (

    <div className={styles.container}>
        <Header2 />
     {/* <Sidebar />  */}
    <Main />
  </div>
   
  )
}
