import React from 'react';

export default function muhelm(wrappedComponent, mapMusToProps = () => {}) {
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
      this.setState(data);
    }

    render() {
      return (<wrappedComponent {...this.props} {...this.state} />);
    }
  };
}