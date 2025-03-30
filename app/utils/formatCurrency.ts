/**
 * Định dạng số thành tiền tệ
 * @param amount Số tiền cần định dạng
 * @param currency Loại tiền tệ (mặc định là USD)
 * @param locale Định dạng ngôn ngữ (mặc định là en-US)
 * @returns Chuỗi đã định dạng
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'USD', 
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
}; 