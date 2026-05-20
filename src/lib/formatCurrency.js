const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const formatIDR = (value) => formatter.format(Number(value) || 0);
