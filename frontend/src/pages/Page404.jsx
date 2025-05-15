import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import img2 from '../assets/img2.svg';

const Page404 = () => {
  return (
    <div className="text-center">
      <Image alt='404' className="h-25" fluid src={img2} />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        <Link to="/">на главную страницу</Link>
      </p>
    </div>
  );
};

export default Page404;