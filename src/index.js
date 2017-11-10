import React from 'react';

const SOURCE_NODES = ['script', 'link'];

function isHTMLElement(muNode) {
  return (muNode && typeof muNode === 'object' && muNode.tagName);
}

export function muConnect(WrappedComponent, mapMusToProps = (/* nodes, done */) => {}) {
  let muObserver;
  let muSubscriber = null;
  let muStore = [];

  if (typeof MutationObserver !== 'undefined') {
    muObserver = new MutationObserver((mus) => {
      mus.forEach((mu) => {
        // IE NodeList does not implement iterator
        // eslint-disable-next-line
        for (let i in mu.addedNodes) {
          const node = mu.addedNodes[i];
          if (muSubscriber) {
            muSubscriber(node);
          } else {
            muStore.push(node);
          }
        }
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

export function muConnectLoads(WrappedComponent, mapLoadsToProps = (/* node */) => {}) {
  return muConnect(WrappedComponent, (nodes = [], done) => {
    // IE NodeList does not implement iterator
    // eslint-disable-next-line
    for (let i in nodes) {
      const node = nodes[i];
      if (isHTMLElement(node) && SOURCE_NODES.indexOf(node.tagName.toLowerCase()) > -1) {
        node.addEventListener('load', () => {
          done(mapLoadsToProps(node));
        });
      }
    }
  });
}

