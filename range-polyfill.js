$(function(){
  if (!Modernizr.inputtypes.range) {
    $('input[type="range"]').each(function(index) {
      var rangeElem = this;
      var min = parseFloat($(rangeElem).attr('min')), max = parseFloat($(rangeElem).attr('max')), step = parseFloat($(rangeElem).attr('step')), value = parseFloat($(rangeElem).attr('value')), disabled = $(rangeElem).prop('disabled') ; ;
      var hiddenField = document.createElement('input');
      $(hiddenField).attr({
        type: "hidden",
        name: $(rangeElem).attr('name'),
        value: value || min || 0,
        disabled: disabled || false
      })
      var sliderContainerDiv = document.createElement('div');
      if (rangeElem.hasAttribute('class')) {
        sliderContainerDiv.className = $(rangeElem).attr('class');
      }
      if (rangeElem.hasAttribute('style')) {
        sliderContainerDiv.setAttribute('style', $(rangeElem).attr('style'));
      }
      $(sliderContainerDiv).css({
        position: 'relative'
      });
      var sliderDiv = document.createElement('div');
      var w = $(rangeElem).width(), h = $(rangeElem).height();
      var vertical = h > w;
      if (vertical) {
        $(sliderDiv).css({
          height: '100%'
        });
      } else {
        $(sliderDiv).css({
          width: '100%'
        });
      }
      $(sliderDiv).appendTo(sliderContainerDiv);
      $(rangeElem).replaceWith(hiddenField);
      $(sliderContainerDiv).insertAfter(hiddenField);
      $(sliderDiv).slider({
        min: min,
        max: max,
        step: step,
        value: value || min || 0,
        disabled: disabled || false,
        orientation: (vertical) ? 'vertical' : 'horizontal',
        change: function(event, ui) {
          $(hiddenField).attr('value', $(sliderDiv).slider( "option", "value" ));
        }
      });
      if ($(this).attr('list') !== undefined) {
      	$('datalist#' + $(this).attr('list') + ' option').each(function(index) {
      	  var tickMarkDiv = document.createElement('div');
      	  $(tickMarkDiv).addClass('range-tick-mark');
          $(tickMarkDiv).addClass((vertical) ? 'range-tick-mark-vertical' : 'range-tick-mark-horizontal');
          var markPercentage = ((($(this).attr('value') - min) / (max - min)) * 100);
      	  $(tickMarkDiv).css({
      	    position: 'absolute',
      	    top: (vertical) ? (100 - markPercentage) + '%' : '0px',
      	    left: (vertical) ? '0px' : markPercentage + '%'
      	  });
      	  $(tickMarkDiv).appendTo(sliderContainerDiv);
      	});
      }
      $('output[onforminput="value = ' + $(this).attr('name') + '.value"]').each(function(index) {
        var outputElem = this;
        outputElem.removeAttribute('onforminput');
        $(sliderDiv).bind("slide", function(event, ui) {
          $(outputElem).text(ui.value);
        });
        $(outputElem).text($(hiddenField).val());
      });
    });
  }
});