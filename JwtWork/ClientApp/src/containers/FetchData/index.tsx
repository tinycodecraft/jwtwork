import Pagination from './Pagination';
import { Spinner } from 'src/fragments';
import ForecastTable from './ForecastTable';
import { useParams } from 'react-router-dom';
import { useEffect, type FunctionComponent } from 'react';
import { useAppSelector, useAppDispatch } from 'src/store';
import { getForecastsAsync,type WeatherState } from 'src/store/weatherSlice';



const FetchData: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { startDateIndex: startDateIndexDefault = '0' } = useParams();
  console.log(`fetching component init with param ${startDateIndexDefault}`)

  const intNextStartDateIndex = parseInt(startDateIndexDefault, 10);  
  const weatherstate = useAppSelector<WeatherState>((state)=> state.weather);
  const isLoading = (weatherstate && weatherstate.isLoading ) ?? true;
  const startDateIndex = (weatherstate && weatherstate.startDateIndex ) ?? -1;
  const forecasts = (weatherstate && weatherstate.forecasts) ?? [];


  console.log(`all constants should be ready for fetch data with state ${startDateIndex}`)

  useEffect(() => {
    if (startDateIndex !== intNextStartDateIndex) {
      dispatch(getForecastsAsync(intNextStartDateIndex));
    }
  }, [dispatch, startDateIndex, intNextStartDateIndex]);

  return (
    <div className="section">
      <div className="container">
        <h3 className="title is-3">
          Fetch Data
        </h3>
        <div className="box container-box">
          <h3 className="title is-4">
            Weather forecast
          </h3>
          <h5 className="subtitle is-5">
            This component demonstrates fetching data from the server and working with URL parameters.
          </h5>
          <Spinner isLoading={isLoading ?? true} />
          <ForecastTable forecasts={forecasts} />
          <Pagination startDateIndex={startDateIndex} />
        </div>
      </div>
    </div>
  );
};

export default FetchData;
