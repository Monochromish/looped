(async function() {
    const QueryString = window.location.search;
    const urlParams = new URLSearchParams(QueryString);
    let user = JSON.parse(decodeURI(Cookies.get('slUser')))
    let auth = {
        headers: {
            'Authorization': `${user.auth}`,
        }
    }
    if (!localStorage.getItem(`mail-message-${urlParams.get('msg')}`) && online) {
        var message = await fetch(`https://hmbhs.schoolloop.com/mapi/mail_messages?studentID=${user.students[0].studentID}&ID=${urlParams.get('msg')}`, auth).then((response) => { return response })

        message = await message.json()
            //console.log(message)
        localStorage.setItem(`mail-message-${urlParams.get('msg')}`, JSON.stringify(message)) //reduce waiting time in same session
    }
    var message = JSON.parse(localStorage.getItem(`mail-message-${urlParams.get('msg')}`))
    console.log(message)
    if (message.links != null) {
        console.log(`There are ${message.links.length} link(s)`)
        let buttons = ''
        message.links.forEach(link => {
            //console.log(link)
            buttons += `<button type="button" class="btn btn-primary" href="${link.URL}"><i data-feather="link2"></i><a href="${link.URL}" class="link-light" target="_blank">${link.Title}</a></button>`
        });

        message.message += `<br>${buttons}`
    }


    message.message = String(message.message).replace('&nbsp;', '')
    document.getElementById('message').innerHTML = message.message



})()