$(document).ready(function() {
    var array = [];
    var monthlySalaries = 0;
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      var values = {};
      $.each($('#employeeinfo').serializeArray(), function(i, field) {
        values[field.name] = field.value;
      })

      console.log(values);
      monthlySalaries += Number.parseInt(values.employeeSal / 12);
      appendDom(values);

      console.log(monthlySalaries);

})
    function appendDom(empInfo) {
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();

      $el.append('<p> Employee First Name: ' + empInfo.employeefirstname + '</p>');
      $el.append('<p> Employee Last Name: ' + empInfo.employeelastname + '</p>')
      $el.append('<p> Employee ID Number: ' + empInfo.employeeNum + '</p>');
      $el.append('<p> Employee Job Title: ' + empInfo.employeeTitle + '</p>');
      $el.append('<p> Employee Annual Salary: $' + empInfo.employeeSal + '</p>');
      $el.append('<p> Cost of Monthly Salary: $' + monthlySalaries + '</p>');
};
});
