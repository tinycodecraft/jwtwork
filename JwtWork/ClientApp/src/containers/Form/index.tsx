import type { FunctionComponent } from 'react';
import SelectFormGroup from './SelectFormGroup';
import {BuCounterFormGroup} from './CounterFormGroup';
import {BuCheckboxFormGroup} from './CheckboxFormGroup';

const Form: FunctionComponent = () => (
  <div className="section">
    <div className="container">
      <h3 className="title is-3">Form Controls</h3>
      <div className="box container-box">
        <div className="columns form-columns">
          <BuCounterFormGroup />
          <SelectFormGroup />
          <BuCheckboxFormGroup />
        </div>
      </div>
    </div>
  </div>
);

export default Form;
