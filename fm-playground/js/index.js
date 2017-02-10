$(document).ready(function () {
  var carrierFrequency = 15;
  var basebandFrequency = 2;

  var midlineStrokeStyle = "#0000BB";
  var midlineStrokeWidth = 1;

  $("#baseband-frequency").val(basebandFrequency);
  $("#carrier-frequency").val(carrierFrequency);

  $("#calculate-btn").click(function (ev) {
    ev.preventDefault();

    basebandFrequency = parseInt($("#baseband-frequency").val(), 10);
    carrierFrequency = parseInt($("#carrier-frequency").val(), 10);

    plotAll();
  });

  plotAll();

  function plotAll() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      var height = canvas.height;
      var width = canvas.width;

      ctx.clearRect(0, 0, width, height);

      plotSinusoid(carrierFrequency, "#eee");
      plotSinusoid(basebandFrequency, "#ddd");
      plotFM(carrierFrequency, basebandFrequency, "#000");
    }

    function plotSinusoid(freq, waveStyle) {
      var amplitude = height * 0.9;
      ctx.strokeStyle = waveStyle;
      ctx.lineWidth = midlineStrokeWidth;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (var x=0; x < width; x++) {
        var sval = Math.sin(2 * freq * Math.PI * x / width);
        var y = sval * (amplitude / 2) + height / 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height / 2);
      ctx.closePath();
      ctx.stroke();
    }

    function plotFM(carrierFreq, basebandFreq, waveStyle) {
      var amplitude = height * 0.9;
      ctx.strokeStyle = waveStyle;
      ctx.lineWidth = midlineStrokeWidth;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      for (var x=0; x < width; x++) {
        var sval = Math.cos((2 * carrierFreq * Math.PI * x / width) + Math.sin(2 * basebandFreq * Math.PI * x / width) / basebandFreq);
        var y = sval * (amplitude / 2) + height / 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height / 2);
      ctx.closePath();
      ctx.stroke();
    }
  }
});
