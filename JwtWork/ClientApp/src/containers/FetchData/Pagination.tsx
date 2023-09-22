import { Link } from 'react-router-dom';
import type { WeatherState } from 'src/fragments/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PaginationProps = Pick<WeatherState, 'startDateIndex'>;

const Pagination = ({ startDateIndex = 0 }: PaginationProps) => (
  <p className="buttons pagination-group">
    <Link
      className="button is-info"
      to={`/fetch/${startDateIndex - 5}`}
    >
      <FontAwesomeIcon icon="angle-double-left" />
    </Link>
    <Link
      className="button is-info"
      to={`/fetch/${startDateIndex + 5}`}
    >
      <FontAwesomeIcon icon="angle-double-right" />
    </Link>
  </p>
);

Pagination.displayName = 'Pagination';

export default Pagination;