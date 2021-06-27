var candidate_nb = 0;

var welcome = true;

var already_open = false;

// add a global sentiment variable

var answersrndm = [
  "I disagree... Kinda?",
  "I see...",
  "oh no!",
  "yay",
  "glad you like it",
  "how is your day so far?"
];

var lovemsgs = [
  "You know you are quite unique, don't you?",
  "Well, I am not the one to whom you should say this...",
  "Oh, you!",
  "Wonderful - let me tell your crush about this ;) ",
  "A real sweetheart would see this",
  "How was your last date, by the way?"
];

var candidates = [
  {
    name: "William Inc.",
    desc:
      "As one of the most well-known marketing business in the country, we are advertising to YOU, our dear investor: invest in us and reap the rewards!",
    mean: 5,
    days30: 10,
    ytd: 7,
    img: "./images/william.jpg"
  },
  {
    name: "Stingless Co.",
    desc: "We sell bees. All sizes. Lots of them. Will you bee mine ?",
    mean: 2,
    days30: 0.1,
    ytd: 5,
    img: "./images/stingless.jpg"
  },
  {
    name: "Apples & Oranges",
    desc:
      "They said not to mix apples and oranges. We believe it makes the best juice. Let's powerthrough life - together.",
    mean: 25,
    days30: 25,
    ytd: 25,
    img: "./images/apples.jpg"
  },
  {
    name: "Sublime",
    desc:
      "Our business has yet to be seen. Let's wander in the liminal spaces of our love.",
    mean: 30,
    days30: 50,
    ytd: 20,
    img: "./images/sublime.jpg"
  },
  {
    name: "Scaling VC",
    desc:
      "Scaling the VC business through automation is a difficult business, but not as much as scaling the merging of our calendars. PM me for a link to a pro bono date.",
    mean: 12.24,
    days30: 15.11,
    ytd: 22,
    img: "./images/scalinv_vc.jpg"
  },
  {
    name: "Swivel",
    desc: "If you want to go fast, pivot; if you want to go far, swivel.",
    mean: 2,
    days30: 8,
    ytd: 12,
    img: "./images/swivel.jpg"
  },
  {
    name: "Bready-made",
    desc:
      "Making good bread is an art; making the best industrial bread is our goal.",
    mean: 6,
    days30: 10,
    ytd: 12,
    img: "./images/breadymade.jpg"
  },
  {
    name: "The Glossary",
    desc:
      "Are you a B2B or a B2C kind of date? If you are not sure, you are g2g with me.",
    mean: 18,
    days30: 2,
    ytd: 3,
    img: "./images/glossary.jpg"
  },
  {
    name: "oUt ThErE",
    desc:
      "Our business is so out there, it's like a never-ending ferrywheel. Let's grab some popcorn together.",
    mean: NaN,
    days30: NaN,
    ytd: NaN,
    img: "./images/out_there.jpg"
  },
  {
    name: "(in|re)versE",
    desc:
      "Sometimes you need to rewind to the begin to get the story; other time, you start with the end of the book. Let us do that for you. Which way do you want to go?",
    mean: 0.1,
    days30: 0.23,
    ytd: 1.75,
    img: "./images/inreverse.jpg"
  },
  {
    name: "Automatina",
    desc:
      "We automate the morning routine. Extra fees for eating your breakfast so you don't have to.",
    mean: 4,
    days30: 6,
    ytd: 8,
    img: "./images/automatina.jpg"
  },
  {
    name: "Protomatina",
    desc:
      "We are all about making the best morning routine. Through our extensive study of breakfasts, we can help you build the Perfect Breakfast.",
    mean: 10,
    days30: 30,
    ytd: 3,
    img: "./images/protomatina.jpg"
  },
  {
    name: "Sweepadida",
    desc:
      "Problems? Have you seen them? Not anymore! Get our special infinite rug and sweepadida them into oblivion. Broom not included.",
    mean: 0,
    days30: 12,
    ytd: 3,
    img: "./images/sweepadida.jpg"
  },
  {
    name: "MadeUP",
    desc:
      "Pick a thing: we sell it. Choose a service: we can do it. MadeUP business is all about upselling you the product of your dream.",
    mean: -3,
    days30: -8,
    ytd: 10,
    img: "./images/madeup.jpg"
  },
  {
    name: "Smith Inc., Inc.",
    desc:
      "We were successful, we took our business to the next level; we incorporated a second time. Get a date with us - again.",
    mean: -12,
    days30: 60,
    ytd: 3,
    img: "./images/smithincinc.jpg"
  },
  {
    name: "Backstreet Memories",
    desc:
      "Do you remember this time when...? Neither do we. But we can pretend to do so for a fee. Creating new futures, today.",
    mean:65,
    days30:22,
    ytd: 78,
    img: "./images/backstreet.jpg"
  },
  {
    name: "A.L.W.",
    desc:
      "Did you hear of us? We never heard of us. Don't call us, we will call you.",
    mean: 2,
    days30: 6,
    ytd: 10,
    img: "./images/alw.jpg"
  },
  {
    name: "The Best Match Ever",
    desc:
      "At TBME we are proud of our matchmaking abilities. We make waterproof matches, sunproof matches, and we are currently trying to find a partner for the longest match ever.",
    mean: 23,
    days30: 4,
    ytd: 2,
    img: "./images/bestmatch.jpg"
  }
];

