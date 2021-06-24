var vet_clinics;
var diets;
var therapeutic_history;
var diagnostic_file;
var images_file;

var default_datepicker = {
  dateFormat: "dd/mm/y",
  changeMonth: true,
  changeYear: true,
  maxDate: "0",
};

$(document).ready(function () {
  diets = new FormBlock(
    ["Diet-Date-From-", "Diet-Date-To-", "Diet-Name-", "Diet-Result-"],
    20,
    "diet-history",
    "Diet-History-",
    "remove-diets",
    "Remove-Diet-",
    "Add-Diet",
    default_datepicker
  );

  $(".datepicker").datepicker(default_datepicker);

  linkLabels();
});
