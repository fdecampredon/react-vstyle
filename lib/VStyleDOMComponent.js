/*
 * Copyright 2016 François de Campredon <francois.de.campredon@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var React = require('react');
var ReactDOMComponent = require('react/lib/ReactDOMComponent');
var assign = require('object-assign');

function VStyleDOMComponent() {
  ReactDOMComponent.apply(this, arguments);
}

VStyleDOMComponent.Mixin = {

  mountComponent: function (transaction, nativeParent, nativeContainerInfo, context) {
    this._currentElement = this._renderStyles(this._currentElement, context);
    return ReactDOMComponent.Mixin.mountComponent.call(
      this, transaction, nativeParent, nativeContainerInfo, context);
  },
  
  receiveComponent: function (nextElement, transaction, context) {
    nextElement = this._renderStyles(nextElement, context);
    return ReactDOMComponent.Mixin.receiveComponent.call(this, nextElement, transaction, context);
  },
  
  _renderStyles: function (element, context) {
    var elementStyles = element.props && element.props.styles;
    if (elementStyles) {
      var className =
        (element.className ? (' ' + element.className) : '') +
        context._stylesRenderer.renderStyles(elementStyles);
      
      return React.cloneElement(element, {
        className: className,
        styles: undefined
      });
    } 
    return element;
  }
};

assign(
  VStyleDOMComponent.prototype,
  ReactDOMComponent.prototype,
  VStyleDOMComponent.Mixin
);

module.exports = VStyleDOMComponent;
