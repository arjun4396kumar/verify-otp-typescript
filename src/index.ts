type OtpTagInput = {
  size: number
  classes?: string[],
  id: string
}

class OTPVerification {
  input_length: number = 6;
  id: string = '';
  classes: string[]
  constructor(inputObject: OtpTagInput) {
    this.input_length = inputObject.size || 6;
    this.id = inputObject.id || '';
    this.classes = inputObject.classes || [];
  }
  /**
   * @description
   * This function will create input fields as per size of the otp length like 4-digit or 6-digit
   */
  createOTPInputFields() {
    const length = this.input_length
    let tag = `<div class=otp-input> <form class="otp_container">`;
    for (let i = 1; i <= length; i++) {
      tag += `<input type="text" id=box_${i} maxlength="1" onkeypress='return event.charCode >= 48 && event.charCode <= 57' class="${this.classes.join(' ')}">`;
    }
    tag += '</form></div>';
    const opts = document.getElementById(this.id) as HTMLElement;
    if (opts) {
      opts.innerHTML = tag
      this.bindEvent(this.input_length)
    }
  }

  /**
   * 
   * @param size 
   * @description
   * This function will take size of otp as argument and will bind the events accordingly
   */
  bindEvent(size: number) {
    const length = size;
    var count = 1;
    for (let i = 1; i <= length; i++) {
      let ele = document.getElementById('box_' + i) as HTMLElement;
      ele.addEventListener('click', function (e: any) {
        let input = document.getElementById(e.target.id) as HTMLInputElement;
        if (input) {
          input.focus()
          input.select()
        }
      })
    }

    for (let i = 1; i <= length; i++) {
      let ele = document.getElementById('box_' + i) as HTMLElement;
      ele.addEventListener('keyup', function (e: any) {  // adding keyup event for delete and update input value
        let _id = e.target.id.split('_');
        let _indexF = Number(_id[1]) + 1;
        let _indexB = Number(_id[1]) - 1;
        if (e.target.id == 'box_1' && e.key == 'Backspace') {
          _indexF = 1
        }
        if (_indexF <= length) {
          let input_id = 'box_' + _indexF
          let input = document.getElementById(input_id) as HTMLInputElement;
          if (input) {
            count++
            input.focus()
          }
        }
        if (e.key == 'Backspace' && _indexB <= length) { // cursoer will move backward with clearing input fields
          let input_id = 'box_' + _indexB
          let input = document.getElementById(input_id) as HTMLInputElement;
          if (input) {
            input.focus()
            input.select()
          }
        }
      })

      ele.addEventListener('blur', function (e: any) {
        let input_id = e.target.id
        let input = document.getElementById(input_id) as HTMLInputElement;
        if (!input.value) {
          input.classList.add('invalid')
        } else {
          input.classList.remove('invalid')
        }
      })
    }
  }

  /**
   * 
   * @returns String
   * @description
   * This function will return otp value after input
   */
  getOTPValue() {
    let otp_array = [];
    for (let i = 1; i <= this.input_length; i++) {
      let input = document.getElementById('box_' + i) as HTMLInputElement;
      if (input) {
        otp_array.push(input.value)
      }
    }
    return otp_array.length ? otp_array.join('') : undefined;
  }

}

module.exports = OTPVerification;

