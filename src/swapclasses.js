/**
 * jquery.swapClasses
 * makes simultaneously adding and removing classes on elements more efficient
 * github.com/jtward/jquery.swapclasses
 *
 * Copyright 2012 James Ward
 * Released under the MIT license
 *
 */
;(function($) {

  "use strict";

  var core_rspace = /\s+/;

  $.fn.swapClasses = function(rm, add, toggle) {

    var i, l, i2, l2, idx, elem, classList, className, rmList, addList, toggleList;

    if ( typeof rm === 'function' ) {
      return this.each(function(j) {
        var self = $(this);
        self.swapClasses.apply(self, rm.call(this, j, this.className));
      });
    }

    // split the provided classes into arrays.
    // we can skip if the argument is falsy.
    rmList = rm && rm.split( core_rspace );
    addList = add && add.split( core_rspace );
    toggleList = toggle && toggle.split( core_rspace );

    // iterate over the elements in this $ object
    for ( i = 0, l = this.length; i < l; i += 1 ) {

      elem = this[i];

      // only element nodes may have classes
      if ( elem.nodeType === 1 ) {

        // split the current element's class into an array
        classList = ( elem.className || "" ).split( core_rspace );

        if ( rm ) {
          for ( i2 = 0, l2 = rmList.length; i2 < l2; i2 += 1 ) {
            idx = classList.indexOf(rmList[i2]);
            if ( idx !== -1 ) {
              classList.splice(idx, 1);
            }
          }
        }

        if ( add ) {
          for ( i2 = 0, l2 = addList.length; i2 < l2; i2 += 1 ) {
            className = addList[i2];
            if ( classList.indexOf(className) === -1 ) {
              classList.push(className);
            }
          }
        }

        if ( toggle ) {
          for ( i2 = 0, l2 = toggleList.length; i2 < l2; i2 += 1 ) {
            className = toggleList[i2];
            idx = classList.indexOf( className );
            if ( idx === -1 ) {
              classList.push(className);
            }
            else {
              classList.splice( idx, 1 );
            }
          }
        }

        // set the class only once!
        elem.className = classList.join(" ");
      }
    }

    return this;
  };

}(jQuery));