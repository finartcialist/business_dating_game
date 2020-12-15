var candidate_nb = 0;

var candidates = [{
        "name": "William Inc.",
        "desc": "As one of the most well-known marketing business in the country, we are advertising to YOU, our        dear investor: invest in us and reap the rewards!",
        "mean": NaN,
        "days30": NaN,
        "ytd": NaN
    },
    {
        "name": "Stingless Co.",
        "desc": "We sell bees. All sizes. Lots of them. Will you bee mine ?",
        "mean": NaN,
        "days30": NaN,
        "ytd": NaN,
    },
    {
        "name": "Apples & Oranges",
        "desc": "They said not to mix apples and oranges. We believe it makes the best juice. Let's powerthrough life - together.",
        "mean": NaN,
        "days30": NaN,
        "ytd": NaN,
    }
];


// Create the character level generator with a pre trained model
const rnn = ml5.charRNN('/shakespeare', modelLoaded);

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}

function nextcandidate() {
    var temp_candidate = candidates[candidate_nb];
    document.getElementById("candidatename").innerHTML = temp_candidate.name;
    document.getElementById("candidatedesc").innerHTML = temp_candidate.desc;
    document.getElementById("statmean").innerHTML = "Mean: " + temp_candidate.mean + "%";
    document.getElementById("stat30days").innerHTML = "Last 30 days: " + temp_candidate.days30 + "%";
    document.getElementById("statytd").innerHTML = "YTD: " + temp_candidate.ytd + "%";
    candidate_nb++;
    if (candidate_nb >= candidates.length) {
        candidate_nb = 0;
    }
}

nextcandidate();

$(document).ready(function() {

    $('#message-icon').click(function() {
        $('#chatlog').fadeToggle(500);
    });


    // form submit
    $('form').submit(function(e) {
        e.preventDefault();
        var $messagesBox = $(".messages-box"),
            messagesBoxHeight = $messagesBox[0].scrollHeight,
            message = $('input', this).val(),
            messageLength = message.length;

        if (messageLength > 0) {
            $('input', this).removeClass('error');
            $messagesBox.append('<div class="message"><p>' + message + '</p></div>');
            var answer = generateAnswer(message);
            $messagesBox.append('<div class="message-answer"> <p>' + answer + '</p></div>');

        } else {
            $('input', this).addClass('error');
        }

        $('input', this).val('');
        $('input', this).focus();

        // scroll to see last message
        $messagesBox.scrollTop(messagesBoxHeight);

    }); // form



}); // document ready

function generateAnswer(message) {
    if (message.includes("hello") || message.includes("hi")) {
        return "well, well, hello!"
    } else if (message.includes("beautiful") || message.includes("bee")) {

        return "this makes me confused - let me explain again."
    } else if (message.includes("?")) {
        console.log("let's generate something");
        rnn.generate({
            seed: message,
            length: 20,
            temperature: 0.5
        }, gotData);

        function gotData(results) {
            return results;
        }
    } else {

        return "hmm... let me think..."
    }
}