// Create the character level generator with a pre trained model
const rnn = ml5.charRNN(
  "https://raw.githubusercontent.com/ml5js/ml5-data-and-models/main/models/charRNN/woolf/",
  modelLoaded
);
// When the model is loaded
function modelLoaded() {
  console.log("Model Loaded!");
}

function nextcandidate() {
  var temp_candidate = candidates[candidate_nb];
  updateCandidate(temp_candidate);
}

function updateCandidate(temp_candidate) {
  document.getElementById("candidateimg").src = temp_candidate.img;
  document.getElementById("candidatename").innerHTML = temp_candidate.name;
  document.getElementById("candidatedesc").innerHTML = temp_candidate.desc;
  document.getElementById("statmean").innerHTML =
    "Mean: " + temp_candidate.mean + "%";
  document.getElementById("stat30days").innerHTML =
    "Last 30 days: " + temp_candidate.days30 + "%";
  document.getElementById("statytd").innerHTML =
    "YTD: " + temp_candidate.ytd + "%";
  candidate_nb++;
  if (candidate_nb >= candidates.length) {
    candidate_nb = 0;
  }
}
nextcandidate();

function rndcandidate() {
  candidate_nb = getRandomInt(candidates.length);
  var temp_candidate = candidates[candidate_nb];
  updateCandidate(temp_candidate);
}

function extralike() {
  var temp_candidate = candidates[candidate_nb - 1];
  var $messagesBox = $(".messages-box");
  $messagesBox.append(
    genMessageAnswer(
      "I will personally will let them know that you EXTRALIKE the " +
        temp_candidate["name"] +
        " company <3 "
    )
  );
  if (already_open == false) {
    $("#chatlog").fadeToggle(500);
    already_open = true;
  }
  scrolling();
}

