browser.messages.query({unread: true}).then(function(msgs) {
  while (msgs.id) {
    browser.messages.continueList(msgs.id).then(function(v) {msgs = msgs.concat(v)});
  }

  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

  let mailDays = msgs.messages.map(m => Math.round(Math.abs(m.date - Date.now()) / oneDay)).map(x => Math.pow(x, 2));

  document.getElementById("day_mails").textContent = mailDays.reduce((x, y) => x+y, 0);
  document.getElementById("unread").textContent = mailDays.length;
  let maxId = indexOfMax(mailDays);

  document.getElementById("folder").textContent =  "Folder: " + msgs.messages[maxId].folder.path;
  document.getElementById("subject").textContent =  "Subject: " + msgs.messages[maxId].subject;
  document.getElementById("recipients").textContent =
      "Recipients: " + msgs.messages[maxId].recipients.join("; ");
  document.getElementById("date").textContent =  "Date: " + msgs.messages[maxId].date.toDateString();
  document.getElementById("score").textContent =  "Score: " + mailDays[maxId];
});

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}