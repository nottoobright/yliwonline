/**
 * Created by Yash on 6/6/2017.
 */

$( function() {
  $("#datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    yearRange: "1942:2017",
    showAnim: "fold",
    onSelect: function (date) {
      var dob;
      sessionStorage.setItem('dob', date);
      console.log(dob);
    }

  });

});





