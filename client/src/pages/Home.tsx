import Banner from 'components/banner/Banner'
import UrlForm from 'components/urlForm/UrlForm'
import React from 'react'
import { style } from './style'
import useGetStateFromStore from 'hooks/getState'
import QrCode from 'components/QrCode/QrCode'

const Home: React.FC = () => {
  const classes = style()
  const shortenedUrl: string = useGetStateFromStore("url", "shortenedUrl")

  return (
    <div className='page-wrapper'>
      <Banner />
      <div className={classes.formWrapper}>
        <UrlForm />
        {
          shortenedUrl &&
          <QrCode value={shortenedUrl} />
        }
      </div>

    </div>

  )
}

export default Home