export const formatINR = (value) => {
    const num = Number(value ?? 0);

    if (num === 0) return "0";

    return `${num.toLocaleString("en-IN")}`;
};