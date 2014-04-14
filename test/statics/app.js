var win = Ti.UI.createWindow();

win.addEventListener('open', function() {
  
  console.log('Hello');
  console.debug(JSON.stringify({
    hello: 'World'
  }));
  console.error('Hello', 'World');
  console.info('Hello');
  console.warn('Hello');

  Ti.API.log('info', 'Hello');
  Ti.API.timestamp('Hello');
  Ti.API.debug(['Hello', 'World']);
  Ti.API.error('Hello');
  Ti.API.info('Hello');
  Ti.API.trace('Hello');
  Ti.API.warn('Hello');

  Titanium.API.log('info', 'Hello');
  Titanium.API.timestamp('Hello');
  Titanium.API.debug(['Hello', 'World']);
  Titanium.API.error('Hello');
  Titanium.API.info('Hello');
  Titanium.API.trace('Hello');
  Titanium.API.warn('Hello');

});

win.open();