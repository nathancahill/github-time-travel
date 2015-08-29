
function setDomChangeTimeout (callback, klass, timeout) {
    // A function like setTimeout that watches a DOM element (by class name)
    // for change. The callback is called as soon as the DOM element
    // changes. If it doesn't change, the callback is called at timeout.

    // This is the fastest way to get a callback when the new DOM settles.
    // Right now, it naively uses innerHTML, but for this use, it's good enough.

    var start = performance.now(),
        startContent = '',
        startElements = document.getElementsByClassName(klass);

    if (startElements.length > 0) {
        startContent = startElements[0].innerHTML;
    }

    var interval = setInterval(function () {
            if (performance.now() - start > timeout) {
                clearInterval(interval);
                callback();
            } else {
                var endElements = document.getElementsByClassName(klass);

                if (endElements.length > 0) {
                    if (endElements[0].innerHTML !== startContent) {
                        clearInterval(interval);
                        callback();
                    }
                }
            }
        }, 50);
}

function attachDateButton () {
    // Extract the Github username and repo from a commit log URL.
    // If the DOM element does not already exist, create an element to hold
    // the datepicker and append it to the .file-navigation DOM element
    // after styling it like a Github button.

    // Then, create the datepicker with a callback to make an API call on select.
    // Attach the listener to the API call to handle the response.

    var re = /.*github\.com\/(.*)\/(.*)\/commits.*/,
        m = re.exec(document.location.href);

    if (m === null) return;
    if (document.getElementsByClassName('datepicker-button').length > 0) return;

    var username = m[1],
        repo = m[2],
        api = 'https://api.github.com/repos/' + username + '/' + repo + '/commits',
        date = getCommitDate(),
        el = document.createElement('span');

    el.className = 'btn btn-sm select-menu-button datepicker-button';
    el.innerHTML = '<i>Date:</i> <span class="js-select-button css-truncate-target">' + date + '</span> ';

    document.getElementsByClassName('file-navigation')[0].appendChild(el);

    new Pikaday({
        field: el,
        defaultDate: new Date(date),
        setDefaultDate: true,
        onSelect: function (date) {
            var req = new XMLHttpRequest(),
                url = api + '?per_page=1&until=' + date.toISOString().split('T')[0];

            req.addEventListener('load', reqListener);
            req.open('get', url, true);
            req.send();
        }
    });
}

function getCommitDate () {
    // Find first .commit-group-title in page, extract the date from the text.
    // Return 'unknown' if no commit group titles are found.

    var commitGroups = document.getElementsByClassName('commit-group-title');

    if (commitGroups.length > 0) {
        var re = /Commits on (.*)/,
            m = re.exec(commitGroups[0].innerHTML),
            date = m[1];

        return date;
    } else {
        return 'unknown';
    }
}

function reqListener () {
    // Listen for a response from the Github Commits API
    // https://developer.github.com/v3/repos/commits/
    // Parse the JSON response and extract the HTML link from the first commit
    // if commits were returned.
    // Change 'commit' to 'commits' in the URL to browse the commit log.

    var parsed = JSON.parse(this.responseText);

    if (parsed.length > 0) {
        var tree_url = parsed[0].html_url.replace('/commit/', '/commits/');
        document.location.href = tree_url;
    }
}

attachDateButton();
