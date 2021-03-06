//
// fhstats - FeedHenry stats client library
//
var async = require('async');

function FHStats(cfg) {
  var host = cfg.host || 'localhost';
  var port = cfg.port || 8125;
  var enabled = cfg.enabled;
  var socket;

  if (enabled && !socket) {
    socket = require('dgram').createSocket('udp4');
    // Bind explicitly to our host to prevent binding to 0.0.0.0 in openshift. Port intentionally not specified and not cfg.port
    socket.bind(undefined, cfg.host);
    socket.on('error', function() {
      // Intentionally ignoring errors, fire & forget - but we need to handle the event
    });
  }


  // needs to send in batches every second or so
  function send(data, cb) {
    if (enabled) {
      var send_data = new Buffer(data);
      try {
        socket.send(send_data, 0, send_data.length, port, host, function(err, bytes) {
          if (cb) {
            return cb(err, bytes);
          }
        });
      } catch (x) {
        // Purposely ignored..
        cb();
      }
    } else {
      cb();
    }
  }

  // Moving for JSHint visibility within send function
  var sendQ = async.queue(function(data, cb) {
    send(data, cb);
  }, 10);


  function sanatizeInput(input) {
    //Replace characters that may cause problems here (:| are used by statsd, and cannot be included in the name)
    return (input + '').replace(/[\s:|=<.]+/g, '');
  }

  /**
   * Create a new stat message and adds to the send queue.
   * stat message format: statName:statValue|statIdentifier i.e. MyIncStat:1|c
   */
  function doStat(statName, statValue, statIdentifier, cb) {
    statName = sanatizeInput(statName);
    statValue = sanatizeInput(statValue);
    statIdentifier = sanatizeInput(statIdentifier);
    var stat = statName + ":" + statValue + "|" + statIdentifier;
    sendQ.push(stat, cb);
  }

  function inc(stat, cb) {
    doStat(stat, "1", "c", cb);
  }

  function dec(stat, cb) {
    doStat(stat, "-1", "c", cb);
  }

  function timing(stat, time, cb) {
    doStat(stat, time, "ms", cb);
  }

  function gauge(stat, value, cb) {
    doStat(stat, value, "g", cb);
  }

  function close() {
    try {
      if (socket) {
        socket.close();
      }
    } catch (x) {
      // purposely ignored
    }
  }

  return {
    inc: inc,
    dec: dec,
    timing: timing,
    gauge: gauge,
    close: close
  };
}

exports.FHStats = FHStats;
