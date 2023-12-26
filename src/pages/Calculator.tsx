import { ChangeEvent, useMemo } from 'react';
import { Tooltip } from 'react-tooltip';
import { twc } from 'react-twc';

import Input from '../components/Input';

import '../App.css';
import ComputationUtil from '../utils/Computation.util';
import useLocalStorage from '../hooks/useLocalStorage';

const DEFAULT_VALUES = {
  totalBill: '',
  consumption: '',
  previousSubmeterReading: '',
  currentSubmeterReading: '',
};

const Calculator = () => {
  const [values, setValues] = useLocalStorage<Record<number | string, string>>('values', DEFAULT_VALUES);

  const setValueHandler = (key: keyof typeof values) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({ ...prevValues, [key]: e.target.value }));
    };
  };

  const { finalValue, priceConsumptionRatio, submeterDifference } = useMemo(
    () => ComputationUtil.computeBilling(values),
    [values],
  );

  return (
    <>
      <div>
        <b className="flex">Price and Consumption</b>
        <Input number label="Total Bill (₱)" onChange={setValueHandler('totalBill')} value={values.totalBill} />
        <Input number label="Consumption (kWh)" onChange={setValueHandler('consumption')} value={values.consumption} />
      </div>
      <div>
        <b className="flex">Submeter Readings</b>
        <Input number label="Previous Reading (kWh)" onChange={setValueHandler('previousSubmeterReading')} value={values.previousSubmeterReading} />
        <Input number label="Current Reading (kWh)" onChange={setValueHandler('currentSubmeterReading')} value={values.currentSubmeterReading} />
      </div>
      <FinalValueContainer>
        <div>
          <b>Amount to be Paid </b>
          <a className="computation-info cursor-pointer">
            ⓘ
          </a>
          <Tooltip anchorSelect=".computation-info" place="top" clickable>
            <p>
              The computation for the final reading is based
              <br />
              on the formula defined
              {' '}
              <a
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/mamerisawesome/koraidon-calculator/blob/main/src/utils/Computation.util.ts"
              >
                  here
              </a>.
              Feel free to create
              <br />
              a pull request if you notice any discrepancies.
            </p>
          </Tooltip>
        </div>
        <p className="mt-1">
          The final bill to pay is ₱ <NumberValue>{finalValue}</NumberValue>. Computed by multiplying the price per consumption of
          {' '}<NumberValue>{priceConsumptionRatio}</NumberValue> (₱ / kWh) to the difference of the sub-meter value of
          {' '}<NumberValue>{submeterDifference}</NumberValue> (kWh).
        </p>
      </FinalValueContainer>
    </>
  )
};

export default Calculator;

const FinalValueContainer = twc.div`
  flex
  flex-col
  items-start
  text-left
`;

const NumberValue = twc.span`
  px-1
  mx-0.5
  font-bold

  bg-green-800
  text-white
`;
