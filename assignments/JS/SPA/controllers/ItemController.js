//Write down all the item form controllers here

//load all existing items
getAllItems();

//add customer event
$("#btnItem").click(function () {
    if (checkAllItem()){
        saveItem();
    }else{
        alert("Error");
    }

});

//get all customer event
$("#btnGetAllItem").click(function () {
    getAllItems();
});

//bind tr events for getting back data of the rows to text fields
function bindTrEventsItem() {
    $('#tblItem>tr').click(function () {
        //get the selected rows data
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let price = $(this).children().eq(2).text();
        let qty = $(this).children().eq(3).text();

        //set the selected rows data to the input fields
        $("#txtItemCode").val(code);
        $("#txtItemName").val(name);
        $("#txtItemPrice").val(price);
        $("#txtItemQty").val(qty);

        $("#btnItemDelete").prop("disabled", false);
    })
}

//delete btn event
$("#btnItemDelete").click(function () {
    let code = $("#txtItemCode").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            alert("Item Deleted");
            clearItemInputFields();
            getAllItems();
        } else {
            alert("Itemr Not Removed..!");
        }
    }


});

//update  btn event
$("#btnItemUpdate").click(function () {
    let code = $("#txtItemCode").val();
    updateItem(code);
    clearItemInputFields();
});

//clear btn event
$("#btnItemCancel").click(function () {
    clearItemInputFields();
});






// CRUD operation Functions
function saveItem() {
    alert("grqrq");
    let ItemCode = $("#txtItemCode").val();
    //check customer is exists or not?
    if (searchItem(ItemCode.trim()) == undefined) {

        //if the customer is not available then add him to the array
        let itemName = $("#txtItemName").val();
        let itemAddress = $("#txtItemPrice").val();
        let itemQty = $("#txtItemQty").val();

        //by using this one we can create a new object using
        //the customer model with same properties
        let newItem = Object.assign({}, item);

        //assigning new values for the customer object
        newItem.code = ItemCode;
        newItem.name = itemName;
        newItem.price = itemAddress;
        newItem.qty = itemQty;

        //add customer record to the customer array (DB)
        itemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

function getAllItems() {
    //clear all tbody data before add
    $("#tblItem").empty();
    $("#modalItemTable").empty();

    //get all customers
    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].code;
        let name = itemDB[i].name;
        let price = itemDB[i].price;
        let qty = itemDB[i].qty;

        let row = `<tr>
                     <td>${code}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                    </tr>`;

        // //and then append the row to tableBody
        $("#tblItem").append(row);
        $("#modalItemTable").append(row);


        //invoke this method every time
        // we add a row // otherwise click
        //event will not work
        bindTrEventsItem();
    }

}

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}

function searchItem(code) {
    return itemDB.find(function (item) {
        //if the search id match with customer record
        //then return that object
        return item.code == code;
    });
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code);
            //if the customer available can we update.?

            let itemName = $("#txtItemName").val();
            let itemPrice = $("#txtItemPrice").val();
            let itemQty = $("#txtItemQty").val();

            item.name = itemName;
            item.price = itemPrice;
            item.qty = itemQty;

            getAllItems();
        }
    }

}




