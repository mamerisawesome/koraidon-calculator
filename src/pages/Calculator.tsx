import { ChangeEvent, useMemo } from 'react';
import { twc } from 'react-twc';

import Input from '../components/Input';

import '../App.css';
import ComputationUtil from '../utils/Computation.util';
import useLocalStorage from '../hooks/useLocalStorage';

const DEFAULT_VALUES = {
  totalBill: '',
  consumption: '',
  previousSubmeterBill: '',
  currentSubmeterBill: '',
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
        <Input number label="Previous Billing (₱)" onChange={setValueHandler('previousSubmeterBill')} value={values.previousSubmeterBill} />
        <Input number label="Current Billing (₱)" onChange={setValueHandler('currentSubmeterBill')} value={values.currentSubmeterBill} />
      </div>
      <FinalValueContainer>
        <b>Amount to be Paid</b>
        <p className="mt-1">
          The final bill to pay is ₱ <NumberValue>{finalValue}</NumberValue>. This is given that by computation
          where we multiply the price per consumption of
          {' '}<NumberValue>{priceConsumptionRatio}</NumberValue> to the difference of the sub-meter value of
          {' '}<NumberValue>{submeterDifference}</NumberValue>.
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
