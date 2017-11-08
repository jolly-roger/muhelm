import React from 'react';

const SOURCE_NODES = ['script', 'link'];

export function muhelm(WrappedComponent, mapMusToProps = (/* node, done */) => {}) {
  let muObserver;
  let muSubscriber = () => {};

  if (typeof MutationObserver !== 'undefined') {
    muObserver = new MutationObserver((mus) => {
      mus.forEach((mu) => {
        mu.addedNodes.forEach((node) => {
          muSubscriber(node);
        });
      });
    });

    muObserver.observe(document.head, { childList: true });
  }

  return class extends React.Component {
    constructor(props) {
      super(props);
      muSubscriber = (node) => {
        mapMusToProps(node, this.done);
      };
    }

    done = (data) => {
      if (data) {
        this.setState(data);
      }
    }

    render() {
      const { ...passThroughProps } = this.props;
      return (<WrappedComponent {...passThroughProps} {...this.state} />);
    }
  };
}

export function muhelmLoads(WrappedComponent, mapLoadsToProps = (/* loadedSourceId */) => {}) {
  return muhelm(WrappedComponent, (node, done) => {
    if (SOURCE_NODES.indexOf(node.tagName.toLowerCase()) > -1) {
      node.addEventListener('load', () => {
        done(mapLoadsToProps(node.id));
      });
    }
  });
}

