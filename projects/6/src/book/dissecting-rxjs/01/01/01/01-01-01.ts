let startTime: number | null = null;

$('#hold-me').mousedown(function () {
  startTime = Date.now();
});

$('#hold-me').mouseup(function () {
  if (startTime) {
    const elapsedMilliseconds = Date.now() - startTime;
    startTime = null;
    $('#hold-time').text(elapsedMilliseconds);
    $.ajax(`https://timing-sense-score-board.herokuapp.com/score/${elapsedMilliseconds}`).done((res) => {
      $('#rank').text(`你超过了 ${res.rank}% 的用户`);
    });
  }
});

export {};
