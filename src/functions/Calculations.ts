export default function wordExpression(
    valueInput: number | string,
    english: boolean,
    mode: "simple" | "complete" = "complete"
) {
    const value = Number(valueInput);
    console.log(valueInput);
    if (typeof value === "number") {
        if (english) {
            if (value >= 1e15)
                return {
                    value: `${Math.round((value / 1e15) * 1000) / 1000}P`,
                    changed: true,
                };
            if (value >= 1e12)
                return {
                    value: `${Math.round((value / 1e12) * 1000) / 1000}T`,
                    changed: true,
                };
            if (value >= 1e9)
                return {
                    value: `${Math.round((value / 1e9) * 1000) / 1000}G`,
                    changed: true,
                };
            if (value >= 1e6)
                return {
                    value: `${Math.round((value / 1e6) * 1000) / 1000}M`,
                    changed: true,
                };
            if (value >= 1e3)
                return {
                    value: `${Math.round((value / 1e3) * 1000) / 1000}k`,
                    changed: true,
                };
            return { value: valueInput, changed: true };
        } else {
            if (mode === "complete") {
                let res = "";
                let found = false;
                if (Math.round(value / 1e15) !== 0) {
                    res += `${Math.round(value / 1e15)} بیلیارد`;
                    found = true;
                }
                if (Math.round(value / 1e12) !== 0) {
                    res += `${Math.round(value / 1e12)} بیلیون`;
                    found = true;
                }
                if (Math.round(value / 1e9) % 1000 !== 0) {
                    if (found) res += " و ";
                    res += `${Math.round(value / 1e9) % 1000} میلیارد`;
                    found = true;
                }
                if (Math.round(value / 1e6) % 1000 !== 0) {
                    if (found) res += " و ";
                    res += `${Math.round(value / 1e6) % 1000} میلیون`;
                    found = true;
                }
                if (Math.round(value / 1e3) % 1000 !== 0) {
                    if (found) res += " و ";
                    res += `${Math.round(value / 1e3) % 1000} هزار`;
                    found = true;
                }
                if (Math.round(value) % 1000 !== 0) {
                    if (found) res += " و ";
                    res += `${Math.round(value) % 1000}`;
                }

                return { value: res, changed: true };
            } else {
                let res = "";
                if (Math.round(value / 1e12) !== 0) {
                    res += `${Math.round(value / 1e12)} تیلیارد`;
                    return { value: res, changed: true };
                }
                if (Math.round(value / 1e9) % 1000 !== 0) {
                    res += `${Math.round(value / 1e9) % 1000} میلیارد`;
                    return { value: res, changed: true };
                }
                if (Math.round(value / 1e6) % 1000 !== 0) {
                    res += `${Math.round(value / 1e6) % 1000} میلیون`;
                    return { value: res, changed: true };
                }
                if (Math.round(value / 1e3) % 1000 !== 0) {
                    res += `${Math.round(value / 1e3) % 1000} هزار`;
                    return { value: res, changed: true };
                }
                if (Math.round(value) % 1000 !== 0) {
                    res += `${Math.round(value) % 1000}`;
                    return { value: res, changed: true };
                }

                return { value: res, changed: true };
            }
        }
    }
    return { value: valueInput, changed: false };
}
