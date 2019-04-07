(function($, ProgressBar) {
    return FileUploadProgressBar = function(config) {
        var _params = {
            $container : null,
            $form : $('form'),
            $uploadButton : null,
            $backButton : null,
            $fileUploadAttachment : null
        };
        var $root;
        var $bar;
        var $percent;
        var $status;
        var $cancel;
        var $form;
        var $uploadBtn;
        var $backBtn;
        var $attachment;
        var $currXhr = null;
        var oProgressBar = null;

        var _init = function() {
            $.extend(_params, config);
            oProgressBar = new ProgressBar({
                $container : _params.$container,
                $isCancelButtonNeeded : true,
                $isStatusBarNeeded : true,
                progressMessage : null
            });
            $root = oProgressBar.get$Root();
            _bind();
        };

        var _bind = function() {
            $fileUploadButton = _params.$trigger;
            $form = _params.$form;
            $uploadBtn = _params.$uploadButton;
            $backBtn = _params.$backButton;
            $attachment = _params.$fileUploadAttachment;

            $form.ajaxForm({
                beforeSend: function(xhr, opts) {
                    var file_name = $attachment.val();
                    //
                    // Validation of file extension is commented out
                    //
                    if (file_name.length == 0) {
                        console.log ("Error: No file selected. Please try again!!!");
                        xhr.abort();
                        _formCompleteDraw();
                        return;
                    }
                    /*
                    if (file_name.substring(file_name.length - 4,file_name.length) != ".zip")
                    {
                        console.log ("Error: Wrong Format of file! Only .zip file allowed.");
                        xhr.abort();
                        _formCompleteDraw();
                        return;
                    }
                    */
                    console.log ("File upload started. Don't refresh or close the web page.");
                    _formBarSetup(xhr, opts);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    _formBarProgressDisplay(event, position, total, percentComplete);
                },
                success: function() {
                    _formSuccessDraw();
                },
                complete: function(xhr, ) {
                    _formCompleteDraw();
                },
                error: function(xhr, textStatus, errorThrown) {
                   _handleError(xhr, textStatus, errorThrown);
                }
            });

            oProgressBar.registerCancelButtonCallbackFn(_cancelBtnCallback);

            if ($attachment && $uploadBtn) {
                $attachment.change(function (){
                    $uploadBtn.prop('disabled', false);
                });
            }

            if ($backBtn) {
                $backBtn.click(function() {
                    document.location = $(this).data('href');
                });
            }
        };

        var _cancelBtnCallback = function() {
            if ($currXhr) {
              $currXhr.abort();
              $currXhr = null;
            }
            oProgressBar.changeProgressBarColor("red");
            setTimeout( _disableButtons, 2000);
            console.log ("File upload cancel is in progress...");
        };

        var _formBarSetup = function(xhr, opts) {
            $currXhr = xhr;
            oProgressBar.resetProgressBar();
            _enableButtons();
            oProgressBar.changeProgressBarColor("#B4F5B4");
        };

        var _formBarProgressDisplay = function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            var statusVal = 'Downloaded : ' + parseFloat(position/(1024*1024)).toFixed(2) + ' MB / Total size : ' + parseFloat(total/(1024*1024)).toFixed(2) + ' MB';
            oProgressBar.updateProgressBar(percentVal);
            oProgressBar.updateStatusMessage(statusVal);
            if (100 == percentComplete)
            {
                oProgressBar.enableDisableCancelButton(true);
                console.log ("Verifying the File zip file...");
            }
        };

        var _formSuccessDraw = function() {
            var percentVal = '100%';
            oProgressBar.updateProgressBar(percentVal);
        };

        var _formCompleteDraw = function() {
            oProgressBar.enableDisableCancelButton(true);
        };

        var _handleError = function(xhr, statusText, errorThrown) {
            if (errorThrown != "abort") {
                oProgressBar.changeProgressBarColor("red");
                setTimeout( _disableButtons, 4000);
                console.log ("Some Error occured. Aborting the upload!");
            }
        };

        var _disableButtons = function() {
            _initGUI();
            _enableDisableButtons(false);
        };

        var _enableButtons = function() {
            _enableDisableButtons(true);
        };

        var _initGUI = function() {
	       oProgressBar.resetProgressBar();
        };

        var _enableDisableButtons = function(status) {
            if ($uploadBtn)
                $uploadBtn.prop('disabled', status);
            if ($backBtn)
                $backBtn.prop('disabled', status);
            if ($attachment)
                $attachment.prop('disabled', status);
        };

        var _get$Root = function() {
            return $root;
        };

        _init();

        this.get$Root = _get$Root;

    };
})(jQuery, ProgressBar);