
wlcApp.service('commonOpsService', function () {

    // Show message box.
    this.MessageBox = function (msj, title) {
        if (title == "Info") {
            this.SetMessageBoxValues("Info", msj, "box box-solid box-primary", "icon fa fa-info", "btn btn-primary");
        }
        else if (title == "Error") {
            this.SetMessageBoxValues("Error", msj, "box box-solid box-danger", "icon fa fa-ban", "btn btn-danger");
        }
        else if (title == "Warning") {
            this.SetMessageBoxValues("Warning", msj, "box box-solid box-warning", "icon fa fa-warning", "btn btn-warning");
        }
        else if (title == "Success") {
            this.SetMessageBoxValues("Success", msj, "box box-solid box-success", "icon fa fa-check", "btn btn-success");
        }

        $("#MessageBoxDiv").modal({
            position: 'center'
        });
    },

    // Set message box properties.
    this.SetMessageBoxValues = function (headerText, msj, solidClass, iconClass, buttonClass) {
        $('#MessageBoxHeaderContent').text(headerText);
        $('#MessageBoxBodyContent').text(msj);
        $('#MessageBoxSolid').addClass(solidClass);
        $('#MessageBoxIcon').addClass(iconClass);
        $('#MessageBoxCloseButton').addClass(buttonClass);
    }
});