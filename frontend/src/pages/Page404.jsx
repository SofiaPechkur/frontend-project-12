import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import img2 from '../assets/img2.svg'

const Page404 = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <Image alt="404" className="h-25" fluid src={img2} />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.goTo')}
        <Link to="/">{t('notFound.toMainPage')}</Link>
      </p>
    </div>
  )
}

export default Page404
