export default function wordExpression(
    value: number | string,
    english: boolean,
    mode: "simple" | "complete" = "complete"
) {
    if (typeof value === "number") {
        if (english) {
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
            return { value: `${value}`, changed: true };
        } else {
            if (mode === "complete") {
                let res = "";
                let found = false;
                if (Math.round(value / 1e12) !== 0) {
                    res += `${Math.round(value / 1e12)} تیلیارد`;
                    found = true;
                }
                if (Math.round(value / 1e9) % 1000 !== 0) {
                    if (found) res += " و ";
                    res += `${Math.round(value / 1e9) % 1000} میلیارد`;
                    found = true;
                }
                console.log("m:", Math.round(value / 1e9) % 1000);
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
    return { value: value, changed: false };
}
