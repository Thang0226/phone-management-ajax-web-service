$(function () {
    $("#update-smartphone").hide();
})

function addNewSmartPhone() {
    event.preventDefault();

    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        url: "http://localhost:8080/api/smartphones",
        success: function () {
            console.log("success");
            listAllSmartPhones();
        }
    });
}

function listAllSmartPhones() {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones",
        success: function (data) {
            let content = '<h2>Smartphone List</h2>' +
                '<table id="display-list" border="1"><tr>\n' +
                ' <th>Producer</th>\n' +
                ' <th>Model</th>\n' +
                ' <th>Price</th>\n' +
                ' <th>Delete</th>\n' +
                ' <th>Update</th>\n' +
                ' </tr>';
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                <td>${data[i].producer}</td>
                <td>${data[i].model}</td>
                <td>${data[i].price}</td>
                <td><button type="button" onclick="deleteSmartphone(${data[i].id})">Delete</button></td>
                <td><button type="button" onclick="showUpdateForm(${data[i].id})">Update</button></td>
                </tr>`;
            }
            content += "</table>";
            $("#smartphoneList").html(content);
        }
    });
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: function () {
            listAllSmartPhones();
        }
    });
}

function showUpdateForm(id) {
    event.preventDefault();
    // get smartphone
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/smartphones/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (object) {
            // show update form
            $("#update-smartphone").show();
            $("#id").val(object.id);
            $("#price_new").val(object.price);
            $("#model_new").val(object.model);
            $("#producer_new").val(object.producer);
        }
    });
}
// update smartphone
function saveSmartphone() {
    event.preventDefault();
    let newSmartphone = {
        id: $("#id").val(),
        producer: $("#producer_new").val(),
        model: $("#model_new").val(),
        price: $("#price_new").val(),
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: `http://localhost:8080/api/smartphones`,
        data: JSON.stringify(newSmartphone),
        success: function () {
            $("#update-smartphone").hide();
            listAllSmartPhones();
        }
    });
}