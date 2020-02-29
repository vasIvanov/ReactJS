import React from 'react';

function render(Cmp, otherProps) {
    return function(props) {
      return <Cmp {...props} {...otherProps}/>
    }
}

export default render;