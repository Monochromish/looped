(async function() {
    if (!navigator.cookieEnabled) console.error('NO COOKIES!!')
    if (Cookies.get('slUser')) {
        console.info('School Loop User Cookie Found! Sending to Dashboard')
        setTimeout(() => {
            if (document.location.href.includes('/looped/')) document.location.href = `/looped/dashboard/`
            document.location.href = `/dashboard/`
        }, 1500)
    } else {
        console.info('We found someone new! Sending to login page')
        setTimeout(() => {
            if (document.location.href.includes('/looped/')) document.location.href = `/looped/login/`
            document.location.href = `/login/`
        }, 1500)
    }
})()