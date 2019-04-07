(function($) {
	return ProgressBar = function(config) {
		var _params = {
		    $container : null,
		    $isCancelButtonNeeded : false,
		    $isStatusBarNeeded : false,
		    progressMessage : "Progressing",
		    cancelButtonText : "Cancel",
		    cancelButton_id : 0,
		    initialProgressVal : "0%",
		};
		var $root;
		var $bar;
	    var $percent;
	    var $status;
	    var $cancel;
	    var $progress;
	    var $cancelBtnCallbackFn = null;
	    var cancelButtonText;

	    var _init = function() {
	        $.extend(_params, config);
	        $.when(
	            $.ajax("/static/file_upload_progressbar/html_layout/ProgressBar.html")
	                .done(function (template) {
	                    $root = $(template);
	                    _bind();
	                }).fail(function() { console.log ("ERROR : $.ajax failed"); })
	        ).done(function() {
	            if(_params.$container) {
	                _params.$container.append($root);
	                console.log("ProgressBar : Init is done!!!");
	            }
	        }).fail(function() {
    			console.log( "ERROR : $.when failed!" );
  			});
	    };

	    var _bind = function() {
	        $bar = $root.find('.bar');
	        $percent = $root.find('.percent');
	        $status = $root.find('.status');
	        $progress = $root.find('.progress');
	        if (!_params.$isStatusBarNeeded) {
	        	$status.hide();
	        }

	        _updateProgressBar(_params.initialProgressVal);

	        cancelButtonText = _params.cancelButtonText;
	        $cancel = $root.find('.cancel');
	        $cancel.attr('id', _params.cancelButton_id)
	        if (!_params.$isCancelButtonNeeded) {
	        	$cancel.hide();
	        } else {
				$cancel.html(cancelButtonText);

	        	if ($cancelBtnCallbackFn) {
	        		$cancel.on('click', $cancelBtnCallbackFn);
	        	}
	        }
	    };

	    var _registerCancelButtonCallbackFn = function(callback) {
	    	if((_params.$isCancelButtonNeeded) && (typeof callback === 'function')) {
	            $cancelBtnCallbackFn = callback;
            }
	    };

	    var _changeProgressBarColor = function(color) {
	    	$bar.css( "background-color", color );
	    };

	    var _updateProgressBar = function(percentVal) {
	    	$bar.width(percentVal);
	    	if (_params.progressMessage) {
            	$percent.html(_params.progressMessage + " : " + percentVal);
            } else {
            	$percent.html(percentVal);
            }
	    };

	    var _updateStatusMessage = function(statusVal) {
	    	if (_params.$isStatusBarNeeded) {
	    		(statusVal != "") ? ($status.html(statusVal)) : ($status.empty());
	    	}
	    };

        var _enableDisableCancelButton = function(status) {
        	if (_params.$isCancelButtonNeeded) {
        		$cancel.prop('disabled', status);
        	}
        };

        var _hideProgressBar = function(state) {
        	(state == true) ? (_params.$container.hide()) : (_params.$container.show());
        };

        var _resetProgressBar = function() {
            _enableDisableCancelButton(false);
            _updateStatusMessage("");
            _updateProgressBar('0%');
        };

        var _changeProgressBarWidthHeight = function(width, height) {
        	var _height = height.slice(0,-2);
        	$progress.css("width", width);
        	$progress.css("height", height);
        	$bar.css ("height", (_height - 4) + 'px');
        	$percent.css("top", ((_height / 10) * 5) + "%");
        };

        var _get$Root = function() {
            return $root;
        };

        _init();
        this.get$Root = _get$Root;
        this.changeProgressBarColor = _changeProgressBarColor;
        this.updateProgressBar = _updateProgressBar;
        this.hideProgressBar = _hideProgressBar;
        this.resetProgressBar = _resetProgressBar;
       	this.updateStatusMessage = _updateStatusMessage;
        this.enableDisableCancelButton = _enableDisableCancelButton;
        this.registerCancelButtonCallbackFn = _registerCancelButtonCallbackFn;
    };
})(jQuery);