$(document).ready(function() {
  $("#message-icon").click(function() {
    $("#chatlog").fadeToggle(500);
    already_open = !already_open;

    if (welcome == true) {
      $(".messages-box").append(genMessageAnswer("Welcome back?"));
      welcome = false;
    } else {
      welcome = true;
    }
    scrolling();
  });

  // form submit
  $("form").submit(function(e) {
    e.preventDefault();
    var $messagesBox = $(".messages-box"),
      messagesBoxHeight = $messagesBox[0].scrollHeight,
      message = $("input", this).val(),
      messageLength = message.length;

    if (messageLength > 0) {
      $("input", this).removeClass("error");
      $messagesBox.append(
        '<div class="message"><span class="sr-only">you said:</span><p>' +
          message +
          "</p></div>"
      );

      if (message.includes("hello")) {
        setTimeout(function answer() {
          $messagesBox.append(genMessageAnswer("well, well, hello!"));
        }, 1000);
        setTimeout(scrolling, 1250);
      } else if (
        message.includes("who") &&
        message.includes("are") &&
        message.includes("you")
      ) {
        $messagesBox.append(
          genMessageAnswer(
            "I am Max, your personal matchmaker. Let me present you to a company..."
          )
        );
        setTimeout(function presentCie() {
          var compagnie =
            candidates[Math.floor(Math.random() * candidates.length)];
          $messagesBox.append(
            genMessageAnswer("Have you met..." + compagnie["name"] + " yet ?")
          );
        }, 500);
        setTimeout(scrolling, 750);
      } else if (
        message.includes("how") &&
        message.includes("are") &&
        message.includes("you")
      ) {
        $messagesBox.append(genMessageAnswer("doing quite well..."));
        $messagesBox.append(genMessageAnswer("you?"));
        setTimeout(function presentCie() {
          var compagnie =
            candidates[Math.floor(Math.random() * candidates.length)];
          $messagesBox.append(
            genMessageAnswer("did you meet..." + compagnie["name"] + " yet ?")
          );
        }, 650);

        setTimeout(scrolling, 1000);
      } else if (
        message.includes("don't") &&
        message.includes("like") &&
        message.includes("that")
      ) {
        var compagnie =
          candidates[Math.floor(Math.random() * candidates.length)];
        $messagesBox.append(
          genMessageAnswer("What do you mean you do not like that?")
        );
        $messagesBox.append(
          genMessageAnswer(
            "It's because you have not yet chatted with " + compagnie["name"]
          )
        );
        $messagesBox.append(genMessageAnswer("Let me call them for you :) "));
      } else if (
        message.includes("be") ||
        message.includes("is") ||
        message.includes("are") ||
        message.includes("am")
      ) {
        $messagesBox.append(
          genMessageAnswer("Oh you shoud tell that to Stingless Co.!")
        );
        $messagesBox.append(genMessageAnswer("Let me call them for you :) "));
        $messagesBox.append(genMessageAnswer("They said it was beelarious!"));
      } else if (
        message.includes("do") ||
        message.includes("doing") ||
        message.includes("done")
      ) {
        $messagesBox.append(genMessageAnswer("Let's do that!"));
        scrolling();

        $messagesBox.append(genMessageAnswer("Let's do this!"));
                scrolling();


        $messagesBox.append(
          genMessageAnswer("Sounds like a tall order to me...")
        );
      } else if (
        message.includes("got") ||
        message.includes("get") ||
        message.includes("have")
      ) {
        $messagesBox.append(
          genMessageAnswer("You gotta get the joke to have a date...")
        );
        $messagesBox.append(genMessageAnswer("To have or not to have... "));
      } else if (
        message.includes("what") &&
        message.includes("are") &&
        message.includes("you") &&
        message.includes("saying")
      ) {
        generateAnswer(message)
          .then(res =>
            $messagesBox.append(
              '<div class="message-answer"> <p>' + res + "</p></div>"
            )
          )
          .catch(err => console.log("generateanswer", err));
      } else if (message.includes("like") || message.includes("love")) {
        var lovemsg = lovemsgs[Math.floor(Math.random() * lovemsgs.length)];
        $messagesBox.append(genMessageAnswer(lovemsg));
      } else {
        var answersrandom =
          answersrndm[Math.floor(Math.random() * answersrndm.length)];
        $messagesBox.append(genMessageAnswer(answersrandom));
      }
    } else {
      $("input", this).addClass("error");
    }

    $("input", this).val("");
    $("input", this).focus();
    // scroll to see last message
    scrolling();
  }); // form
}); // document ready

function gotData(results) {
  console.log("we are at gotData");
  console.log(results);
  return results.sample;
}

function err(erreur) {
  console.log(erreur);
}

function generateAnswer(message) {
  console.log("let's generate something");
  return rnn
    .generate({
      seed: message,
      length: 20,
      temperature: 0.5
    })
    .then(res => gotData(res))
    .catch(err => console.log(err));
}

function generalAnswer(message) {}

function genMessageAnswer(message) {
  return (
    '<div class="message-answer"><span class="sr-only">Max says:</span> <p>' +
    message +
    "</p></div>"
  );
}

function scrolling() {
  console.log("scroll");
  var $messagesBox = $(".messages-box");

  var messagesBoxHeight = $messagesBox[0].scrollHeight;
  $messagesBox.scrollTop(messagesBoxHeight);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
