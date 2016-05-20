$(document).ready(function() {
    //var array = [];
    var monthlySalaries = 0;
    $.get('/employees', getEmployees);
    //click function to post data to the server
    $('#employeeinfo').on('click', '#submit', function (){
      postEmployees();
      getEmployees();
    });


      $('#employee-table').on('click', '.delete', function(){
        deleteEmployee($(this));
        });

});

function getEmployees(){
  $.ajax({
    type: 'GET',
    url: '/employees',
    success: function (employees) {
      var monthlySalaries = 0;
      var values = {};
      console.log(employees);
       $('#employee-table').empty();
       $('#employee-table').append('<tr>' +
              '<th>Employee</th>' +
              //'<th>ID Number</th>' +
              '<th>Title</th>' +
              '<th>Salary</th>' +
              //'<th>Monthly Salary Cost</th>' +
              '</tr>');
              // $.each($('#employeeinfo').serializeArray(), function(i, field) {
              //   values[field.name] = field.value;
              // })
              //  $('#employeeinfo').find('input[type=integer]').val('');
              //  monthlySalaries += Number.parseInt(values.sal / 12);
              //  console.log(monthlySalaries);
              //  $('#employeeinfo').append('<p> monthly salary cost: $'+ monthlySalaries + '</p>');

        employees.forEach(function(row) {
         var $el = $('<tr>' +
              '<td>' + row.first_name + ' ' + row.last_name + '</td>' +
              //'<td>' + row.emp_id + '</td>' +
              '<td>' + row.job_title + '</td>' +
              '<td>' + row.salary + '</td>' +
              //'<td id="+'monthSalCost'+">' + monthSalCost + '</td>' +
              '<td>' + '<button class="delete">Delete</button>' + '</td>' +
              '</tr>');
            $el.data('employeeID', row.id);
            console.log(row.id);
         $('#employee-table').append($el);
          monthlySalaries += Math.round(parseInt(row.salary / 12));

         });
         $('#monthly').text('Cost of monthly salary: $' + monthlySalaries);

       }
      // employees.forEach(function (employee) {
      //   $('#first_name').append('<tr>' + employee.firstname + '</tr>');
      //   $('#last_name').append('<tr>' + employee.lastname + '</tr>');
      //   $('#salary').append('<tr>' + employee.salary + '</tr>');
      //
      // })


      // $('#container').append('<div class="person"></div>');
      // var $el = $('#container').children().last();
      //
      // $el.append('<p> Employee First Name: ' + empInfo.firstname + '</p>');
      // $el.append('<p> Employee Last Name: ' + empInfo.lastname + '</p>')
      // $el.append('<p> Employee ID Number: ' + empInfo.empnumber + '</p>');
      // $el.append('<p> Employee Job Title: ' + empInfo.title + '</p>');
      // $el.append('<p> Employee Annual Salary: $' + empInfo.sal + '</p>');
      // $el.append('<p> Cost of Monthly Salary: $' + monthlySalaries + '</p>');
    })
    };
function postEmployees () {
  event.preventDefault();
  var values = {};
  $.each($('#employeeinfo').serializeArray(), function(i, field) {
    values[field.name] = field.value;
    $('#employeeinfo').find('input[type=text]').val('');


  })
      $.ajax({
          type: 'POST',
          url: '/employees',
          data: values,
          success: function (data) {
            console.log(values);
        },
    });
}

function deleteEmployee(button) {
  console.log(button);
  //event.preventDefault();
console.log('clicked');
//  var movieId = getMovieId($(this));

  var employeeID = button.parent().parent().data('employeeID');//getEmployeeId(button);
  console.log(employeeID);
  $.ajax({
    type: 'DELETE',
    url: '/employees/' + employeeID,
    success: function (data) {
      getEmployees();
    },
  });
}


// $('#delete').on('click', function() {
//   $('#container > .person').last().remove();
// });
// });
