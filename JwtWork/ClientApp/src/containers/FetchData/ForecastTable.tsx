import { memo } from 'react';
import type { WeatherState } from 'src/store/weatherSlice';

type ForecastTableProps = Pick<WeatherState, 'forecasts'>;

const ForecastTable = memo<ForecastTableProps>(({ forecasts }: ForecastTableProps) => (
  <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      {forecasts.map((f) => (
        <tr key={f.id}>
          <td>{f.dateFormatted}</td>
          <td>{f.temperatureC}</td>
          <td>{f.temperatureF}</td>
          <td>{f.summary}</td>
        </tr>
      ))}
    </tbody>
  </table>
));

ForecastTable.displayName = 'ForecastTable';

export default ForecastTable;
