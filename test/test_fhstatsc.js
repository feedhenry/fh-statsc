var assert = require('assert');
var fhstatsc = require('stats');
var async = require('async');
var proxyquire = require('proxyquire').noCallThru();

exports.checkIFaceDisabled = function () {
  var fhs = fhstatsc.FHStats({});
  assert.ok(fhs.inc, "should be an inc function present");
  assert.ok(fhs.dec, "should be a dec function present");
  assert.ok(fhs.timing, "should be a timing function present");
  assert.ok(fhs.gauge, "should be a gauge function present");
  assert.ok(fhs.close, "should be a close function present");

  fhs.inc('test_counter', function (err) {
    assert.ifError(err);
    fhs.dec('test_counter', function (err) {
      assert.ifError(err);
      fhs.timing('test_counter', 1234, function (err) {
        assert.ifError(err);
        fhs.gauge('test_counter', 27, function (err) {
          assert.ifError(err);
          fhs.close();
        });
      });
    });
  });
};

exports.checkIFaceEnabled = function () {
  var fhs = fhstatsc.FHStats({enabled: true});
  assert.ok(fhs.inc, "should be an inc function present");
  assert.ok(fhs.dec, "should be a dec function present");
  assert.ok(fhs.timing, "should be a timing function present");
  assert.ok(fhs.gauge, "should be a gauge function present");
  assert.ok(fhs.close, "should be a close function present");

  fhs.inc('test_counter', function (err) {
    assert.ifError(err);
    fhs.dec('test_counter', function (err) {
      assert.ifError(err);
      fhs.timing('test_counter', 1234, function (err) {
        assert.ifError(err);
        fhs.gauge('test_counter', 27, function (err) {
          assert.ifError(err);
          fhs.close();
        });
      });
    });
  });
};

exports.testSanatizeInput = function () {
  var asyncMock = {
    queue: function () {
      return {
        push: function (data, cb) {
          assert.ok(data.toString().split(":").length === 2, "Stat must only contain one ':' char");
          assert.ok(data.toString().split("|").length === 2, "Stat must only contain one '|' char");
          cb();
        }
      }
    }
  };

  var statsc = proxyquire('stats.js', {'async': asyncMock});
  var fhs = statsc.FHStats({enabled: true});

  async.each([
    "test_stat",
    "test_stat:",
    "test_stat|",
    "myapp-1234_Version: <= 12"
  ], function (TEST_STAT, cb) {
    fhs.inc(TEST_STAT, function () {
      fhs.dec(TEST_STAT, function () {
        return cb();
      });
    });
  }, function () {
    fhs.close();
  });
};
