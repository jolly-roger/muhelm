import React from 'react';

const SOURCE_NODES = ['script', 'link'];

export function muhelm(WrappedComponent, mapMusToProps = (/* nodes, done */) => {}) {
  let muObserver;
  let muSubscriber = null;
  let muStore = [];

  if (typeof MutationObserver !== 'undefined') {
    muObserver = new MutationObserver((mus) => {
      mus.forEach((mu) => {
        mu.addedNodes.forEach((node) => {
          if (muSubscriber) {
            muSubscriber(node);
          } else {
            muStore.push(node);
          }
        });
      });
    });

    muObserver.observe(document.head, { childList: true });
  }

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.toBeUnmount = false;
      muSubscriber = (node) => {
        mapMusToProps(node, this.done);
      };
    }

    done = (data) => {
      if (!this.toBeUnmount && data) {
        this.setState(data);
      }
    }

    componentDidMount() {
      mapMusToProps(muStore.slice(), this.done);
      muStore = [];
    }

    componentWillUnmount() {
      muSubscriber = null;
      this.toBeUnmount = true;
    }

    render() {
      const { ...passThroughProps } = this.props;
      return (<WrappedComponent {...passThroughProps} {...this.state} />);
    }
  };
}

export function muhelmLoads(WrappedComponent, mapLoadsToProps = (/* node */) => {}) {
  return muhelm(WrappedComponent, (nodes = [], done) => {
    nodes.forEach((node) => {
      if (SOURCE_NODES.indexOf(node.tagName.toLowerCase()) > -1) {
        node.addEventListener('load', () => {
          done(mapLoadsToProps(node));
        });
      }
    });
  });
}

