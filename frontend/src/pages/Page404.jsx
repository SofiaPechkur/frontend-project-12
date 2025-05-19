import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import img2 from '../assets/img2.svg'
import { routes } from '../routes/routes'

const Page404 = () => {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <Image alt="404" className="h-25" fluid src={img2} />
      <h1 className="h4 text-muted">{t('page404.title')}</h1>
      <p className="text-muted">
        {t('page404.goTo')}
        <Link to={routes.chat}>{t('page404.toMainPage')}</Link>
      </p>
    </div>
  )
}

export default Page404
