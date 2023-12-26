export const computeBilling = (values: Record<number | string, string>) => {
  const priceConsumptionRatio = +((Number(values.totalBill) / Number(values.consumption)) || 0).toFixed(2);
  const submeterDifference = +(Number(values.currentSubmeterReading) - Number(values.previousSubmeterReading)).toFixed(2);
  const computedValue = +priceConsumptionRatio * +submeterDifference;
  const finalValue = +computedValue.toFixed(2);

  return { finalValue, priceConsumptionRatio, submeterDifference };
};

export default {
  computeBilling,
};
