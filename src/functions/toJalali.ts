import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function DateConverter(miladiDate: any) {
	return `${moment(miladiDate).format("jYYYY/jMM/jDD")}`;
}
