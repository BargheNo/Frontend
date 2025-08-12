export default function toFarsiNumber(input: string | number): string {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input?.toString()?.replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  }
  