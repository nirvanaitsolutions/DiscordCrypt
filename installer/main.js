( () => {
    /* Import required components for building the window. */
    const { BrowserWindow, app } = require( 'electron' );
    const path = require( 'path' );
    require( './dialog/dialog' );

    let mainWindow;

    function createWindow () {
        /* Create the main window. */
        mainWindow = new BrowserWindow( {
            titleBarStyle: 'hidden',
            width: 1281,
            height: 800,
            show: false,
            resizable: false,
            maximizable: false,
            backgroundColor: '#FF333333',
            icon: path.join( __dirname, 'assets/icons/png/64x64.png' )
        } );

        /* Load the main file. */
        mainWindow.loadURL( `file://${__dirname}/index.html` );

        /* Show the main window when it's ready. */
        mainWindow.once( 'ready-to-show', () => {
            mainWindow.show()
        } );

        /* Handle the window close event. */
        mainWindow.on( 'closed', () => {
            mainWindow = null
        } );
    }

    /* Wait till the application is ready to create the windows. */
    app.on( 'ready', createWindow );

    /* Quit on application closed. */
    app.on( 'window-all-closed', () => {
        /* On OS X it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q. */
        if ( process.platform !== 'darwin' )
            app.quit();
    } );

    /* Recreate the windows on OS-X when no other windows are open. */
    app.on( 'activate', () => {
        if ( mainWindow === null )
            createWindow()
    } );

} )();
