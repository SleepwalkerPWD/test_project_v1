$(document).ready(function() {

    var getDate = function() {
        var d = new Date(),
            hrs = d.getHours(),
            min = d.getMinutes(),
            day = d.getDate(),
            month = d.getMonth(),
            year = d.getFullYear();


        var monthArray = new Array("Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря");

        // var actualDate = day + ' ' +  monthArray[month] + ' ' + year + ' года ' + hrs + ' часов ' + min + ' минут ';
        var actualDate = ` ${day} ${monthArray[month]} ${year} года ${hrs} часов ${min} минут `;

        return actualDate;

    };
    // console.log(getDate());

    var countTweets = function() {
        var tweetCounter = $('.tweet-card').length;
        // console.log(tweetCounter);
        $('#tweetCounter').text(tweetCounter);

    }

    // https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
    var wrapURLs = function(text, new_window) {
        var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
        var target = (new_window === true || new_window == null) ? '_blank' : '';

        return text.replace(url_pattern, function(url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
            var href = protocol_pattern.test(url) ? url : 'http://' + url;
            return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
        });
    };

    var createTweet = function(date, text) {
        var $tweetBox = $('<div class="card tweet-card">'); //Создаем обертку для твита
        var $tweetDate = $('<div class="tweet-date">').text(date); //Создаем дату
        var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>'); //Создаем контет с Твитом


        var additionalClassName;
        if (text.length < 100) {
            additionalClassName = 'font-size-large';
        } else if (text.length > 150) {
            additionalClassName = 'font-size-small';
        } else {
            additionalClassName = 'font-size-normal';
        }
        $tweetText.addClass(additionalClassName);

        $tweetBox.append($tweetDate).append($tweetText); //Получаем разметку твита с датой и текстом твита
        $('#tweetsList').prepend($tweetBox);
        countTweets();

    };


    var tweetsBase = [{
            date: '25 окт. 2017 г.',
            text: 'Совет у Элронда.'

        },
        {
            date: '25 дек. 2017 г.',
            text: 'Отряд Хранителей покидает Имладрис'
            
        },
        {
            date: '12 апр. 2018 г.',
            text: 'Попытались пройти через горы, попали в Снежную Бурю на Карадрасе'

        },
        {
            date: '14 июнь 2018 г.',
            text: 'Входим в Морию, подбираем пароль'
        }
    ];


    tweetsBase.forEach(function(tweet) {
        // console.log(tweet);
        // console.log(tweet.date);
        // console.log(tweet.text);
        createTweet(tweet.date, tweet.text);

    });



    //Форма отправки твита
    $('#postNewTweet').on('submit', function(e) {
        e.preventDefault(); //Отменяем отправку формы
        var tweetText = $('#tweetText').val(); //Получаем текст твита
        createTweet(getDate(), tweetText);
        $('#tweetText').val('');

    });

});
