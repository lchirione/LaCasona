(function(obj) {
  function formatARS(val) {
    return val.toLocaleString('es-AR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      useGrouping: true
    });
  }

  if (typeof exports === 'undefined') {
    obj.formatARS = formatARS;
  } else {
    module.exports = formatARS;
  }
}(this));