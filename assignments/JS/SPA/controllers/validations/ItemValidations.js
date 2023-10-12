// validation for customers
const ITEM_CODE_REGEX = /^(I0-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_PRICE_REGEX = /^\d+(\.\d{2})?$/;
const ITEM_QTY_REGEX = /^\d+(\.\d+)?$/;

//add validations and text fields to the
let i_vArray = new Array();
i_vArray.push({field: $("#txtItemCode"), regEx: ITEM_CODE_REGEX});
i_vArray.push({field: $("#txtItemName"), regEx: ITEM_NAME_REGEX});
i_vArray.push({field: $("#txtItemPrice"), regEx: ITEM_PRICE_REGEX});
i_vArray.push({field: $("#txtItemQty"), regEx: ITEM_QTY_REGEX});

function clearItemInputFields() {
    $("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").val("");
    $("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").css("border", "1px solid #ced4da");
    $("#txtItemCode").focus();
    setBtnItem();
}

setBtnItem();



//disable tab
$("#txtItemCode,#txtItemName,#txtItemPrice,#txtItemQty").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = i_vArray.indexOf(i_vArray.find((c) => c.field.attr("code") == e.target.code));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidationsItem(i_vArray[indexNo]);

    setBtnItem();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.code != i_vArray[i_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidationsItem(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidationsItem(i_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkValidationsItem(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAllItem() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkValidationsItem(i_vArray[i])) return false;
    }
    return true;
}

function setBtnItem() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnItem").prop("disabled", false);
    } else {
        $("#btnItem").prop("disabled", true);
    }

    let code = $("#txtItemCode").val();
    if (searchItem(code) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }

}

