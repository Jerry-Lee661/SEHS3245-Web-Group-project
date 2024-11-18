$(document).on('click', '.minus-btn', function(e) { //$(document) is for the JS to cheack the whole HTML file. When user click minus, the programme will run the code below
    e.preventDefault(); //function(e) is for default event
    var $this = $(this); //當前的, 哪一個product的minus
    var $input = $this.closest('div').find('input'); //找div裏最近的input
    var value = parseInt($input.val()); //將目前輸入的數值變成整數

    if (value > 1) {
        value = value - 1; //如果大過1 當前數值減1 e.g 2 - 1 = 1
    } else {
        value = 0; //否則就會顯示0, e.g 1 - 1 = 0
    }

    $input.val(value); //Set the new value back to the input (update input)
});
 
$(document).on('click', '.plus-btn', function(e) { //$(document) is for the JS to cheack the whole HTML file. When user click plus, the programme will run the code below
    e.preventDefault(); //function(e) is for default event
    var $this = $(this); //當前的, 哪一個product的plus
    var $input = $this.closest('div').find('input'); //找div裏最近的input
    var value = parseInt($input.val());

    if (value < 20) {
        value = value + 1; //如果少過20 當前數值加1 e.g 2 + 1 = 3
    } else {
        value = 20; //The maximum value is 20
    }

    $input.val(value); //Set the new value back to the input (update input)
});