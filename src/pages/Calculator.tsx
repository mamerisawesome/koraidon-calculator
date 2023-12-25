import { ChangeEvent, useMemo, useState } from 'react';
import { twc } from 'react-twc';

import Input from '../components/Input';

import '../App.css';

const Calculator = () => {
  const [values, setValues] = useState({
    totalBill: '',
    consumption: '',
    previousSubmeterBill: '',
    currentSubmeterBill: '',
  });

  const setValueHandler = (key: keyof typeof values) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setValues((prevValues) => ({ ...prevValues, [key]: e.target.value }));
    };
  };

  const { finalValue, priceConsumptionRatio, submeterDifference } = useMemo(() => {
    const priceConsumptionRatio = (Number(values.totalBill) / Number(values.consumption)) || 0;
    const submeterDifference = Number(values.currentSubmeterBill) - Number(values.previousSubmeterBill);
    const computedValue = +priceConsumptionRatio.toFixed(2) * +submeterDifference.toFixed(2);
    const finalValue = +computedValue.toFixed(2);

    return { finalValue, priceConsumptionRatio, submeterDifference };
  }, [values]);

  return (
    <>
      <div>
        <b className="flex">Price and Consumption</b>
        <Input number label="Total Bill" onChange={setValueHandler('totalBill')} value={values.totalBill} />
        <Input number label="Consumption" onChange={setValueHandler('consumption')} value={values.consumption} />
      </div>
      <div>
        <b className="flex">Submeter Readings</b>
        <Input number label="Previous Billing" onChange={setValueHandler('previousSubmeterBill')} value={values.previousSubmeterBill} />
        <Input number label="Current Billing" onChange={setValueHandler('currentSubmeterBill')} value={values.currentSubmeterBill} />
      </div>
      <FinalValueContainer>
        <b>Amount to be Paid</b>
        <p className="mt-1">
          The final bill to pay is <NumberValue>{finalValue}</NumberValue>. This is given that by computation
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
`;

const NumberValue = twc.span`
  px-1
  mx-0.5
  font-bold

  bg-green-800
  text-white
`;