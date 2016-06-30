$(document).ready(function () {
  console.log('poop');
  $('input').focus();

  var populateCheck = function(e) {
    var value = e.currentTarget.value;
    if (isNaN(value)) { return; } // drop out on invalid or incomplete input

    var fraction = Math.floor(value * 100 % 100);
    // pad with 0 for single pennies
    if (fraction < 10) { fraction = '0' + fraction; }
    $('.pennies').html(fraction);

    var dollars = numberInWords(Math.floor(value));
    $('.dollars').html(dollars);
  }

  var numberInWords = function(num) {
    var result = '';
    var digits = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    var num_array = num.toString().split('').reverse(); // reversing allows support up to $999,999

    // // zero is a special case
    // if (Math.floor(num) === 0) { return 'zero dollars and '; }

    if (num_array.length > 3) { // dealing with thousands
      result = numberInWords(Math.floor(num/1000)) + ' thousand';
      result = result + numberInWords(num%1000);
    }
    if (num_array.length === 3) { // dealing with hundreds
      result = result + ' ' + numberInWords(num_array[2]) + ' hundred ';
      if (num%100 === 0) { // even hundreds.
        result = result;
      } else {
        result = result + ' ' + numberInWords(num%100);
      }
    }
    if (num_array.length === 2) { // dealing with 10s
      // teens are a special case.
      if (10 < num && num < 20) { return teens[num%10]; }
      if (num%10 === 0) { // even 10s
        return tens[Math.floor(num/10)];
      } else {
        return tens[Math.floor(num/10)] + numberInWords(num%10);
      }
    }
    if (num_array.length === 1) { // dealing with single digits
      return ' ' + digits[num];
    }

    return result;
  }

  $('input').keyup(populateCheck);

  // highlight code block with highlight.js
  hljs.initHighlightingOnLoad();
});
