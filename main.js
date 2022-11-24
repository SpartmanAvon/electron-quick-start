const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const content = mainWindow.webContents
  mainWindow.loadURL('http://10.8.77.162:10010')
  mainWindow.webContents.on('console-message', (event, level, message, ling, sourceId) => {
    //console.log(message+'hello')
    // if (message.includes('enter')
    //   || message.includes('WebSocket')
    //   || message.includes('global')
    //   || message.includes('prefetch starting for')) {
    //   content.executeJavaScript(`var box = document.getElementById("messageboxlabel"); 
    //     if(box!=null){box.innerText='${message}'}`)
    //     .then(msg => console.log(msg))
    //     .catch(err => {
    //     console.log(err)
    //   })
    // }
    if(message.includes('initMachineData')){
      content.executeJavaScript(`
        var tps = document.getElementById("tps");
        if(tps != null){
          tps.style.height='800px'
        }else{
          console.log("NO SUCH ELEMENT!!!")
        }
      `).then(
        msg=>{
          console.log(msg)
        }
      )
      .catch(
        err=>{
          console.log(err)
        }
      )
    }

  })

  //console.log(ses.netLog)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
