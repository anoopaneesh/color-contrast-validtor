function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null
}
window.addEventListener('DOMContentLoaded', () => {
  let input = document.getElementById('color-picker')
  let text = document.getElementById('text')
  const net = new brain.NeuralNetwork()
  net.train([
    { input: { r: 0, g: 0, b: 0 }, output: { light: 1, dark: 0 } },
    { input: { r: 1, g: 1, b: 1 }, output: { light: 0, dark: 1 } },
    {
      input: {
        r: 0.5686274509803921,
        g: 0.4392156862745098,
        b: 0.27450980392156865,
      },
      output: { light: 1, dark: 0 },
    },
    {
      input: {
        r: 0.9490196078431372,
        g: 0.7254901960784313,
        b: 0.43137254901960786,
      },
      output: { light: 0, dark: 1 },
    },
  ])
  input.addEventListener('input', (event) => {
    let rgb = hexToRgb(event.target.value)
    let res = net.run(rgb)
    let textColor = '#000000'
    if (res.light > res.dark) {
      textColor = '#ffffff'
    }
    text.style.color = textColor
    text.style.background = event.target.value
  })
})
