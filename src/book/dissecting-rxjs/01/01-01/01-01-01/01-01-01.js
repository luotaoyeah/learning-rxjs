let startTime = null;

$("#hold-me").mousedown(function() {
  startTime = new Date();
});

$("#hold-me").mouseup(function() {
  if (startTime) {
    let elapsedTime = new Date() - startTime;
    startTime = null;
    $("#hold-time").text(elapsedTime);
  }
});
