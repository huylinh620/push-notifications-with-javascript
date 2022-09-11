const button = document.querySelector('button')

button.addEventListener('click', () => {
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      const notification = new Notification('Example Notification', {
        body: 'This is more text',
        data: { hello: 'world'},
        tag: 'Wellcome message'
      })

      notification.addEventListener('error', e => {
        console.log(e)
      })
    }
  })
})

let notification
let interval
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    const leaveDate = new Date()
    interval = setInterval(() => {
      notification = new Notification('Come back please', {
        body: `You have been gone for ${Math.round((new Date() - leaveDate) / 1000)} seconds`,
        tag: 'Come back'
      })
    }, 1000)
  } else {
    if (interval) clearInterval(interval)
    if (notification) notification.close()
  }
})
