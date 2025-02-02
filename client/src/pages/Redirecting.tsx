import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useURlService from 'services/url.service'

const Redirecting: React.FC = () => {
  const urlID = useParams().urlID as string
  const { loadURL } = useURlService()
  const [notFound, setNotFound] = useState<boolean | undefined>(false)

  React.useEffect(() => {

    async function load() {
      const url = await loadURL(urlID)
      if (!url) setNotFound(true)
      else {
        window.location.href = url; // Redirects the user to the external }
      }
    }
    load()

  }, [urlID])




  if (!urlID || (notFound === true)) return <div>
    <h1>404 | not found</h1>
    <p>we're sorry we couldn't find the short url you're looking for</p>
  </div>
  return (
    <div>Redirecting</div>
  )
}

export default Redirecting