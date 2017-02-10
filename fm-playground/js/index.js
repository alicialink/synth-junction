$(document).ready(function () {
  let carrierFrequency = 15
  let basebandFrequency = 2
  let basebandDeviation = 1
  let basebandAmplitude = 1
  let carrierAmplitude = 1

  const midlineStrokeStyle = '#0000BB'
  const midlineStrokeWidth = 1

  $('#carrier-amplitude').val(carrierAmplitude)
  $('#carrier-frequency').val(carrierFrequency)
  $('#baseband-frequency').val(basebandFrequency)
  $('#baseband-deviation').val(basebandDeviation)
  $('#baseband-amplitude').val(basebandAmplitude)


  $('#calculate-btn').click(function (ev) {
    ev.preventDefault()

    basebandFrequency = parseFloat($('#baseband-frequency').val())
    basebandDeviation = parseFloat($('#baseband-deviation').val())
    basebandAmplitude = parseFloat($('#baseband-amplitude').val())
    carrierFrequency = parseFloat($('#carrier-frequency').val())
    carrierAmplitude = parseFloat($('#carrier-amplitude').val())

    plotAll()
  })

  plotAll()

  function plotAll() {
    const canvas = document.getElementById('canvas')

    let ctx = null
    let height = 1
    let width = 1

    if (canvas.getContext) {
      ctx = canvas.getContext('2d')
      height = canvas.height
      width = canvas.width

      ctx.clearRect(0, 0, width, height)

      plotSinusoid(carrierFrequency, '#eee')
      plotSinusoid(basebandFrequency, '#ddd')
      plotFM('#000')
    }

    function plotSinusoid(freq, waveStyle) {
      const amplitude = height * 0.9
      ctx.strokeStyle = waveStyle
      ctx.lineWidth = midlineStrokeWidth
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      for (let x = 0; x < width; x++) {
        const sval = Math.sin(2 * freq * Math.PI * x / width)
        const y = sval * (amplitude / 2) + height / 2
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height / 2)
      ctx.closePath()
      ctx.stroke()
    }

    function plotFM(waveStyle) {
      const coeff = basebandAmplitude * basebandDeviation / basebandFrequency
      const amplitude = height * 0.9
      ctx.strokeStyle = waveStyle
      ctx.lineWidth = midlineStrokeWidth
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      for (let x = 0; x < width; x++) {
        const sval = Math.cos((2 * carrierFrequency * Math.PI * x / width) + coeff * Math.sin(2 * basebandFrequency * Math.PI * x / width))
        const y = sval * (amplitude / 2) + height / 2
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height / 2)
      ctx.closePath()
      ctx.stroke()
    }
  }
})
