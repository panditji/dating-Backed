type IGenerateOtp = (size: number) => number;

const generateOtp: IGenerateOtp = (size) => {
    const val = Math.floor(1000 + Math.random() * 9000);
    return val;
}

export { generateOtp }