function Controller() {

  var service = new Service()


  this.startGameH = function () {
    $('.level').css("display", "none")
    service.startGameH(draw, fail)
  }

  this.startGameE = function () {
    $('.level').css("display", "none")
    service.startGameE(draw, fail)
  }

  this.startGameM = function () {
    $('.level').css("display", "none")
    service.startGameM(draw, fail)
  }

  this.guess = function (event) {
    event.preventDefault()
    service.guess(event.target.value, draw, fail)
  }


  function draw(data) {
    var elem = document.getElementById('display')
    var button = document.getElementById('button')
    var buttonTemp = ''
    var winCount = 0
    var wordTemplate = data.word.join(' ')
    var charMap = getCharMap(data)
    var countDown = data.maxGuesses - data.incorrect.length
    var template = `
      <h3>Guesses${" " + countDown}<h3>
      <h3>${wordTemplate}</h3>
      `
    for (var c = 0; c < data.word.length; c++) {
      var character = data.word[c];
      if (character != "_") {
        winCount++
      }
    }

    if (winCount == data.word.length) {
      data.victory = true
    }

    if (data.victory == true) {
      template += `
      <h3>win</h3>
      `
      button.innerHTML = ""
      elem.innerHTML = template
    }
    if (data.maxGuesses == data.incorrect.length) {
      template += `
      <h3>lose</h3>
      `
      $('.body').css('background-image', 'url("/asset/image/gameover.gif")')
      button.innerHTML = ""
      elem.innerHTML = template
    }
    if(data.victory == false && data.maxGuesses != data.incorrect.length){
      for (var i = 0; i < charMap.length; i++) {
        var char = charMap[i];
        buttonTemp += `
        <button onclick='app.controllers.ctrl.guess(event)' value='${charMap[i]}' class="letterBtn">${charMap[i]}</button>
        `
      }
      elem.innerHTML = template
      button.innerHTML = buttonTemp
    }
  }



  function fail(error) {
    console.error("Something broke", error)
  }

  function getCharMap(data) {
    var usedLet = data.incorrect.concat([...data.correct])
    var charMap = 'abcdefghijklmnopqrstuvwxyz'.split('')
    for (var i = 0; i < charMap.length; i++) {
      var char = charMap[i]
      for (var j = 0; j < usedLet.length; j++) {
        var letter = usedLet[j];
        if (char == letter) {
          charMap.splice(i, 1)
          i--
        }
      }
    }
    return charMap
  }
}
