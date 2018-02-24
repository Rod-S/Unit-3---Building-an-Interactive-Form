//focus Basic Info - Name: on page load
document.getElementById('name').focus();

//initial page load to hide job role text input until conditions met
$('#other-title').hide();

//conditional on select option change to show or hide job role text input
$('#title').change(function() {
  if ($('#title option:selected').val()=='other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//initial page laod to hide t-shirt color until conditions met
$('#colors-js-puns').hide();

//T-SHIRT INFO

$('#design').change(function() {
  if ($('#design').val()=='js puns') {
    $('#colors-js-puns').show();
    $('#color').val('');
    $('.jsPuns').show();
    $('.heartJs').hide();
  } else if ($('#design').val()=='heart js') {
    $('#colors-js-puns').show();
    $('#color').val('');
    $('.jsPuns').hide();
    $('.heartJs').show();
  } else {
    $('#colors-js-puns').hide();
  }
});

//REGISTER FOR ACTIVITIES

$('input:checkbox').on('click', function () {
  let $this = $(this);
  let isChecked = $this.is(':checked');
  if ($this.is('input:checkbox[name="js-frameworks"]')) {
    if ($('input:checkbox[name="js-frameworks"]:checked')) {
      $('input:checkbox[name="express"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="express"]')) {
    if ($('input:checkbox[name="express"]:checked')) {
      $('input:checkbox[name="js-frameworks"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="js-libs"]')) {
    if ($('input:checkbox[name="js-libs"]:checked')) {
      $('input:checkbox[name="node"]').prop('disabled', isChecked ? true : false);
    }
  }
  else if ($this.is('input:checkbox[name="node"]')) {
    if ($('input:checkbox[name="node"]:checked')) {
      $('input:checkbox[name="js-libs"]').prop('disabled', isChecked ? true : false);
    }
  }
});

//run tallyCost() on checkbox clicks
$("input[type=checkbox]").change(function() {
  runningTotal();
});

//tally up the cost of checked activities
const runningTotal = () => {
    //start cost count at $0
    var total = 0;
    $("input[type=checkbox]:checked").each(function() {
      total += parseInt($(this).attr('val'));
    });
  $('#activityTotal').remove();
  $('.activities').append('<div id=activityTotal>Total $' + total + '</div>');
};

//PAYMENT INFO

const $creditCard = $('.credit-card');
const $paypal = $('#credit-card').next();
const $bitcoin = $('#credit-card').next().next();

//initial payment selection
$('#payment option[value="credit card"]').prop('selected', true);
$paypal.hide();
$bitcoin.hide();


  $('#payment').change(function() {
    const val = $(this).val();
    if (val === 'paypal') {
        $bitcoin.hide();
        $creditCard.hide();
        $paypal.show();
    } else if (val === 'bitcoin') {
        $bitcoin.show();
        $creditCard.hide();
        $paypal.hide();
    } else if (val === 'credit card') {
        $bitcoin.hide();
        $creditCard.show();
        $paypal.hide();
    } else {
        $bitcoin.hide();
        $creditCard.hide();
        $paypal.hide();
    }
  });

//FORM VALIDATION

$('form').submit(function (event) {
  const validName = () => {
    if ($('#name').val() === '') {
      event.preventDefault();
      $('.name-error').remove();
      $('#name').addClass('error');
      $('#name').before('<p class=name-error>Please enter a name.</p>');
      $('p').addClass('error-text');
      $('html,body').scrollTop(0);
    } else {
      $('p').remove('.name-error');
      $('#name').removeClass('error');
    }
  };
  validName();

  const validEmail = (inputText) => {
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputText.match(email_regex)) {
      event.preventDefault();
      $('.email-error').remove();
      $('#mail').addClass('error');
      $('#mail').before('<p class=email-error>Please enter a valid email address.</p>');
      $('p').addClass('error-text');
      $('html,body').scrollTop(0);
    } else {
      $('p').remove('.email-error');
      $('#mail').removeClass('error');
    }
  };
  validEmail($('#mail').val());

  const activityChecked = (checked) => {
    if (checked) {
      event.preventDefault();
      $('.activity-error').remove();
      $('.activities legend').before('<p class=activity-error>Please check at least one activity.</p>');
      $('.activities legend').css('margin-bottom', '1px');
      $('.activity-error').addClass('error-text');
    } else {
      $('.activities legend').css('margin-bottom', '22.5px');
      $('p').remove('.activity-error');
    }
  }
  activityChecked($('input:checked').length<1);

  const creditCheck = () => {
    const cardNumber = $('#cc-num').val();
    const cardNumberValid = (cc) => {
      if (cc == '') {
        $('.cc-blank-error').remove();
        $('.cc-length-error').remove();
        $('.cc-number-error').remove();
        $('.credit-card').before('<p class=cc-blank-error>Please enter a Card Number.</p>')
        $('.cc-blank-error').addClass('error-text');
        $('#cc-num').addClass('error');
      } else if (cardNumber.match(/^\d+$/)) {
        if ( cc.length < 13 || cc.length > 16 ) {
          $('.cc-blank-error').remove();
          $('.cc-length-error').remove();
          $('.cc-number-error').remove();
          $('.credit-card').before('<p class=cc-length-error>Card Number must be between 13 and 16 digits long.</p>')
          $('.cc-length-error').addClass('error-text');
          $('#cc-num').addClass('error');
        } else if (cc.length >= 13 && cc.length <= 16) {
          $('.cc-blank-error').remove();
          $('.cc-length-error').remove();
          $('.cc-number-error').remove();
          $('#cc-num').removeClass('error');
        }
      } else if (!cardNumber.match(/^\d+$/)) {
        $('.cc-blank-error').remove();
        $('.cc-length-error').remove();
        $('.cc-number-error').remove();
        $('.credit-card').before('<p class=cc-number-error>Card Number cannot include letters or symbols.')
        $('.cc-number-error').addClass('error-text');
        $('#cc-num').addClass('error');
      }
    }
    cardNumberValid($('#cc-num').val());

    const cardZipValid = () => {
      const zipCode = $('#zip').val();
      if (zipCode == '') {
        $('.zip-blank-error').remove();
        $('.zip-length-error').remove();
        $('.zip-number-error').remove();
        $('.credit-card').before('<p class=zip-blank-error>Please enter a Zip Code.</p>');
        $('.zip-blank-error').addClass('error-text');
        $('#zip').addClass('error');
      } else if (zipCode.match(/^\d+$/)) {
        if (zipCode.length != 5) {
          $('.zip-blank-error').remove();
          $('.zip-length-error').remove();
          $('.zip-number-error').remove();
          $('.credit-card').before('<p class=zip-length-error>Zip Code must be 5 digits long.</p>');
          $('.zip-length-error').addClass('error-text');
          $('#zip').addClass('error')
        } else if (zipCode.length == 5) {
          $('.zip-blank-error').remove();
          $('.zip-length-error').remove();
          $('.zip-number-error').remove();
          $('#zip').removeClass('error');
        }
      } else if (!zipCode.match(/^\d+$/)){
        $('.zip-blank-error').remove();
        $('.zip-length-error').remove();
        $('.zip-number-error').remove();
        $('.credit-card').before('<p class=zip-number-error>Zip Code cannot include letters or symbols.')
        $('.zip-number-error').addClass('error-text');
        $('#zip').addClass('error');
      }
    }
    cardZipValid();

    const cardCVV = () => {
      const CVV = $('#cvv').val();
      if (CVV == '') {
        $('.cvv-blank-error').remove();
        $('.cvv-length-error').remove();
        $('.cvv-number-error').remove();
        $('.credit-card').before('<p class=cvv-blank-error>Please enter a CVV.</p>');
        $('.cvv-blank-error').addClass('error-text');
        $('#cvv').addClass('error');
      } else if (CVV.match(/^\d+$/)) {
        if (CVV.length != 3) {
          $('.cvv-blank-error').remove();
          $('.cvv-length-error').remove();
          $('.cvv-number-error').remove();
          $('.credit-card').before('<p class=cvv-length-error>CVV must be 3 digits long.</p>');
          $('.cvv-length-error').addClass('error-text');
          $('#cvv').addClass('error');
        } else if (CVV.length == 3) {
          $('.cvv-blank-error').remove();
          $('.cvv-length-error').remove();
          $('.cvv-number-error').remove();
          $('#cvv').removeClass('error');
        }
      } else if (!CVV.match(/^\d+$/)){
        $('.cvv-blank-error').remove();
        $('.cvv-length-error').remove();
        $('.cvv-number-error').remove();
        $('.credit-card').before('<p class=cvv-number-error>CVV cannot include letters or symbols.')
        $('.cvv-number-error').addClass('error-text');
        $('#cvv').addClass('error');
      }
    }
  cardCVV();
  }
  creditCheck();
});
