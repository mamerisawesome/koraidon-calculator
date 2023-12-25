export const computeBilling = (values: Record<number | string, string>) => {
  const priceConsumptionRatio = (Number(values.totalBill) / Number(values.consumption)) || 0;
  const submeterDifference = Number(values.currentSubmeterBill) - Number(values.previousSubmeterBill);
  const computedValue = +priceConsumptionRatio.toFixed(2) * +submeterDifference.toFixed(2);
  const finalValue = +computedValue.toFixed(2);

  return { finalValue, priceConsumptionRatio, submeterDifference };
};

export default {
  computeBilling,
};
