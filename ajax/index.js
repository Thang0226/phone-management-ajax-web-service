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
        success: function() {
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
            let content = ' <table id="display-list" border="1"><tr>\n' +
                ' <th>Producer</th>\n' +
                ' <th>Model</th>\n' +
                ' <th>Price</th>\n' +
                ' <th>Delete</th>\n' +
                ' </tr>';
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
                <td>${data[i].producer}</td>
                <td>${data[i].model}</td>
                <td>${data[i].price}</td>
                <td><button type="button" onclick="deleteSmartphone(${data[i].id})">Delete</button></td>
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
        success: function() {
            listAllSmartPhones();
        }
    });
}