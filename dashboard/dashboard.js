/* globals Chart:false, feather:false */




function toggleClass(id = null) {
    $('.classFrames').attr("hidden", true)
    console.log(id)
    if (id != null) {
        document.getElementById('home').hidden = true
        $('#home').attr("hidden", true);
        $(`#${id}`).removeAttr('hidden');
    } else {
        document.location.reload()
    }
}





async function getEverything(user) {
    if (!navigator.onLine) {
        console.info('Offline!')
            /*
            PWA Mode
            */
    }
    if (user.role != 'student') logout({ 'role': user.role })
    if (parseInt(localStorage.getItem('sl-lastUpdated')) >= 10 * 60) Cookies.remove('sl') //
    if (!Cookies.get('sl')) {
        console.warn('Refreshing Data')
        let courses = await fetch(`https://hmbhs.schoolloop.com/mapi/report_card?studentID=${user.students[0].studentID}`, { headers: { 'Authorization': `${user.auth}` } }).then((response) => { return response })
        let assignments = await fetch(`https://hmbhs.schoolloop.com/mapi/assignments?studentID=${user.students[0].studentID}`, { headers: { 'Authorization': `${user.auth}` } }).then((response) => { return response })
        let news = await fetch(`https://hmbhs.schoolloop.com/mapi/news?studentID=${user.students[0].studentID}`, { headers: { 'Authorization': `${user.auth}` } }).then((response) => { return response.data })
        let loopmails = await fetch(`https://hmbhs.schoolloop.com/mapi/mail_messages?studentID=${user.students[0].studentID}`, { headers: { 'Authorization': `${user.auth}` } }).then((response) => { return response })
        if (courses.statusText != 'OK') console.warn(`School Loop API Response: ${courses.status} ${courses.statusText}`)
        let slLoopmail = await loopmails.json().then((data) => { return data })
        let slAssignments = await assignments.json().then((data) => { return data })
        let slCourses = await courses.json().then((data) => { return data })
        Cookies.set('sl', 'true')
        localStorage.setItem('sl-lastUpdated', encodeURI(new Date().getTime()))
        localStorage.setItem('sl-loopmail', JSON.stringify(slLoopmail))
        localStorage.setItem('sl-assignments', JSON.stringify(slAssignments))
        localStorage.setItem('sl-courses', JSON.stringify(slCourses))
    }


    let courseList = JSON.parse(localStorage.getItem('sl-courses'))
        //console.log(courseList)

    var count = 0
    courseList.forEach(course => {
        let link = '#'
        let card = document.createElement('li')
        card.id = 'classSelector'
        card.onclick = `toggleClass(${course.periodID})`
        if (course.grade === 'null') course.grade = 'N/A'
        card.innerHTML = `
        <a href="#" onclick="toggleClass(${course.periodID})" class="rounded">${course.grade || 'N/A'} - ${course.courseName}</a>`
        card.addEventListener('click', () => {

            toggleClass(`${course.periodID}`)

        })
        document.getElementById('classlist').appendChild(card)


        let iframe = document.createElement('iframe')
        iframe.src = `class.html?id=${course.periodID}`
        iframe.hidden = true
            //iframe.style.display = 'none'
        iframe.width = '100%'
        iframe.height = '100%'
        iframe.frameBorder = '0'
        iframe.id = `${course.periodID}`
        iframe.className = 'classFrames'

        document.getElementById('mainView').appendChild(iframe)
    })
    document.getElementById('homeClick').addEventListener('click', () => {

        toggleClass()

    })

    assignments = JSON.parse(localStorage.getItem('sl-assignments'))
        //console.log(assignments)
    assignments.forEach(assignment => {
        if (assignment.description === 'null') assignment.description = ''
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString()) var badge = '<span class="badge bg-danger">Due Today</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (1 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due Tomorrow</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (2 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due in two days</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (3 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due in three days</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (4 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due in four days</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (5 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due in five days</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (6 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due in six days</span>'
        if (new Date(parseInt(String(assignment.dueDate))).toLocaleDateString() === new Date().toLocaleDateString() + (7 * 24 * 60 * 60 * 1000)) var badge = '<span class="badge bg-danger">Due in seven days</span>'


        var badge = badge || 'Due:' + new Date(parseInt(String(assignment.dueDate))).toLocaleDateString()
        assignment.description = String(assignment.description).replace("\\n", '').replace('  ', '')
        let listItem = document.createElement('a')
        listItem.className = 'list-group-item list-group-item-action'
        listItem.id = 'assignment'
        listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1"> ${assignment.title}</h5>
            <small>${badge}</small>
        </div>
        <p class="mb-1">${assignment.description}</p>
        <small> ${assignment.courseName} - ${assignment.teacherName}</small>`
        document.getElementById('assignments').appendChild(listItem)
    })

    var triggerTabList = [].slice.call(document.querySelectorAll('#assignment'))
    triggerTabList.forEach(function(triggerEl) {
            var tabTrigger = new bootstrap.Tab(triggerEl)

            triggerEl.addEventListener('click', function(event) {
                event.preventDefault()
                tabTrigger.dispose()
            })
        })
        //1632121200.000 -> remove last three zeros
}
(async function() {
    'use strict'
    if (Cookies.get('slUser')) {
        console.info('School Loop User Cookie Found!')
    } else {

        logout()

    }

    let user = JSON.parse(decodeURI(Cookies.get('slUser')))

    document.getElementById('username').innerHTML = `<i data-feather="user"></i> ${String(user.fullName).split(', ')[1]} ${String(user.fullName).split(', ')[0]}`
    getEverything(user)
    setTimeout(() => {
        if (document.getElementById('username').innerHTML === 'Error') {
            logout()
        }
    }, 2000)
})()