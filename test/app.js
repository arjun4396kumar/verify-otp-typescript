// const OTPVerification = require("../dist/cjs");

// const otp_tag = OTPVerification.otpTag({
//     length: 6,
//     id: 'id',
//     classes: ['a', 'b']
// });
const inputObj = {
    size:6,
    id:'otp-container',
    classes:['box']
}
const otp = new OTPVerification(inputObj)
console.log('otp',otp)
// const otpContainer = document.getElementById('otp-container');
 otp.createOTPInputFields()
// const ids = OTPVerification.bindEvent(6)